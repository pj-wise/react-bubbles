import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  console.log(props.history);

  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => {
        console.log("ERROR WITH GET_COLOR", err);
      });
  }, []);

  return (
    <>
      <ColorList {...props} colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
