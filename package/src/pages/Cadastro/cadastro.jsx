import styled from "styled-components";
import Container from "../../components/container";
import Navbar from "../../components/navbar";
import { FrameRegister } from "../../components/frame";
import { Inputs, CurrencyInput } from "../../components/inputs";
import Button from "../../components/button";
import { CiCircleInfo } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../components/modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { create, show } from "./category";
import { createTransaction } from "./transaction";

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

const Label = styled.label `
    padding: 20px 0 5px 20px;
    margin-left: 20px;
    display: flex;
    font-size: 1rem;
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
    
    // Estado do Modal 
    const [modal, setModal] = useState(false);
    
    // Estado da categoria 
    const [category, setCategory] = useState('');
    const [userid, setUserid] = useState('');

    // Estado do option
    const [categories, setCategories] = useState([]);

    // Estado do Loading
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const data = await show();
        setCategories(data);
    }

    useEffect(() => {
        const fetchUserid = async () => {
          const response = await axios.get('http://localhost:8000/auth', { withCredentials: true });
          setUserid(response.data.user_id);
        };

        fetchUserid();  
        fetchData();
      }, []);

      const removeCurrencyFormatting = (price) => {
        return parseFloat(price.replace(/[R$ ]/g, '').replace(',', '.'));
      };

      const handleTransaction = async () => {
        try {
            const csrfTokenResponse = await axios.get('http://localhost:8000/csrf-token', { withCredentials: true });
            const csrfToken = csrfTokenResponse.data;

            const tipo = document.getElementById("type").value;
            const value = document.getElementById("price").value;
            const descricao = document.getElementById("desc").value;
            const category = document.getElementById("category").value;
            const dateNow = new Date(Date.now());
            
            const date = dateNow.toISOString().slice(0, 19).replace('T', ' ');
            const createdAt = dateNow.toISOString().slice(0, 19).replace('T', ' ');

            const formattedValue = removeCurrencyFormatting(value);

            const response = await createTransaction(category, userid, tipo, formattedValue, descricao, date, createdAt, csrfToken);

            if(!response) {
                console.log("Transaction created with success!");  
            } else {
                console.log("Error in creating transaction!");
            }
        
        } catch (error) {
            console.error('Erro ao criar transaction:', error);
        }
      }

      const handleCategory = async () => {
        try {

          setLoading(true); 
          const csrfTokenResponse = await axios.get('http://localhost:8000/csrf-token', { withCredentials: true });
          const csrfToken = csrfTokenResponse.data;
    
          const success = await create(category, userid, csrfToken);
    
          if (!success) {
            console.log("Category created with success!");
            setModal(false);
            window.location.reload();
          } else {
            console.log("Error in creating category!");
          }
        } catch (error) {
          console.error('Erro ao criar categoria:', error);
        } finally {
            setLoading(false); 
        }
      };

    return(
        <Container>
            <Body>
                <Modal isOpen={modal} setOpenModal={() => setModal(!modal)}>
                    {loading && <p>Loading...</p>}
                    <h1>Categorias</h1>
                    <div>
                        <form onSubmit={e => e.preventDefault()}>
                            <label>Nome:</label>
                                <Inputs 
                                    inputStyle="input_category"
                                    placeholder="Digite o nome da categoria..."
                                    value={category}
                                    onChange={setCategory}
                                />
                                <Button 
                                    name="Criar"
                                    buttonStyle="open"
                                    onClick={handleCategory}
                                />
                        </form>
                    </div>
                </Modal>
                <Navbar />
                <Headers> 
                    <h1>Cadastro</h1>
                    <CiCircleInfo />
                </Headers>
                    <Layout>
                        <FrameRegister label="Entradas/Saidas">
                            <Form>
                                <form onSubmit={e => e.preventDefault()}>
                                    <Label>Categoria:<Span onClick={() => setModal(true)}><FaPlus /></Span></Label>
                                    <Select 
                                        id="category"
                                        defaultValue=""
                                    >   
                                        <Option value="" disabled>Selecione uma categoria</Option>
                                        {categories.filter(category => category.user_id === userid || category.user_id === 0).map((category) => (
                                            <Option key={category.category_id} value={category.category_id}>
                                                {category.category_name}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Label>Tipo: </Label>
                                    <Select 
                                        id="type" 
                                        defaultValue="Entrada"
                                    >  
                                        <Option value="Entrada">Entrada</Option>    
                                        <Option value="Saida">Saida</Option>
                                    </Select>
                                    <Label>Valor: </Label>
                                    <CurrencyInput
                                        inputStyle="input_register"
                                        id="price"
                                    />
                                    <Label>Descrição: </Label>
                                    <Desc 
                                        id="desc" 
                                        placeholder="Descrição do registro..." 
                                        required
                                    />
                                </form>
                                <BoxButton>
                                    <Button 
                                        name="Cadastrar" 
                                        buttonStyle="open"
                                        onClick={handleTransaction}
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