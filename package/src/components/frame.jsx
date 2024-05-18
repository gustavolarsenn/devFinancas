import styled from 'styled-components';

const Register = styled.div`
    background-color: white;    
    height: 600px;
    width: 90%;
    border-radius: 15px;
    margin: 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
   
`;

const SmallFrame = styled.div`
    background-color: white;    
    height: 250px;
    width: 50%;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    margin: 0;
    margin-top: 30px;
`;

const FrameGraph = styled.div`
    background-color: white;    
    height: 320px;
    width: 95%;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    margin: 0;
`;

const Title = styled.p`
    font-size: 30px;
    background-color: #1F2731;
    padding: 1rem;
    display: flex;
    justify-content: center;
    color: white;
    border-radius: 15px 15px 0px 0px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    
`;

const FrameTable = ({children, label}) => {
    return (
        <Register>
            <div>
                <Title>{label}</Title>
            </div>
            <div>
                {children}
            </div>
        </Register>
    )
}

const Frame= ({children, label}) => {
    return (
        <SmallFrame>
            <div>
                <Title>{label}</Title>
            </div>
            <div>
                {children}
            </div>
        </SmallFrame>
    )
}

const FrameGraphic = ({children, label}) => {
    return (
        <FrameGraph>
            <div>
                <Title>{label}</Title>
            </div>
            <div>
                {children}
            </div>
        </FrameGraph>
    )
}

const FrameRegister = ({children, label}) => {
    return (
        <FrameGraph>
            <div>
                <Title>{label}</Title>
            </div>
            <div>
                {children}
            </div>
        </FrameGraph>
    )
}

export {FrameTable, Frame, FrameGraphic};