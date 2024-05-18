import styled from "styled-components";
import Container from "../../components/container";
import Navbar from "../../components/navbar";
import { Frame } from "../../components/frame";


const Body = styled.div`
    background-color: #CBCBCB;
    height: 100vh;
`;

const Cadastro = () => {
    return(
        <Container>
            <Body>
                <Navbar /> 
                <Frame>
                    
                </Frame>
            </Body>
        </Container>
    )
}

export default Cadastro;