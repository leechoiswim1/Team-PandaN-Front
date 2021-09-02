import React, { useState } from "react";

/* == Library */

import { Button, Collapse } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/
import { AlignRight } from "react-feather";

/* == Custom - Component */
import Header from "./Header";
import Sidebar from "./Sidebar";

// * == (Template) -------------------- * //

const Template = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="col-wrap" id="wrap">
      {/* == left */}
      <Collapse in={open}>
        <div className="col-left" id="sidebar">
          <Sidebar match={props.match} />
        </div>
      </Collapse>
      {/* == right */}
      <div className="col-right">
        <Button
          id="btn-hamburger"
          className="btn-hamburger"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <AlignRight />
        </Button>
        <Header />
        {props.children}
      </div>
    </div>
  );
};

export default Template;
