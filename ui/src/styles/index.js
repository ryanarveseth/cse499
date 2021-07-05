import styled from "styled-components";

export const Page = styled.div`
  background: #505050;
  height: 100vh;
  width: 100vw;
`

export const PageContent = styled.div`
  padding: 32px;
`;

export const Prediction = styled.div`
  font-size: 20px;
  margin-bottom: 32px;
`;

export const EmptyImage = styled.div`
  background-color: lightGrey;
  height: 320px; 
  width: 320px;
  margin: 0 auto;
`;

export const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  border: 0px;
  cursor: pointer;
  margin-top: 24px;
`;

export const SubmitButton = styled(Button)`
  background-color: #20bf6b;
  border: 2px solid #20bf6b;
  transition: .5s ease;
  
  &:hover {
    background-color: white;
    transition: .5s ease;
  }
`;

export const CloseButton = styled(Button)`
  background-color: FireBrick;
  border: 2px solid FireBrick;
  transition: .5s ease;
  margin-right: 16px;
  &:hover {
    background-color: white;
    transition: .5s ease;
  }
`;

export const Modal = styled.div`
  width: fit-content;
  height: fit-content;
  position: fixed;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black !important;
  padding: 32px;
  border-radius: 16px;
`;


export const ImageContainer = styled.div`
  border-radius: 8px;
`;

export const Overlay = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.5);
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
`;

export const Spinner = styled.div`
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
  color: #20bf6b;
  font-size: 10px;
  margin: 200px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  
  z-index: 3;

  &:before {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
    content: '';
    position: absolute;
    top: 0;
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  
  &:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
    content: '';
    position: absolute;
    top: 0;
    left: 3.5em;
  }
`;

export const Footer = styled.div`
  position: fixed; 
  bottom: 0;
`;

export const SelectImageButton = styled.button`
  color: #20bf6b;
  text-transform: uppercase;
  background: transparent;
  padding: 20px;
  border: 3px solid #20bf6b;
  border-radius: 4px;
  transition: all .3s ease 0s;
  margin-top: 32px;
  cursor: pointer;
  
  &:hover {
    color: white;
    border-radius: 30px;
    border-color: white;
    transition: all .3s ease 0s;
  }
`;

export const ButtonToggleLeft = styled.button`
  height: 40px;
  width: 60px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: black;
  background-color: white;
  border: 2px solid #20bf6b;
  cursor: pointer; 
`;

export const ButtonToggleRight = styled.button`
  height: 40px;
  width: 60px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  color: black;
  background-color: white;
  border: 2px solid FireBrick;
  cursor: pointer;
`;
