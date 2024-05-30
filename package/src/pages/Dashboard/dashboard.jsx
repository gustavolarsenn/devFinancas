import styled from "styled-components";
import Container from "../../components/container";
import Spinner from '../../components/loadingSpinner';
import {FrameTable, Frame, FrameGraphic} from "../../components/frame";
import Navbar from "../../components/navbar";
import Table from "../../components/table";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Headers = styled.div`
    font-size: 1.5rem;
    color: #1F2731;
    margin: 30px;
`;

const Body = styled.div`
    background-color: #CBCBCB;
    height: 100vh;
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

    const data = [
        {"category": "Sáude", "saldo": "R$300,00"},
        {"category": "Outros", "saldo": "R$35,00"},
        {"category": "Academia", "saldo": "R$40,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Freelancer", "saldo": "R$29,00"},
        {"category": "Comida", "saldo": "R$998,00"}
    ]

    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchUsername = async () => {
        const response = await axios.get('http://localhost:8000/auth', { withCredentials: true });
        setUsername(response.data.username);
        setIsLoading(false);
      };
  
      fetchUsername();
    }, []);

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
                            <Table data={data} />
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