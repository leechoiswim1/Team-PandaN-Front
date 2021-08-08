import React, { useEffect, useState } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { t }  from "../util/remConverter";

/* == Custom - Icon */
import { ReactComponent as Storage } from "../styles/images/ico-kanban-step-todolist.svg";
import { ReactComponent as Todo } from "../styles/images/ico-kanban-step-stop.svg";
import { ReactComponent as Processing } from "../styles/images/ico-kanban-step-working.svg";
import { ReactComponent as Done } from "../styles/images/ico-kanban-step-done.svg";

const IconSteps = ({ type }) => {
  if (type === "STORAGE") {
    return (
      <Storage fill="#767676" style={{marginTop: "-4px"}}/>
    )
  }

  if (type === "TODO") {
    return (
      <Todo fill="#767676"style={{marginTop: "-4px"}}/>
    )
  }

  if (type === "PROCESSING") {
    return (
      <Processing fill="#767676" style={{marginTop: "-4px"}}/>
    )
  }

  if (type === "DONE") {
    return (
      <Done fill="#767676" style={{marginTop: "-4px"}}/>
    )
  }
}

export default IconSteps;