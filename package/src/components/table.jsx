import styled from "styled-components";

const TableStyle = styled.table`
    width: 100%;
    height: 100%;
    border-collapse: collapse;
`;

const Td = styled.td`
    padding: 20px 20px 20px 60px;
    width: 100px;
    text-align: start;
    font-size: 25px;
    color: ${(props) => (props.transactionType === "Entrada" ? "green" : props.transactionType === "Saida" ? "red" : "#1F2731")};
`; 

const Tr = styled.tr`
    &:hover {
        background-color: #e4e4e4;
    }

`;

const Row = ({ record, keys }) => {

    return (
        <Tr key={record.id} >
            { keys.map(key => <Td key={key} transactionType={record.type}>{key === "value" ? `R$${record[key].toLocaleString()}` : record[key]}</Td>) }
        </Tr>
    )
}

const Table = ({ data, keys }) => {
    return (
        <TableStyle>
            <tbody>
                {data.map((record, index) => (
                    <Row key={record.id || index} record={record} keys={keys}/>
                ))}
            </tbody>
        </TableStyle>
    );
};


export default Table;