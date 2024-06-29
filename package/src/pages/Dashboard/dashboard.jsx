import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { showTransaction } from '../Cadastro/transaction';
import { showAll } from '../Cadastro/category';
import Chart from 'chart.js/auto';
import Container from '../../components/container';
import Spinner from '../../components/loadingSpinner';
import { FrameTable, Frame, FrameGraphic, FrameChart } from '../../components/frame';
import Navbar from '../../components/navbar';
import { Table } from '../../components/table';
import { CiWarning } from "react-icons/ci";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MdVisibility } from "react-icons/md";
import { BsEyeSlashFill } from "react-icons/bs";
import FormDash from './formdash';

const Headers = styled.div`
    display: flex;
    font-size: 1.5rem;
    color: #1f2731;
    margin: 30px;
`;

const BlurWrapper = styled.div`
  filter: ${({ isBlurred }) => (isBlurred ? 'blur(25px)' : 'none')};
  transition: filter 0.3s;
`;

const Body = styled.div`
    background-color: #cbcbcb;
    min-height: 100vh;
`;

const SubTitle = styled.h2`
    font-weight: 250;
`;

const Layout = styled.div`
    display: flex;
`;

const RightPage = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const SupRightPage = styled.div`
    width: 95%;
    height: 100%;
    display: flex;
    gap: 10px;
    justify-content: space-between;
`;

const LeftPage = styled.div`
    width: 50%;
`;

const InfRightPage = styled.div`
    width: 100%;
`;

const BalanceDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    min-height: 100%;
`;

const Balance = styled.h1`
    color: ${(props) => props.color};
    font-size: 2rem;
`;

const DivMessage = styled.div`
    display: flex;
    margin: 20px;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 1.25rem;

`;

const NoRecordsMessage = styled.p`
    text-align: center;
    color: #666666;
`;

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [monthlyBalances, setMonthlyBalances] = useState([]);
    const [valuesByCategory, setValuesByCategory] = useState([]);
    const [color, setColor] = useState('green'); // Default color

    const [isBlurred, setIsBlurred] = useState(false);

    const toggleBlur = () => setIsBlurred(!isBlurred);
    function generateColorRange(startColor, endColor, steps) {
        let start = {
            r: parseInt(startColor.substring(1, 3), 16),
            g: parseInt(startColor.substring(3, 5), 16),
            b: parseInt(startColor.substring(5, 7), 16)
        };
        let end = {
            r: parseInt(endColor.substring(1, 3), 16),
            g: parseInt(endColor.substring(3, 5), 16),
            b: parseInt(endColor.substring(5, 7), 16)
        };
        let step = {
            r: (end.r - start.r) / (steps - 1),
            g: (end.g - start.g) / (steps - 1),
            b: (end.b - start.b) / (steps - 1),
        };
    
        let colorRange = [];
        for (let i = 0; i < steps; i++) {
            let r = Math.round(start.r + (step.r * i));
            let g = Math.round(start.g + (step.g * i));
            let b = Math.round(start.b + (step.b * i));
            colorRange.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
        }
        return colorRange;
    }

    const calculateMonthlyBalance = (transactions) => {
        const monthlyBalances = {};

        // Sort transactions by date to ensure correct cumulative calculation
        transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

        transactions.forEach((transaction) => {
            const date = new Date(transaction.date);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Month is 0-indexed, add 1 for human-readable format
            const transactionValue = transaction.type === 'Saida' ? -Math.abs(transaction.value) : transaction.value;

            // Initialize the month in the balance object if it doesn't exist
            if (!monthlyBalances[monthKey]) {
                monthlyBalances[monthKey] = 0;
            }

            // Add the transaction value to the month's balance
            monthlyBalances[monthKey] += transactionValue;
        });

        // Convert the balances to a cumulative format
        const cumulativeBalances = {};
        let cumulativeSum = 0;
        Object.keys(monthlyBalances).forEach((month) => {
            cumulativeSum += monthlyBalances[month];
            cumulativeBalances[month] = cumulativeSum;
        });

        return cumulativeBalances;
    };

    const fetchData = async () => {
        try {
            const res = await showTransaction();

            const categoryId = res.map((transaction) => transaction.category_id);
            const categories = await showAll(categoryId);

            const updateTransaction = res.map((transaction) => {
                const category = categories.find((cat) => cat.category_id === transaction.category_id);
                return {
                    ...transaction,
                    category_name: category ? category.category_name : 'Categoria Inexistente',
                };
            });

            const actualMonthValues = updateTransaction.filter((transaction) => {
                const date = new Date(transaction.date);
                const actualDate = new Date();
                return date.getMonth() === actualDate.getMonth() && date.getFullYear() === actualDate.getFullYear();
            });

            const balance = updateTransaction.reduce((total, transaction) => {
                if (transaction.type === 'Saida') {
                    return total - transaction.value;
                } else {
                    return total + transaction.value;
                }
            }, 0);
            const monthlyBalances = calculateMonthlyBalance(updateTransaction);
            const valuesByCategory = actualMonthValues.reduce((acc, transaction) => {
                const category = transaction.category_name;
                const value = transaction.type === 'Saida' ? -Math.abs(transaction.value) : transaction.value;
                
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += value;
                return acc;
            }, {});

            setValuesByCategory(Object.entries(valuesByCategory).map(([category_name, value]) => ({ category_name, value })));
            setMonthlyBalances(Object.entries(monthlyBalances).map(([data, value]) => ({ data, value })));

            const formattedBalance = `R$${balance.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
            }) || '0,00'}`;
            setBalance(formattedBalance);

            const newColor = balance < 0 ? 'red' : 'green';
            setColor(newColor);

            setTransactions(updateTransaction);
        } catch (error) {
            console.error('Erro ao buscar dados de transação:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // Step 1: Reference for the chart instance

    const chartRef2 = useRef(null);
    const chartInstanceRef2 = useRef(null); // Step 1: Reference for the chart instance

    useEffect(() => {
        // Directly work with the chart instance
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
            var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
            gradientStroke.addColorStop(1, 'rgba(128, 182, 244, 1)');
            gradientStroke.addColorStop(0, 'rgba(61, 68, 101, 1)');

            var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
            gradientFill.addColorStop(1, 'rgba(128, 182, 244, 0.3)');
            gradientFill.addColorStop(0, 'rgba(61, 68, 101, 0.3)');

            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: monthlyBalances.map((d) => d.data),
                    datasets: [
                        {
                            data: monthlyBalances.map((d) => d.value),
                            backgroundColor: gradientFill,
                            borderColor: gradientStroke,
                            pointBorderColor: gradientStroke,
                            pointBackgroundColor: gradientStroke,
                            pointHoverBackgroundColor: gradientStroke,
                            pointHoverBorderColor: gradientStroke,
                            pointBorderWidth: 10,
                            pointHoverRadius: 10,
                            pointRadius: 2,
                            fill: true,
                            borderWidth: 1,
                            lineTension: 0,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            display: false,
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                            display: false,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        }
        if (chartInstanceRef2.current) {
            chartInstanceRef2.current.destroy();
        }

        const ctx2 = chartRef2.current?.getContext('2d');
        if (ctx2) {
            const startColor = '#6976b8';
            const endColor = '#3d4465';
            const uniqueCategoriesLength = new Set(valuesByCategory.map(d => d.category_name)).size;
            const steps = uniqueCategoriesLength;

            const colors = generateColorRange(startColor, endColor, steps);

            const datasets = valuesByCategory.map((d, index) => ({
                label: d.category_name,
                data: [d.value], // Wrap the value in an array since each dataset has a single data point
                backgroundColor: colors[index % colors.length], // Cycle through colors array
                borderColor: colors[index % colors.length],
                borderWidth: 1,
                barPercentage: 0.95,
                categoryPercentage: 1,
            }));
        
            chartInstanceRef2.current = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: [''], // Single label since each bar represents a category
                    datasets: datasets,
                },
                options: {
                    plugins: {
                        legend: {
                            display: true, // Ensure legend is displayed
                            position: 'top', // Adjust based on your requirement
                        },
                        datalabels: {
                            display: true,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: 4,
                            color: (context) => {
                                const value = context.dataset.data[context.dataIndex];
                                // Example condition: change color based on the value
                                if (value >= 0) {
                                    return '#73fa7a'; // Color for values greater than 1000
                                } else {
                                    return '#fa7375'; // Color for values less than or equal to 500
                                }
                            }, // Set the color of the label text
                            anchor: 'auto', // Position the label at the a (top) of the bar
                            align: 'end', // Align the label above the bar
                            offset: 15,
                            formatter: (value, context) => {
                                return `R$${value.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    useGrouping: true,
                                }) || '0,00'}`; // You can format the label value here if needed
                            }
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            display: false, // Adjust based on your requirement
                            grid: {
                                display: false,
                            },
                            border: {
                                display: false,
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                            display: true, // Adjust based on your requirement
                            border: {
                                display: false,
                            },
                            
                        },
                    },
                    layout: {
                        padding: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
                plugins: [ChartDataLabels],
            });
        }

        const fetchUsername = async () => {
            const response = await axios.get('http://localhost:8000/auth', { withCredentials: true });
            setUsername(response.data.username);
            setUserid(response.data.user_id);
            setIsLoading(false);
        };

        fetchData();
        fetchUsername();
    }, [userid, balance]);

    const keys = ['category_name', 'value'];

    const iconVisible = () => {
        return isBlurred ? <MdVisibility /> : <BsEyeSlashFill />;
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Container>
            <Body>
                <Navbar icon={<div onClick={toggleBlur}>{iconVisible()}</div>}/>
                <Headers>
                    <div>
                        <h1>Bem-vindo, {username}!</h1>
                        <SubTitle>É bom ter você aqui!</SubTitle>
                    </div>
                </Headers>
                <Layout>
                    <LeftPage>
                        <FrameTable label="Registro/Histórico">
                            <BlurWrapper isBlurred={isBlurred}>
                                {transactions && transactions.length > 0 ? (
                                    <Table keys={keys} data={transactions} id={transactions.transaction_id} form={<FormDash />}/>
                                ) : (    
                                    <DivMessage><CiWarning /><NoRecordsMessage>Nenhum registro encontrado.</NoRecordsMessage></DivMessage>
                                )}
                             </BlurWrapper>
                        </FrameTable>
                    </LeftPage>
                    <RightPage>
                        <SupRightPage>
                            <Frame label="Saldo">
                                <BlurWrapper isBlurred={isBlurred}>
                                    <BalanceDiv>
                                        <Balance color={color}>{balance}</Balance>
                                    </BalanceDiv>
                                </BlurWrapper>
                            </Frame>
                            <FrameChart label="Meses anteriores">
                                <BlurWrapper isBlurred={isBlurred}>
                                    <canvas ref={chartRef}></canvas>
                                </BlurWrapper>
                            </FrameChart>
                        </SupRightPage>
                        <InfRightPage>
                            <FrameGraphic label="Relatório - Mês atual">
                                <BlurWrapper isBlurred={isBlurred}>
                                    <canvas ref={chartRef2} height="370" width="100"></canvas>
                                </BlurWrapper>
                            </FrameGraphic>
                        </InfRightPage>
                    </RightPage>
                </Layout>
            </Body>
        </Container>
    );
};

export default Dashboard;
