import React from 'react';
import {SelectImageButton} from "../styles";


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
      <SelectImageButton onClick={clickFileInput}>
        Select Image File
      </SelectImageButton>
    </div>
  );
}

export default ImageButton;