import styled from "styled-components";

const PianoRollCardWrapper = styled.div`
  border: 1px solid #ccc;
  background: #fff;
  &:hover {
    scale: 1.1;
    transition: 0.3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  h6 {
    color: blue;
    text-decoration: underline;
  }

  svg {
    border: 2px solid #000;
  }
`;

export default PianoRollCardWrapper;
