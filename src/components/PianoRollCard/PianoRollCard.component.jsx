import React from "react";
import PianoRoll from "../PianoRoll/PianoRoll.component.jsx";
import PianoRollCardWrapper from "./PianoRollCard.styles.js";
import { useNavigate } from "react-router-dom";

const PianoRollCard = ({ sequence, rollId, data }) => {
  const svgElement = React.useRef(null);
  const navigate = useNavigate();

  return (
    <PianoRollCardWrapper
      id={`pianoRollCard-${rollId}`}
      className=" p-3 rounded-1 mb-2"
    >
      <PianoRoll svgElement={svgElement} sequence={sequence} />
      <h6
        onClick={() => {
          navigate(`/piano-roll/${rollId}`, { state: { sequence, data } });
        }}
        className="mt-3"
      >
        This is a piano roll number {rollId}
      </h6>
    </PianoRollCardWrapper>
  );
};

export default PianoRollCard;
