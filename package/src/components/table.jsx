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
    color: #1F2731;
`; 

const Tr = styled.tr`
    
    &:hover {
        background-color: #e4e4e4;
    }

`;

const Row = ({ record }) => {
    const keys = Object.keys(record);

    return (
        <Tr keys={record.id}>
            { keys.map(key => <Td key={key}>{record[key]}</Td>) }
        </Tr>
    )
}

const Table = ({ data }) => {
    const keys = Object.keys(data[0]);
    return (
        <TableStyle>
            <tbody>
                { data.map(record => <Row record={record} />)}
            </tbody>
        </TableStyle>
    )
}

export default Table;