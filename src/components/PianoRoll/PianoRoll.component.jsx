// import React, { useEffect, useState } from "react";
//
// const generateGradientTable = (startColor, endColor, steps) => {
//   const gradientTable = [];
//   for (let i = 0; i < steps; i++) {
//     const r = startColor.r + ((endColor.r - startColor.r) * i) / (steps - 1);
//     const g = startColor.g + ((endColor.g - startColor.g) * i) / (steps - 1);
//     const b = startColor.b + ((endColor.b - startColor.b) * i) / (steps - 1);
//     gradientTable.push(
//       `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
//     );
//   }
//   return gradientTable;
// };
//
// const PianoRoll = ({ svgElement, sequence }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//
//   let start;
//   let end = null;
//   let note_height;
//
//   // Background color gradient
//   const backgroundStartColor = { r: 93, g: 181, b: 213 };
//   const backgroundEndColor = { r: 21, g: 65, b: 81 };
//   const backgroundColorMap = generateGradientTable(
//     backgroundStartColor,
//     backgroundEndColor,
//     128,
//   );
//
//   // Note color gradient
//   const noteStartColor = { r: 66, g: 66, b: 61 };
//   const noteEndColor = { r: 28, g: 28, b: 26 };
//   const noteColorMap = generateGradientTable(noteStartColor, noteEndColor, 128);
//
//   const timeToX = (time) => {
//     return time / end;
//   };
//   const drawEmptyPianoRoll = (pitch_min, pitch_max) => {
//     const pitch_span = pitch_max - pitch_min;
//     for (let it = pitch_min; it <= pitch_max + 1; it++) {
//       if ([1, 3, 6, 8, 10].includes(it % 12)) {
//         const rect = document.createElementNS(
//           "http://www.w3.org/2000/svg",
//           "rect",
//         );
//         const y = 1 - (it - pitch_min) / pitch_span;
//         const x = 0;
//         const h = 1 / pitch_span;
//         const w = 1;
//
//         rect.setAttribute("fill", backgroundColorMap[12]);
//         rect.setAttribute("fill-opacity", "0.666");
//         rect.setAttribute("x", `${x}`);
//         rect.setAttribute("y", `${y}`);
//         rect.setAttribute("width", `${w}`);
//         rect.setAttribute("height", `${h}`);
//         svgElement.appendChild(rect);
//       }
//
//       let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
//       const y = 1 - (it - pitch_min) / pitch_span + 1 / pitch_span;
//       line.setAttribute("x1", "0");
//       line.setAttribute("y1", `${y}`);
//       line.setAttribute("x2", "2");
//       line.setAttribute("y2", `${y}`);
//       let line_width;
//
//       // Every octave, line is bolder
//       if (it % 12 === 0) {
//         line_width = 0.003;
//       } else {
//         line_width = 0.001;
//       }
//       line.setAttribute("stroke-width", `${line_width}`);
//       line.setAttribute("stroke", "black");
//       svgElement.appendChild(line);
//     }
//   };
//
//   const drawPianoRoll = (sequence) => {
//     start = sequence[0].start;
//     end = sequence[sequence.length - 1].end - this.start;
//
//     const pitches = sequence.map((note) => {
//       return note.pitch;
//     });
//
//     let pitch_min = Math.min(...pitches);
//     let pitch_max = Math.max(...pitches);
//     let pitch_span = pitch_max - pitch_min;
//
//     if (pitch_span < 24) {
//       const diff = 24 - pitch_span;
//       const low = Math.ceil(diff / 2);
//       const high = Math.floor(diff / 2);
//       pitch_min -= low;
//       pitch_max += high;
//     }
//
//     pitch_min -= 3;
//     pitch_max += 3;
//     pitch_span = pitch_max - pitch_min;
//     note_height = 1 / pitch_span;
//     drawEmptyPianoRoll(pitch_min, pitch_max);
//
//     sequence.forEach((note) => {
//       const note_rectangle = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "rect",
//       );
//
//       const x = timeToX(note.start - this.start);
//       const w = timeToX(note.end - note.start);
//
//       note_rectangle.setAttribute("x", `${x}`);
//       note_rectangle.setAttribute("width", `${w}`);
//
//       const y = 1 - (note.pitch - pitch_min) / pitch_span;
//
//       note_rectangle.setAttribute("y", `${y}`);
//       note_rectangle.setAttribute("height", `${this.note_height}`);
//
//       const color = noteColorMap[note.velocity];
//       note_rectangle.setAttribute("fill", color);
//
//       note_rectangle.classList.add("note-rectangle");
//
//       svgElement.appendChild(note_rectangle);
//     });
//
//     setIsLoaded(true);
//   };
//
//   useEffect(() => {
//     svgElement.setAttribute("viewBox", "0 0 1 1");
//     svgElement.setAttribute("preserveAspectRatio", "none");
//     drawPianoRoll(sequence);
//   }, [
//     svgElement,
//     sequence,
//     note_height,
//     backgroundColorMap,
//     noteColorMap,
//     timeToX,
//     drawPianoRoll,
//   ]);
//
//   return <>{isLoaded && svgElement}</>;
// };
//
// export default PianoRoll;

import React, { Component } from "react";

export function generateGradientTable(startColor, endColor, steps) {
  const gradientTable = [];
  for (let i = 0; i < steps; i++) {
    const r = startColor.r + ((endColor.r - startColor.r) * i) / (steps - 1);
    const g = startColor.g + ((endColor.g - startColor.g) * i) / (steps - 1);
    const b = startColor.b + ((endColor.b - startColor.b) * i) / (steps - 1);
    gradientTable.push(
      `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
    );
  }
  return gradientTable;
}

export default class PianoRoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelecting: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      overlayStyle: {},
      isSelected: false,
    };

    this.svgElementRef = React.createRef();
    this.end = null;

    const backgroundStartColor = { r: 93, g: 181, b: 213 };
    const backgroundEndColor = { r: 21, g: 65, b: 81 };
    this.backgroundColormap = generateGradientTable(
      backgroundStartColor,
      backgroundEndColor,
      128,
    );

    const noteStartColor = { r: 66, g: 66, b: 61 };
    const noteEndColor = { r: 28, g: 28, b: 26 };
    this.noteColormap = generateGradientTable(
      noteStartColor,
      noteEndColor,
      128,
    );
  }

  componentDidMount() {
    this.drawPianoRoll(this.props.sequence);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sequence !== this.props.sequence) {
      this.drawPianoRoll(this.props.sequence);
    }
  }

  timeToX(time) {
    return time / this.end;
  }

  drawPianoRoll(sequence) {
    this.start = sequence[0].start;
    this.end = sequence[sequence.length - 1].end - this.start;

    const pitches = sequence.map((note) => note.pitch);

    let pitch_min = Math.min(...pitches);
    let pitch_max = Math.max(...pitches);
    let pitch_span = pitch_max - pitch_min;

    if (pitch_span < 24) {
      const diff = 24 - pitch_span;
      const low = Math.ceil(diff / 2);
      const high = Math.floor(diff / 2);
      pitch_min -= low;
      pitch_max += high;
    }
    pitch_min -= 3;
    pitch_max += 3;
    pitch_span = pitch_max - pitch_min;
    this.note_height = 1 / pitch_span;

    this.drawEmptyPianoRoll(pitch_min, pitch_max);

    sequence.forEach((note) => {
      const note_rectangle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );

      const x = this.timeToX(note.start - this.start);
      const w = this.timeToX(note.end - note.start);

      note_rectangle.setAttribute("x", `${x}`);
      note_rectangle.setAttribute("width", `${w}`);

      const y = 1 - (note.pitch - pitch_min) / pitch_span;

      note_rectangle.setAttribute("y", `${y}`);
      note_rectangle.setAttribute("height", `${this.note_height}`);

      const color = this.noteColormap[note.velocity];
      note_rectangle.setAttribute("fill", color);

      note_rectangle.classList.add("note-rectangle");

      this.svgElementRef.current.appendChild(note_rectangle);
    });
  }

  drawEmptyPianoRoll(pitch_min, pitch_max) {
    const pitch_span = pitch_max - pitch_min;
    for (let it = pitch_min; it <= pitch_max + 1; it++) {
      if ([1, 3, 6, 8, 10].includes(it % 12)) {
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect",
        );
        const y = 1 - (it - pitch_min) / pitch_span;
        const x = 0;
        const h = 1 / pitch_span;
        const w = 1;

        rect.setAttribute("fill", this.backgroundColormap[12]);
        rect.setAttribute("fill-opacity", "0.666");
        rect.setAttribute("x", `${x}`);
        rect.setAttribute("y", `${y}`);
        rect.setAttribute("width", `${w}`);
        rect.setAttribute("height", `${h}`);
        this.svgElementRef.current.appendChild(rect);
      }

      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const y = 1 - (it - pitch_min) / pitch_span + 1 / pitch_span;
      line.setAttribute("x1", "0");
      line.setAttribute("y1", `${y}`);
      line.setAttribute("x2", "2");
      line.setAttribute("y2", `${y}`);
      let line_width;

      if (it % 12 === 0) {
        line_width = 0.003;
      } else {
        line_width = 0.001;
      }
      line.setAttribute("stroke-width", `${line_width}`);
      line.setAttribute("stroke", "black");
      this.svgElementRef.current.appendChild(line);
    }
  }

  handleMouseUp = () => {
    if (!this.state.isSelecting) {
      return;
    }

    const isOverlayVisible =
      this.state.startX !== this.state.endX ||
      this.state.startY !== this.state.endY;

    this.setState((prevState) => ({
      isSelecting: false,
      isSelected: true,
      overlayStyle: { ...prevState.overlayStyle },
      isOverlayVisible,
    }));
  };

  handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    const { left, top } = this.svgElementRef.current.getBoundingClientRect();
    const startX = clientX - left;
    const startY = clientY - top;

    this.setState((prevState) => ({
      isSelecting: true,
      startX,
      startY,
      endX: startX,
      endY: startY,
      overlayStyle: {
        ...prevState.overlayStyle,
        left: startX + "px",
        top: startY + "px",
        width: "2px",
        height: 0,
      },
      isSelected: false,
    }));
  };

  handleMouseMove = (event) => {
    if (!this.state.isSelecting) {
      return;
    }

    const { clientX } = event;
    const { left } = this.svgElementRef.current.getBoundingClientRect();
    const startX = this.state.startX;
    const endX = clientX - left;
    const overlayStyle = {
      left: startX < endX ? startX + "px" : endX + "px",
      width: Math.abs(endX - startX) - 25 + "px",
      top: 0,
      height: "100%",
      backgroundColor: "yellow",
      opacity: 0.3,
      position: "absolute",
      pointerEvents: "none",
    };

    this.setState({ overlayStyle });
  };

  render() {
    const { isSelecting, overlayStyle, isSelected } = this.state;

    const overlayVisibleStyle = {
      position: "absolute",
      zIndex: 1000,
      backgroundColor: "yellow",
      opacity: 0.5,
      pointerEvents: "none",
      borderLeft: "2px solid black",
      borderRight: "2px solid black",
      ...overlayStyle,
    };

    return (
      <div style={{ position: "relative" }}>
        <svg
          key={
            this.props.sequence[0].start +
            this.props.sequence[this.props.sequence.length - 1].end
          }
          ref={this.svgElementRef}
          viewBox="0 0 1 1"
          width="100%"
          height="150"
          className="piano-roll-svg"
          preserveAspectRatio="none"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        ></svg>
        {isSelecting && <div style={overlayVisibleStyle}></div>}
        {isSelected && <div style={overlayVisibleStyle}></div>}
      </div>
    );
  }
}
