import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";

const TableStyle = styled.table`
    width: 100%;
    height: 100%;
    border-collapse: collapse;
`;

const Td = styled.td`
    padding: 15px;
    width: 50%;
    text-align: start;
    font-size: 1rem;
    color: ${(props) => (props.transactiontype === "Entrada" ? "green" : props.transactiontype === "Saida" ? "red" : "#1F2731")};
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


const Row = ({ record, keys }) => {
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

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

    return (
        <Tr key={record.id}>
            {keys.map((key) => (
                <Td key={key} transactiontype={record.type}>
                    {key === 'value'
                        ? `R$${record[key].toLocaleString()}`
                        : record[key]}
                </Td>
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
        <Tr key={record.id}>
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

const RowCategory = ({ record, keys }) => {

    // const handleDelete = () => {
    //     // Implementar lógica de exclusão aqui
    //     console.log(`Excluir registro com id ${record.id}`);
    //     setOptionsVisible(false); // Fechar menu após ação
    // };

    return (
        <Tr key={record.id}>
            {keys.map((key) => (
                <TdHistoric key={key} transactiontype={record.type}>
                    {key === 'value'
                        ? `R$${record[key].toLocaleString()}`
                        : record[key]}
                </TdHistoric>
            ))}
            <Icontd>
                <Span>
                    <FaRegTrashAlt />
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

const TableCategory = ({ data, keys }) => {
    return (
        <TableStyle>
            <tbody>
                {data && data.map((record, index) => (
                    <RowCategory key={record.id || index} record={record} keys={keys}/>
                ))}
            </tbody>
        </TableStyle>
    );
};

export { Table, TableHistoric, TableCategory };