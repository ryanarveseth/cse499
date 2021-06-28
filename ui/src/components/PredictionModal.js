import React, {useState} from "react";
import {CloseButton, EmptyImage, Modal, Overlay, Prediction, Radio, SubmitButton} from "../styles";

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
                <h4>
                  {`(${(prediction.probability * 100).toFixed(2)}% confidence level)`}
                </h4>
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
              <h3>Was my guess correct?</h3>
              <Radio onChange={(e) => setGuessedCorrect(e.target.value)}>
                <label><input type="radio" value={1} name="correct"/> Yes</label>
                <label><input type="radio" value={0} name="correct"/> No</label>
              </Radio>
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