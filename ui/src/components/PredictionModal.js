import React, {useState} from "react";
import {
  ButtonToggleLeft,
  ButtonToggleRight,
  CloseButton,
  EmptyImage,
  Modal,
  Overlay,
  Prediction,
  SubmitButton
} from "../styles";

const PredictionModal = ({show, prediction, image, setPrediction, setShowPrediction, setAccuracyRating}) => {
  const [guessedCorrect, setGuessedCorrect] = useState(1);

  const closeModal = () => {
    setShowPrediction(false);
    setPrediction();
  };

  const saveAccuracy = () => {
    fetch("api/add-to-accuracy",
      {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({accurate: guessedCorrect})
      })
      .then(res => {
        res.json().then(rating => {
          setAccuracyRating(rating.percentage);
          setShowPrediction(false);
          setPrediction();
        });
      })
  }

  return show ?
    <Overlay>
      <Modal>
        <div>
          {
            prediction ?
              <Prediction>
                <h2>
                  {prediction.className[0].toUpperCase() + prediction.className.slice(1)}
                </h2>
                <p>
                  {`(${(prediction.probability * 100).toFixed(2)}% confidence level)`}
                </p>
                <h4>Was my guess correct?</h4>
                <div>
                  <ButtonToggleLeft style={{backgroundColor: !!guessedCorrect ? "#20bf6b" : ""}} onClick={() => setGuessedCorrect(1)}>
                    Yes
                  </ButtonToggleLeft>
                  <ButtonToggleRight style={{backgroundColor: !guessedCorrect ? "FireBrick" : ""}} onClick={() => setGuessedCorrect(0)}>
                    No
                  </ButtonToggleRight>
                </div>
              </Prediction> :
              <div style={{display: "inline-block", height: "52px", marginBottom: "32px"}}/>
          }
        </div>
        <div>
          {image ?
            <img alt="The item to be predicted" src={image} height={300}/> :
            <EmptyImage/>
          }
        </div>
        <div>
          {
            prediction && show &&
            <>
              <div style={{display: "flex", float: "right"}}>
                <CloseButton onClick={closeModal}>Close</CloseButton>
                <SubmitButton onClick={saveAccuracy}>Save and Close</SubmitButton>
              </div>
            </>
          }
        </div>
      </Modal>
    </Overlay> :
    <></>;
}


export default PredictionModal;