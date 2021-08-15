import React from "react";

/* == Custom - Icon */
import { ReactComponent as Storage }    from "../styles/images/icon-status-todolist.svg";
import { ReactComponent as Todo }       from "../styles/images/icon-status-stop.svg";
import { ReactComponent as Processing } from "../styles/images/icon-status-working.svg";
import { ReactComponent as Done }       from "../styles/images/icon-status-done.svg";

// * == ( IconSteps ) -------------------- * //
const IconSteps = ({ type }) => {
  /**
   * props: type(str)
   * type === "STORAGE" || "TODO" || "PROCESSING" || "DONE"
   */
  
  if (type === "STORAGE") {
    return <Storage fill="#767676" width="20" height="20" />
  }

  if (type === "TODO") {
    return <Todo fill="#767676" width="20" height="20" />
  }

  if (type === "PROCESSING") {
    return <Processing fill="#767676" width="20" height="20"/>
  }

  if (type === "DONE") {
    return <Done fill="#767676" width="20" height="20"/>
  }
  return null;
}

export default IconSteps;