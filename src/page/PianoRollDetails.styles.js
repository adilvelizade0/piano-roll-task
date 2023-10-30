import styled from "styled-components";

const PianoRollDetailsContainer = styled.div`
  .main-piano-roll-card {
    h6 {
      font-size: 1.5rem;
      font-weight: bold;
      color: #000;
      text-decoration: none;
    }
    svg {
      height: 400px;
    }
  }

  #pianoRollCard-${({ id }) => id} {
    border-radius: 0;
    &:hover {
      scale: none !important;
      box-shadow: none !important;
      cursor: pointer;
    }
  }
`;

export default PianoRollDetailsContainer;
