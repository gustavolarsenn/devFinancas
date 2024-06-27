import styled from 'styled-components';
import { IoDocumentTextSharp } from "react-icons/io5";

const Table = styled.div`
    background-color: white;    
    height: 600px;
    width: 90%;
    border-radius: 5px;
    margin: 0px 30px 30px 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);   
`;

const Register = styled.div`
    background-color: white;    
    height: 700px;
    width: 100%;
    border-radius: 5px;
    margin: 0px 30px 30px 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Historic = styled.div`
    background-color: white;    
    height: 570px;
    width: 100%;
    border-radius: 5px;
    margin: 0px 30px 30px 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const SmallFrame = styled.div`
    background-color: white;    
    height: 180px;
    width: 50%;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin: 0;
`;

const Chart = styled.div`
    background-color: white;    
    height: 180px;
    width: 50%;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin: 0;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FrameGraph = styled.div`
    background-color: white;    
    height: 390px;
    width: 95%;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin: 0;
`;

const Title = styled.p`
    font-size: 1em;
    background-color: #1F2731;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    color: white;
    border-radius: 5px 5px 0px 0px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    
`;

const TableContainer = styled.div`
    max-height: 560px;
    overflow: hidden;
    overflow-y: scroll;
    

    &::-webkit-scrollbar {
        width: 15px;
    }

    &::-webkit-scrollbar-thumb {
       background-color: #C3C3C3;
       border-radius: 5px;
    }

`;

const FrameTable = ({children, label}) => {
    return (
        <Table>
            <div>
                <Title>{label}</Title>
            </div>
            <TableContainer>
                {children}
            </TableContainer>
        </Table>
    )
}

const Frame= ({children, label}) => {
    return (
        <SmallFrame>
            <div>
                <Title>{label}</Title>
            </div>
            <div style={{marginTop: '45px'}}>
                {children}
            </div>
        </SmallFrame>
    )
}
const FrameChart = ({children, label, color}) => {
    return (
        <Chart>
            <div>
                <Title>{label}</Title>
            </div>
            <div color={color}>
                {children}
            </div>
        </Chart>
    )
}

const FrameGraphic = ({children, label, icon}) => {
    return (
        <FrameGraph>
            <div>
                <Title>{label}<IoDocumentTextSharp /></Title>
            </div>
            <div>
                {children}
            </div>
        </FrameGraph>
    )
}

const FrameRegister = ({children, label}) => {
    return (
        <Register>
            <div>
                <Title>{label}</Title>
            </div>
            <Content>
                <div>
                    {children}
                </div>
            </Content>
        </Register>
    )
}

const FrameHistoric = ({children, label}) => {
    return (
        <Historic>
            <div>
                <Title>{label}</Title>
            </div>
            <TableContainer>
                {children}
            </TableContainer>
        </Historic>
    )
}

export {FrameRegister, FrameTable, Frame, FrameGraphic, FrameChart, FrameHistoric};