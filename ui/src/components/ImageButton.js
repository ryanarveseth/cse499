import React from 'react';
import styled from "styled-components";

const Button = styled.button`
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

const ImageButton = ({selectImage, setShowPrediction, setPrediction}) => {

  const clickFileInput = () => {
    setShowPrediction(false);
    setPrediction();
    document.getElementById("fileInput").click();
  }

  return (
    <div>
      <input type="file"
             id="fileInput"
             style={{display: "none"}}
             onChange={selectImage}
             accept="image/*"/>
      <Button onClick={clickFileInput}>
        Select Image File
      </Button>
    </div>
  );
}

export default ImageButton;