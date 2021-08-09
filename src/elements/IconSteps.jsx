import React, { useEffect, useState } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { t }  from "../util/remConverter";

/* == Custom - Icon */
import { ReactComponent as Storage } from "../styles/images/icon-status-todolist.svg";
import { ReactComponent as Todo } from "../styles/images/icon-status-stop.svg";
import { ReactComponent as Processing } from "../styles/images/icon-status-working.svg";
import { ReactComponent as Done } from "../styles/images/icon-status-done.svg";

const IconSteps = ({ type }) => {
  if (type === "STORAGE") {
    return (
      <Storage fill="#767676" width="20" height="20" />
    )
  }

  if (type === "TODO") {
    return (
      <Todo fill="#767676" width="20" height="20" />
    )
  }

  if (type === "PROCESSING") {
    return (
      <Processing fill="#767676" width="20" height="20"/>
    )
  }

  if (type === "DONE") {
    return (
      <Done fill="#767676" width="20" height="20"/>
    )
  }
}

export default IconSteps;