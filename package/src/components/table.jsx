import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
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

const Row = ({ record, keys }) => {

    // const [options, setOptios] = useState(false);

    return (
        <Tr key={record.id} >
            { keys.map(key => <Td key={key} transactiontype={record.type}>{key === "value" ? `R$${record[key].toLocaleString()}` : record[key]}</Td>) }
            <Icontd>
                <Span>
                    <SlOptions />
                </Span>
            </Icontd>
        </Tr>
    )
}

const RowHistoric = ({ record, keys }) => {

    // const [options, setOptios] = useState(false);

    return (
        <Tr key={record.id} >
            { keys.map(key => <TdHistoric key={key} transactiontype={record.type}>{key === "value" ? `R$${record[key].toLocaleString()}` : record[key]}</TdHistoric>) }
            <Icontd>
                <Span>
                    <SlOptions />
                </Span>
            </Icontd>
        </Tr>
    )
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




export {Table, TableHistoric};