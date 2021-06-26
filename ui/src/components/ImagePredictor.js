import React, {useEffect, useState} from "react";
import ImageButton from "./ImageButton";
import styled from "styled-components";
import PredictionModal from "./PredictionModal";

const mobilenet = require('@tensorflow-models/mobilenet');


const EmptyImage = styled.div`
  background-color: lightGrey;
  height: 320px; 
  width: 320px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  border-radius: 8px;
`;

const Overlay = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.5);
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
`;

const Spinner = styled.div`
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
  color: #20bf6b;
  font-size: 10px;
  margin: 80px auto;
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

const Footer = styled.div`
  position: fixed; 
  bottom: 0;
`;

const ImagePredictor = () => {
  const [model, setModel] = useState();
  const [img, setImg] = useState();
  const [prediction, setPrediction] = useState();
  const [showPrediction, setShowPrediction] = useState(false);
  const [accuracyRating, setAccuracyRating] = useState("");


  useEffect(() => {
    const getAccuracyRating = async () => {
      const res = await fetch("api/get-accuracy");
      const rating = await res.json();
      setAccuracyRating(rating.percentage);
    }

    getAccuracyRating();
  }, []);

  const readImageData = file => {
    if (file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = () => reject(fileReader.error);
        fileReader.readAsDataURL(file);
      });
    } else {
      return undefined;
    }
  }

  const selectImage = async (e) => {
    const file = e.target.files[0];

    setImg(await readImageData(file))
  }

  useEffect(() => {
    const getMobileNet = async () => {
      const modelData = await mobilenet.load();
      setModel(modelData);
    }

    if (model === undefined) {
      getMobileNet();
    }
  }, [model]);

  useEffect(() => {

    const getPrediction = async () => {
      if (model !== undefined && img !== undefined) {
        const inputImage = document.createElement('img');
        inputImage.src = img;

        inputImage.onload = async () => {
          const predictionsData = await model.classify(inputImage, 1);

          let {className, probability} = predictionsData && predictionsData.length > 0 && predictionsData[0];

          if (className.includes("coyote")) {
            className = "Coyote";
          } else if (className.includes("cougar") ||
            className.includes("mountain") ||
            className.includes("catamount") ||
            className.includes("puma") ||
            className.includes("panther")) {
            className = "Cougar";
          } else if (className.includes("fox")) {
            className = "Fox";
          } else if (className.includes("cat")) {
            className = "Cat";
          } else if (className.includes("dog")) {
            className = "Dog";
          } else {
            className = `Unknown image. Is it a ${className.split(",").map(guess => guess.trim())[0]}?`
          }

          setPrediction({probability: probability, className: className});
        }
      }
    }

    if (img && model) {
      getPrediction();
    }
  }, [model, img]);

  useEffect(() => {
    if (!prediction) {
      setShowPrediction(false);
    } else {
      setTimeout(() => {
        setShowPrediction(true);
      }, 2000);
    }
  }, [prediction]);

  return (
    <div style={{color: "white"}}>
      {accuracyRating && <h1>Lifetime accuracy rating: {accuracyRating}%</h1>}
      <h1>What's in the picture?</h1>
      <PredictionModal image={img}
                       prediction={prediction}
                       setPrediction={setPrediction}
                       setShowPrediction={setShowPrediction}
                       show={showPrediction}
                       setAccuracyRating={setAccuracyRating}/>
      <ImageContainer>
        {img ?
          <img alt="The item to be predicted" src={img} height={300}/> :
          <EmptyImage/>
        }
      </ImageContainer>
      <ImageButton selectImage={selectImage}
                   setShowPrediction={setShowPrediction}
                   setPrediction={setPrediction}/>
      <div>
        {
          prediction &&
          !showPrediction &&
          <Overlay>
            <Spinner/>
          </Overlay>
        }
      </div>
      <Footer>
        <h4>Image recognition software built on tensorflow</h4>
      </Footer>
    </div>
  )
}

export default ImagePredictor;