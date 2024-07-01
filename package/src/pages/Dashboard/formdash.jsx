import styled from "styled-components";
import { Inputs, CurrencyInput } from "../../components/inputs";
import Button from "../../components/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { show } from "../Cadastro/category";
import { editTransaction, get } from "../Cadastro/transaction";

const Label = styled.label`
    padding: 20px 0 5px 0px;
    margin-left: 0px;
    display: flex;
    font-size: 1rem;
    color: #717274;
`;

const Select = styled.select`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    background-color: white;
    margin: 0;
    text-indent: 15px;
    font-size: 15px;
    color: #949494;


    &:focus {
        outline: none;
    }
`;

const BoxButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 30px;
`;

const Desc = styled.textarea`
    width: 100%;
    height: 150px;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    background-color: white;
    margin: 0;
    padding: 15px;
    font-size: 15px;

    &:focus {
        outline: none;
        border: 1px solid #004c9c; 
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
    }
`;

const Option = styled.option`
    color: #949494;
`;

const Form = styled.form`
    width: 100%;
    max-width: 100%;
    align-items: center;
`;

const Divform = styled.div`
    width: 100%;
    align-content: center;
`;

const FormDash = ({ transactionId }) => {
  // Estado do usuário 
  const [userid, setUserid] = useState('');

  // Estado do option
  const [categories, setCategories] = useState([]);

  // Estado de todos os campos da transação para a edição
  const [transactionID, setTransactionID] = useState(transactionId);
  const [categoryId, setCategoryId] = useState();
  const [type, setType] = useState();
  const [value, setValue] = useState();
  const [desc, setDesc] = useState();
  
  // Step 1: Create a new Date object for the current date
  const currentDate = new Date();
  
  // Step 2: Format the date to "YYYY-MM-DD"
  const formattedDate = currentDate.toISOString().split('T')[0];
  const [date, setDate] = useState(formattedDate);
  
  const fetchData = async () => {
    const data = await show();
    setCategories(data);
  }

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        // Obter o token CSRF
        const csrfTokenResponse = await axios.get('http://localhost:8000/csrf-token', { withCredentials: true });
        const csrfToken = csrfTokenResponse.data;
  
        // Obter os dados da transação usando a função get
        const res = await get(transactionID, csrfToken, userid);
  
        // Verificar se res contém os dados esperados
        console.log('Dados da transação:', res);
  
        setCategoryId(res[0].category_id);
        setType(res[0].type);
        setValue(res[0].value);
        setDesc(res[0].descricao);
        
        
      } catch (error) {
        console.error('Erro ao buscar transação:', error);
        throw error;
      }
    }

    const fetchUserid = async () => {
      const response = await axios.get('http://localhost:8000/auth', { withCredentials: true });
      setUserid(response.data.user_id);
    };

    setTransactionID(transactionId);

    fetchTransaction();
    fetchUserid();
    fetchData();
  }, [userid, transactionID]);

  const removeCurrencyFormatting = (price) => {
    return parseFloat(price.replace(/[R$ ]/g, '').replace(/\./g, '').replace(',', '.'));
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

      const createdAt = dateNow.toISOString().slice(0, 19).replace('T', ' ');

      const formattedValue = removeCurrencyFormatting(value);

      const response = await editTransaction(transactionId, category, userid, tipo, formattedValue, descricao, date, createdAt, csrfToken);

      if (!response) {
        console.log("Transaction edited with success!");
        window.location.reload();
      } else {
        console.log("Error in creating transaction!");
      }

    } catch (error) {
      console.error('Erro ao criar transaction:', error);
    }
  }

  return (
    <Divform>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Label>
          Categoria:
        </Label>
        <Select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          <Option value="" disabled>
            Selecione uma categoria
          </Option>
          {categories &&
            categories
              .map((category) => (
                <Option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </Option>
              ))}
        </Select>
        <Label>Tipo: </Label>
        <Select id="type" value={type} onChange={e => setType(e.target.value)}>
          <Option value="Entrada">Entrada</Option>
          <Option value="Saida">Saida</Option>
        </Select>
        <Label>Valor: </Label>
        <CurrencyInput inputStyle="input_register" id="price" value={value} onChange={e => setValue(e.target.value)}/>
        <Label>Descrição: </Label>
        <Desc id="desc" placeholder="Descrição do registro..." value={desc} onChange={e => setDesc(e.target.value)} required />
        <Label>Data: </Label>
        <Inputs
          type="date"
          inputStyle="input_register"
          id="date"
          value={date}
          onChange={setDate} // Adicione o onChange para atualizar setDate
        />
      </Form>
      <BoxButton>
        <Button
          name="Editar"
          buttonStyle="open"
          onClick={handleTransaction}
          required
        />
      </BoxButton>
    </Divform>
  );
};

export default FormDash;
