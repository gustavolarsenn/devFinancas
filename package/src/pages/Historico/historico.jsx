import Navbar from "../../components/navbar";
import Container from "../../components/container";
import styled from "styled-components";
import { FrameHistoric } from "../../components/frame";
import {TableHistoric} from "../../components/table";
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

    const fetchData = async () => {
        try {
            const res = await showTransaction();
            setHistoric(res);
            console.log(res);

            const categoryId = res.map(transaction => transaction.category_id);
            const categories = await show(categoryId);

            const updateTransaction = res.map(transaction => {
                const category = categories.find(cat => cat.category_id === transaction.category_id);
                return {
                    ...transaction, 
                    category_name: category ? category.category_name: "Categoria Inexistente"
                };
            });

            setHistoric(updateTransaction);
        } catch (error) {
            console.error('Erro ao buscar dados de transação:', error);
        }

    } 

    useEffect(() => {
        fetchData();
    }, []);

    const keys = ["category_name", "value", "descricao", "type"];

    return (
        <Container>
            <Body>
                <Navbar />   
                <Headers> 
                    <h1>Histórico</h1>
                </Headers> 
                <Layout>
                    <FrameHistoric label="Histórico">
                        <TableHistoric keys={keys} data={historic}/>
                    </FrameHistoric>    
                </Layout>
            </Body>
        </Container>

    )
}

export default Historico;