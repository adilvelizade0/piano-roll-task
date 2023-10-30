import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import PianoRollCard from "./components/PianoRollCard/PianoRollCard.component.jsx";
import { Audio } from "react-loader-spinner";
import Navbar from "./components/Navbar/Navbar.component.jsx";

function App() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const loadPianoRollData = async () => {
    try {
      const response = await fetch("https://pianoroll.ai/random_notes");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    loadPianoRollData().then((data) => {
      let arr = [];
      for (let it = 0; it < 20; it++) {
        const start = it * 60;
        const end = start + 60;
        const partData = data.slice(start, end);

        arr.push(partData);
      }

      setData(arr);
    });
  }, []);

  return (
    <>
      <div className="container">
        {data ? (
          <div id="pianoRollContainer" className="py-5">
            <div className="row">
              {data.map((item, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <PianoRollCard data={data} rollId={index} sequence={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div id="loading">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
