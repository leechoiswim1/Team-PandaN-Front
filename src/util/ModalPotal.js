import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("projectModal");
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
