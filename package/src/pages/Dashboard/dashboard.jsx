import styled from "styled-components";
import Container from "../../components/container";
import {FrameTable, Frame, FrameGraphic} from "../../components/frame";
import Navbar from "../../components/navbar";

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
    return (
        <Container>
            <Body>
                <Navbar />
                <Headers>
                    <h1>Bem-vindo, Felipe!</h1>
                    <SubTitle>É bom ter você de volta!</SubTitle>
                </Headers>
                <Layout>
                    <LeftPage>
                        <FrameTable label="Registro/Histórico">
                            <table>
                                <tbody>
                                    <td>
                                        TESTE
                                    </td>
                                    <td>
                                        TESTE
                                    </td>
                                    <td>
                                        TESTE
                                    </td>
                                </tbody>
                            </table>
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