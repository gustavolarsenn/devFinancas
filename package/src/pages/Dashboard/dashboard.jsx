import styled from "styled-components";
import Container from "../../components/container";
import Spinner from '../../components/loadingSpinner';
import {FrameTable, Frame, FrameGraphic} from "../../components/frame";
import Navbar from "../../components/navbar";
import {Table} from "../../components/table";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showTransaction } from "../Cadastro/transaction";
import { show } from "../Cadastro/category";

const Headers = styled.div`
    font-size: 1.5rem;
    color: #1F2731;
    margin: 30px;
`;

const Body = styled.div`
    background-color: #CBCBCB;
    min-height: 100vh;
`;

const SubTitle = styled.h2 `
    font-weight: 250;
`;

const Layout = styled.div `
    display: flex;
`;

const RightPage = styled.div `
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const SupRightPage = styled.div `
    width: 95%;
    height: 100%;
    display: flex;
    gap: 10px;
    justify-content: space-between;
`;

const LeftPage = styled.div `
    width: 50%;
`;

const InfRightPage  = styled.div `
    width: 100%;
`;

const Dashboard = () => {

    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

    const fetchData = async () => {
        try {
            const res = await showTransaction();

            const categoryId = res.map(transaction => transaction.category_id);
            const categories = await show(categoryId);

            const updateTransaction = res
            .filter(transaction => transaction.user_id === userid)
            .map(transaction => {
                const category = categories.find(cat => cat.category_id === transaction.category_id);
                return {
                    ...transaction, 
                    category_name: category ? category.category_name: "Categoria Inexistente"
                };
            });
            setTransactions(updateTransaction);
        } catch (error) {
            console.error('Erro ao buscar dados de transação:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
      const fetchUsername = async () => {
        const response = await axios.get('http://localhost:8000/auth', { withCredentials: true });
        setUsername(response.data.username);
        setUserid(response.data.user_id);
        setIsLoading(false);

      };
  
      fetchData();
      fetchUsername();
    }, [userid]);

    const keys = ["category_name", "value"];

    if (isLoading) {
        return <Spinner />;
      }
    return (
        <Container>
            <Body>
                <Navbar />
                <Headers>
                    <h1>Bem-vindo, {username}!</h1>
                    <SubTitle>É bom ter você de volta!</SubTitle>
                </Headers>
                <Layout>
                    <LeftPage>
                        <FrameTable label="Registro/Histórico">
                            <Table keys={keys} data={transactions}/>
                        </FrameTable>
                    </LeftPage>
                    <RightPage>
                        <SupRightPage>
                            <Frame label="Saldo"></Frame>
                            <Frame label="Mês anterior"></Frame>
                        </SupRightPage>
                        <InfRightPage>
                            <FrameGraphic label="Relatório"></FrameGraphic>
                        </InfRightPage>
                    </RightPage>
                </Layout>
            </Body>
        </Container>
    )
}

export default Dashboard;