import React from "react";
import Template from "../components/Template";
import { Button } from "../elements";

const Home = ({ history }) => {
  return (
    <React.Fragment>
      <Template />
      <div style={{ fontSize: "2.0rem" }}>Home</div>
      <Button> test </Button>
    </React.Fragment>
  );
};

export default Home;
