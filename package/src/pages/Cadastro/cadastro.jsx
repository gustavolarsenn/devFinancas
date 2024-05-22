import styled from "styled-components";
import Container from "../../components/container";
import Navbar from "../../components/navbar";
import { FrameRegister } from "../../components/frame";
import Inputs from "../../components/inputs";
import Button from "../../components/button";
import { CiCircleInfo } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

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
    justify-content: center;
`;

const Label = styled.label `
    padding: 20px 0 5px 20px;
    margin-left: 20px;
    display: flex;
    font-size: 20px;
    color: #717274;
    
`;

const Select = styled.select `
    width: 90%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    background-color: white;
    margin: 0 40px;
    text-indent: 15px;
    font-size: 15px;
    color: #949494;


    &:focus {
        outline: none;
    }
`;

const BoxButton = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 30px;
`;

const Desc = styled.textarea `
    width: 90%;
    height: 150px;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    background-color: white;
    margin: 0 40px;
    padding: 15px;
    font-size: 15px;

    &:focus {
        outline: none;
        border: 1px solid #004c9c; 
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
    }
`;

const Option = styled.option `
    color: #949494;

`;

const Form = styled.div `
    width: 1000px;
    align-content: center;
    margin: 0 400px;
    padding-top: 30px;
`;

const Span = styled.span `
    padding: 0;
    cursor: pointer;
    font-size: 15px;
    display:flex;
    align-items: center;
    color: #1F2731;

    &:hover {
        color: #949494;
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
                        <FrameRegister label="Entradas/Saidas">
                            <Form>
                                <form>
                                    <Label>Categoria:<Span><FaPlus /></Span></Label>
                                    <Select>    
                                        <Option disabled>Categoria</Option> 
                                    </Select>
                                    <Label>Tipo: </Label>
                                    <Select>
                                        <Option>Entrada</Option>    
                                        <Option>Saida</Option>
                                    </Select>
                                    <Label>Valor: </Label>
                                    <Inputs 
                                        type="numeric"
                                        inputStyle="input_register"
                                    />
                                    <Label>Descrição: </Label>
                                    <Desc placeholder="Descrição do registro..." required/>
                                </form>
                                <BoxButton>
                                    <Button 
                                        name="Cadastrar" 
                                        buttonStyle="open"
                                    />
                                </BoxButton>
                            </Form>
                        </FrameRegister>
                    </Layout>
            </Body>
        </Container>
    )
}

export default Cadastro;