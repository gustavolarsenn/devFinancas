import styled from "styled-components";
import Container from "../../components/container";
import Navbar from "../../components/navbar";
import { FrameRegister } from "../../components/frame";
import Inputs from "../../components/inputs";
import Button from "../../components/button";
import { CiCircleInfo } from "react-icons/ci";

const Body = styled.div`
    background-color: #CBCBCB;
    height: 100vh;
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
`;

const Label = styled.label `
    padding: 20px 0 0 20px;
    margin-left: 20px;
    display: flex;
    font-size: 20px;
    color: #717274;
`;

const Select = styled.select `
    width: 90%;
    height: 40px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    background-color: white;
    margin: 0 40px;
    text-indent: 15px;
    font-size: 15px;

    &:focus {
        outline: none;
    }
`;

const Desc = styled.textarea `
    width: 90%;
    height: 150px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    background-color: white;
    margin: 0 40px;
    padding: 15px;
    font-size: 15px;

    &:focus {
        outline: none;
    }
`;


const Cadastro = () => {
    return(
        <Container>
            <Body>
                <Navbar />
                <Headers> 
                    <h1>Cadastro</h1>
                    <CiCircleInfo />
                </Headers>
                    <Layout>
                        <FrameRegister label="Categoria">
                        
                        </FrameRegister>
                        <FrameRegister label="Entradas/Saidas">
                            <form>
                                <Label>Categoria: </Label>
                                <Select />
                                <Label>Tipo: </Label>
                                <Select>
                                    <option>Entrada</option>    
                                    <option>Saida</option>
                                </Select>
                                <Label>Valor: </Label>
                                <Inputs 
                                    type="text"
                                    inputStyle="input_register"
                                />
                                <Label>Descricao: </Label>
                                <Desc placeholder="Descricao do registro..." required/>
                            </form>
                            <Button name="Entrar" buttonStyle="open"/>
                        </FrameRegister>
                    </Layout>
            </Body>
        </Container>
    )
}

export default Cadastro;