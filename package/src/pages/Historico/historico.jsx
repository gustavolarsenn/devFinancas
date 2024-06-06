import Navbar from "../../components/navbar";
import Container from "../../components/container";
import styled from "styled-components";
import { FrameRegister } from "../../components/frame";

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
    return (
        <Container>
            <Body>
                <Navbar />   
                <Headers> 
                    <h1>Histórico</h1>
                </Headers> 
                <Layout>
                    <FrameRegister label="Histórico">

                    </FrameRegister>    
                </Layout>
            </Body>
        </Container>

    )
}

export default Historico;