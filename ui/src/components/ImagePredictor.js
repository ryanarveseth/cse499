import React, {useEffect, useState} from "react";
import ImageButton from "./ImageButton";
import PredictionModal from "./PredictionModal";
import {EmptyImage, Footer, ImageContainer, Overlay, Spinner} from "../styles";

const mobilenet = require('@tensorflow-models/mobilenet');

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

    const isInArray = (str, array) => {
      for (let dog of array) if (str.includes(dog)) return true;
      return false;
    }


    const getPrediction = async () => {
      if (model !== undefined && img !== undefined) {
        const inputImage = document.createElement('img');
        inputImage.src = img;

        const getPredictionClassName = (className, dogBreeds) => {
          if (className.toLowerCase().includes("coyote")) {
            return "Coyote";
          } else if (className.toLowerCase().includes("cougar") ||
            className.includes("mountain") ||
            className.includes("catamount") ||
            className.includes("puma") ||
            className.includes("panther")) {
            return "Cougar";
          } else if (className.includes("fox")) {
            return "Fox";
          } else if (className.includes("cat")) {
            return "Cat";
          } else if (isInArray(className, dogBreeds) || className.includes("dog")) {
            return "Dog";
          } else {
            const guess = className.split(",").map(guess => guess.trim())[0];
            const startsWithVowel = ["a", "e", "i", "o", "u"]
              .some(letter => letter === guess.substring(0,1).toLowerCase()) ? "n" : "";

            return `Unknown image. Is it a${startsWithVowel} ${guess}?`
          }
        }

        inputImage.onload = async () => {
          const predictionsData = await model.classify(inputImage, 1);

          const dogBreeds = await (await fetch("/api/get-dog-breeds")).json();

          let {className, probability} = predictionsData && predictionsData.length > 0 && predictionsData[0];
          className = getPredictionClassName(className.toLowerCase(), dogBreeds);

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