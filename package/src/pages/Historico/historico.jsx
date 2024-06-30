import Navbar from "../../components/navbar";
import Container from "../../components/container";
import styled from "styled-components";
import { FrameHistoric } from "../../components/frame";
import {TableHistoric} from "../../components/table";
import {Filter, FilterContainer, FilterElement } from "../../components/filter";
import { showTransaction } from "../Cadastro/transaction";
import { useEffect, useState } from "react";
import { show } from "../Cadastro/category";

const Body = styled.div`
    background-color: #CBCBCB;
    min-height: 100vh;
`;

const Headers = styled.div`
    font-size: 1.5rem;
    color: #1F2731;
    margin: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Layout = styled.div `
    display: flex;
    justify-content: center;
`;

const Historico = () => {
    const [historic, setHistoric] = useState([]);
    const [userid, setUserid] = useState('');
    const [possibleTypes, setPossibleTypes] = useState([]);
    const [possibleCategories, setPossibleCategories] = useState([]);
    const [possibleYears, setPossibleYears] = useState([]);
    const [possibleMonths, setPossibleMonths] = useState([]);

    const [selectedType, setSelectedType] = useState('all'); // State for selected type filter
    const [selectedCategory, setSelectedCategory] = useState('all'); // State for selected category filter
    const [selectedYear, setSelectedYear] = useState('all'); // State for selected year filter
    const [selectedMonth, setSelectedMonth] = useState('all'); // State for selected month filter

    // Handler for type filter change
    const handleTypeFilterChange = (type) => {
        setSelectedType(type);
    };

    // Handler for category filter change
    const handleCategoryFilterChange = (category) => {
        setSelectedCategory(category);
    };

    // Handler for year filter change
    const handleYearFilterChange = (year) => {
        console.log(year);
        setSelectedYear(year);
    };

    // Handler for month filter change
    const handleMonthFilterChange = (month) => {
        setSelectedMonth(month);
    };

    const fetchData = async () => {
        try {
            const res = await showTransaction();
            const categoryId = res.map(transaction => transaction.category_id);
            const categories = await show(categoryId);

            let updateTransaction = res.map(transaction => {
                const category = categories.find(cat => cat.category_id === transaction.category_id);
                return {
                    ...transaction, 
                    category_name: category ? category.category_name: "Categoria Inexistente"
                };
            });

            // Apply filters
            if (selectedType && selectedType !== 'all') {
                updateTransaction = updateTransaction.filter(transaction => transaction.type === selectedType);
            }
            if (selectedCategory && selectedCategory !== 'all') {
                updateTransaction = updateTransaction.filter(transaction => transaction.category_name === selectedCategory);
            }

            if (selectedYear && selectedYear !== 'all') {
                updateTransaction = updateTransaction.filter(transaction => new Date(transaction.date).getFullYear() == selectedYear);
            }

            if (selectedMonth && selectedMonth !== 'all') {
                updateTransaction = updateTransaction.filter(transaction => new Date(transaction.date).getMonth() == selectedMonth);
            }
 
            // Update possible types and categories based on filtered transactions
            const possibleTypes = [...new Set(updateTransaction.map(transaction => transaction.type))]
                .sort() // Sort alphabetically
                .map(type => ({ value: type, label: type }));

            const possibleCategories = [...new Set(updateTransaction.map(transaction => transaction.category_name))]
                .sort() // Sort alphabetically
                .map(category => ({ value: category, label: category }));

            const possibleYears = [...new Set(updateTransaction.map(transaction => new Date(transaction.date).getFullYear()))]
                .sort((a, b) => a - b) // Sort numerically
                .map(year => ({ value: year, label: year }));

            const possibleMonths = [...new Set(updateTransaction.map(transaction => new Date(transaction.date).getMonth()))]
                .sort((a, b) => a - b) // Sort numerically
                .map(month => ({ value: month, label: month + 1 })); // Adjust for zero-indexed months and for readability    

            setPossibleYears([...possibleYears]);
            setPossibleMonths([...possibleMonths]);
            setPossibleCategories([...possibleCategories]);
            setPossibleTypes([...possibleTypes]);
            setHistoric(updateTransaction);
        } catch (error) {
            console.error('Erro ao buscar dados de transação:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedYear, selectedMonth, selectedType, selectedCategory, userid]); // Re-fetch data when filters or userid change
    const keys = ["category_name", "value", "descricao", "type"];

    return (
        <Container>
            <Body>
                <Navbar />   
                <Headers> 
                    <h1>Histórico</h1>
                    <FilterContainer>
                        <FilterElement>
                            <label>Tipo</label>
                            <Filter onFilterChange={handleTypeFilterChange} options={possibleTypes}/>
                        </FilterElement>
                        <FilterElement>
                            <label>Categoria</label>
                            <Filter onFilterChange={handleCategoryFilterChange} options={possibleCategories}/>
                        </FilterElement>
                        <FilterElement>
                            <label>Ano</label>
                            <Filter onFilterChange={handleYearFilterChange} options={possibleYears}/>
                        </FilterElement>
                        <FilterElement>
                            <label>Mês</label>
                            <Filter onFilterChange={handleMonthFilterChange} options={possibleMonths}/>
                        </FilterElement>
                    </FilterContainer>
                </Headers> 
                <Layout>
                    <FrameHistoric label="Histórico">
                        <TableHistoric keys={keys} data={historic}/>
                    </FrameHistoric>    
                </Layout>
            </Body>
        </Container>
    );
};

export default Historico;