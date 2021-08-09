import Router from "./components/Router";
import { React, useEffect } from "react";
import "./styles/scss/pandan.scss";
import { useDispatch } from "react-redux";
import { actionCreators as projectActions } from "./modules/project";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectActions.__setProject());
  }, []);
  return (
    <>
      <Router />
    </>
  );
};

export default App;
