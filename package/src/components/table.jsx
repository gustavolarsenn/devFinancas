import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";
import Modal from "../components/modal";
import { FaRegTrashAlt } from "react-icons/fa";

const TableStyle = styled.table`
    width: 100%;
    height: 100%;
    border-collapse: collapse;
`;

const TableCat = styled.table`
    width: 100%;
    max-height: 300px;
    border-collapse: collapse;
`;

const Tbody = styled.tbody`
    width: 100%;
    max-height: 70%;

    &::-webkit-scrollbar {
        width: 15px;
    }

    &::-webkit-scrollbar-thumb {
       background-color: #C3C3C3;
       border-radius: 5px;
    }
`;

const Td = styled.td`
    padding: 15px;
    width: 50%;
    text-align: start;
    font-size: 1rem;
    color: ${(props) => (props.transactiontype === "Entrada" ? "green" : "red")};
`;

const TdHistoric = styled.td`
    padding: 15px;
    width: 30%;
    text-align: start;
    font-size: 1rem;
`; 

const Icontd = styled.td`
    text-align: end;
    padding-right: 15px;
`;

const Span = styled.span`
    text-align: end;
    padding-right: 15px;
    cursor: pointer;
`;

const Tr = styled.tr`
    background-color: ${(props) => (props.transactiontype === "Entrada" ? "rgba(0, 255, 0, 0.035)" : "rgba(255, 0, 0, 0.035)")};
    border-bottom: 1px solid #e4e4e4;
    &:hover {
        background-color: #e4e4e4;
    }
`;

const OptionsContainer = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    background-color: white;
    border: none;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width: 70px;
    min-width: 80px;
`;

const Option = styled.div`
    text-align: center;
    font-size: 13px;
    padding: 5px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const DivTable = styled.div `
    width: 100%;
    max-height: 350px;
    padding-top: 20px;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 15px;
    }

    &::-webkit-scrollbar-thumb {
       background-color: #C3C3C3;
       border-radius: 5px;
    }
`;

const CategoryTr = styled.div`
    justify-content: space-between;
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #e4e4e4;
`
const Row = ({ record, keys }) => {
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    // Estado do Modal 
    const [modal, setModal] = useState(false);

    const toggleOptions = (e) => {
        const rect = e.target.getBoundingClientRect();
        setMenuPosition({ x: rect.right, y: rect.bottom });
        setOptionsVisible(!optionsVisible);
    };

    const handleEdit = () => {
        // Implementar lógica de edição aqui
        console.log(`Editar registro com id ${record.id}`);
        setOptionsVisible(false); // Fechar menu após ação
        setModal(!modal);
    };

    const handleDelete = () => {
        // Implementar lógica de exclusão aqui
        console.log(`Excluir registro com id ${record.id}`);
        setOptionsVisible(false); // Fechar menu após ação
    };

    return (
        <Tr key={record.id} transactiontype={record.type}>
            {keys.map((key) => (
                <Td key={key} transactiontype={record.type} >
                    {key === 'value'
                        ? `R$${record[key].toLocaleString()}`
                        : record[key]}
                </Td>
            ))}
            <Icontd>
                <Span onClick={toggleOptions}>
                    <SlOptions />
                </Span>
                <Modal isOpen={modal} setOpenModal={() => setModal(!modal)}>
                    
                </Modal>
                {optionsVisible && (
                    <OptionsContainer style={{ top: menuPosition.y, left: menuPosition.x }}>
                        <Option onClick={handleEdit}>Editar</Option>
                        <Option onClick={handleDelete}>Excluir</Option>
                    </OptionsContainer>
                )}
            </Icontd>
        </Tr>
    );
};

const RowHistoric = ({ record, keys }) => {
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    // const optionClicked = document.getElementById("OptionsContainer");

    // // const catchClick = (event) => {
    // //     if(event.target !== optionClicked) {
    // //         setOptionsVisible(false);
    // //     }
    // // }

    const toggleOptions = (e) => {
        const rect = e.target.getBoundingClientRect();
        setMenuPosition({ x: rect.right, y: rect.bottom });
        setOptionsVisible(!optionsVisible);
    };

    const handleEdit = () => {
        // Implementar lógica de edição aqui
        console.log(`Editar registro com id ${record.id}`);
        setOptionsVisible(false); // Fechar menu após ação
    };

    const handleDelete = () => {
        // Implementar lógica de exclusão aqui
        console.log(`Excluir registro com id ${record.id}`);
        setOptionsVisible(false); // Fechar menu após ação
    };

    
    // document.addEventListener("click", catchClick);

    return (
        <Tr key={record.id} transactiontype={record.type}>
            {keys.map((key) => (
                <TdHistoric key={key} transactiontype={record.type}>
                    {key === 'value'
                        ? `R$${record[key].toLocaleString()}`
                        : record[key]}
                </TdHistoric>
            ))}
            <Icontd>
                <Span onClick={toggleOptions}>
                    <SlOptions />
                </Span>
                {optionsVisible && (
                    <OptionsContainer style={{ top: menuPosition.y, left: menuPosition.x }}>
                        <Option onClick={handleEdit}>Editar</Option>
                        <Option onClick={handleDelete}>Excluir</Option>
                    </OptionsContainer>
                )}
            </Icontd>
        </Tr>
    );
}

const RowCategory = ({ categoryid, record, keys, icon}) => {
    return (
        <Tr categoryid={categoryid} key={record.id}>
            {keys.map((key) => (
                <TdHistoric key={key} transactiontype={record.type}>
                    {key === 'value'
                        ? `R$${record[key].toLocaleString()}`
                        : record[key]}
                </TdHistoric>
            ))}
            <Icontd>
                <Span>
                    {icon}
                </Span>
            </Icontd>
        </Tr>
    );
}

const Table = ({ data, keys }) => {
    return (
        <TableStyle>
            <tbody>
                {data && data.map((record, index) => (
                    <Row key={record.id || index} record={record} keys={keys}/>
                ))}
            </tbody>
        </TableStyle>
    );
};

const TableHistoric = ({ data, keys }) => {
    return (
        <TableStyle>
            <tbody>
                {data && data.map((record, index) => (
                    <RowHistoric key={record.id || index} record={record} keys={keys}/>
                ))}
            </tbody>
        </TableStyle>
    );
};

const TableCategory = ({ catTable, handleDelete, keys }) => {
    return (
      <DivTable>
        {catTable.map((categoryItem) => (
          <div key={categoryItem.category_id}>
            {/* Your existing rendering logic for each category item */}
            <CategoryTr>
              {categoryItem.category_name}
              <FaRegTrashAlt onClick={() => handleDelete(categoryItem.category_id)} style={{'cursor': 'pointer', 'color': 'red'}}/>
            </CategoryTr>
            {/* Add any other elements you need to render for each category item */}
          </div>
        ))}
      </DivTable>
    );
  };

export { Table, TableHistoric, TableCategory };