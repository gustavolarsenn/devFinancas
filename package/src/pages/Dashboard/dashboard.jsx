import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { showTransaction } from '../Cadastro/transaction';
import { show } from '../Cadastro/category';
import Chart from 'chart.js/auto';
import Container from '../../components/container';
import Spinner from '../../components/loadingSpinner';
import { FrameTable, Frame, FrameGraphic, FrameChart } from '../../components/frame';
import Navbar from '../../components/navbar';
import { Table } from '../../components/table';
import { CiWarning } from "react-icons/ci";

const Headers = styled.div`
    font-size: 1.5rem;
    color: #1f2731;
    margin: 30px;
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
    min-width: 90%;
    height: 100%;
`;

const Balance = styled.h1`
    color: ${(props) => props.color};
    font-size: 2.5rem;
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
    const [color, setColor] = useState('green'); // Default color

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
            const categories = await show(categoryId);

            const updateTransaction = res.map((transaction) => {
                const category = categories.find((cat) => cat.category_id === transaction.category_id);
                return {
                    ...transaction,
                    category_name: category ? category.category_name : 'Categoria Inexistente',
                };
            });
            const balance = updateTransaction.reduce((total, transaction) => {
                if (transaction.type === 'Saida') {
                    return total - transaction.value;
                } else {
                    return total + transaction.value;
                }
            }, 0);
            const monthlyBalances = calculateMonthlyBalance(updateTransaction);

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

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Container>
            <Body>
                <Navbar />
                <Headers>
                    <h1>Bem-vindo, {username}!</h1>
                    <SubTitle>É bom ter você aqui!</SubTitle>
                </Headers>
                <Layout>
                    <LeftPage>
                        <FrameTable label="Registro/Histórico">
                            {transactions && transactions.length > 0 ? (
                                <Table keys={keys} data={transactions} />
                            ) : (
                                
                                <DivMessage><CiWarning /><NoRecordsMessage>Nenhum registro encontrado.</NoRecordsMessage></DivMessage>
                            )}
                        </FrameTable>
                    </LeftPage>
                    <RightPage>
                        <SupRightPage>
                            <Frame label="Saldo">
                                <BalanceDiv>
                                    <Balance color={color}>{balance}</Balance>
                                </BalanceDiv>
                            </Frame>
                            <FrameChart label="Meses anteriores">
                                <canvas ref={chartRef}></canvas>
                            </FrameChart>
                        </SupRightPage>
                        <InfRightPage>
                            <FrameGraphic label="Relatório"></FrameGraphic>
                        </InfRightPage>
                    </RightPage>
                </Layout>
            </Body>
        </Container>
    );
};

export default Dashboard;
