import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const Window = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
`;

const Content = styled.div `
    background-color: white;
    padding: 16px 24px;
    width: 550px;
    height: 600px;
    border-radius: 5px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
`;

const Children = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    margin: 0;
`;

const Span = styled.span `
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: end;

    &:hover {
        color: #949494;
    }
`;


const Modal = ({isOpen, setOpenModal, children}) => {
    
    if(isOpen) {
        return(
                <Window>
                    <Content>
                        <Span onClick={setOpenModal}><IoClose /></Span>
                        <Children>
                            {children}
                        </Children>
                    </Content>
                </Window>
        )
    }

    return null;

}

export default Modal
