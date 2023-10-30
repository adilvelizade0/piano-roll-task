import React from "react";
import { useParams, useLocation } from "react-router-dom";
import PianoRollCard from "../components/PianoRollCard/PianoRollCard.component.jsx";
import PianoRollDetailsContainer from "./PianoRollDetails.styles.js";

const PianoRollDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();

  return (
    <PianoRollDetailsContainer id={id} className="container py-5">
      <div className="row">
        <div className="col-12 col-md-7 col-lg-8">
          <div className="main-piano-roll-card">
            <PianoRollCard sequence={state.sequence} rollId={id} />
          </div>
        </div>
        <div className="col-12 col-md-5 col-lg-4">
          <div className="row flex-column">
            {state.data.map((item, index) => {
              if (index !== +id) {
                console.log(index);
                return (
                  <div className="col-12 mb-3" key={index}>
                    <PianoRollCard sequence={item} rollId={index} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </PianoRollDetailsContainer>
  );
};

export default PianoRollDetails;
