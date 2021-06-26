import React, {useState} from "react";
import styled from "styled-components";

const Prediction = styled.div`
  font-size: 20px;
  margin-bottom: 32px;
`;

const EmptyImage = styled.div`
  background-color: lightGrey;
  height: 320px; 
  width: 320px;
  margin: 0 auto;
`;

const Radio = styled.div`
    padding: 32px;
 
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  border: 0px;
  cursor: pointer;
  margin-top: 24px;
`;

const SubmitButton = styled(Button)`
  background-color: #20bf6b;
  border: 2px solid #20bf6b;
  transition: .5s ease;
  
  &:hover {
    background-color: white;
    transition: .5s ease;
  }
`;

const CloseButton = styled(Button)`
  background-color: FireBrick;
  border: 2px solid FireBrick;
  transition: .5s ease;
  margin-right: 16px;
  &:hover {
    background-color: white;
    transition: .5s ease;
  }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
`;

const Modal = styled.div`
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