import React from "react";
/* == Library */
import { NavLink } from "react-router-dom";

const InnerHeader = ({ history, match, projectId, ...rest }) => {
  return (
    <div className="innerheader"> 
      <nav>
        <ul>
          <li>
            <NavLink to={`/projects/${projectId}/issue`} exact activeClassName="innerheader-menu-active">
              전체 문서
            </NavLink>
          </li>
          <li>
            <NavLink to={`/projects/${projectId}/kanban`} exact activeClassName="innerheader-menu-active">
              칸반
            </NavLink>
          </li>        
          <li>
            <NavLink to={`/projects/${projectId}/mynote`} exact activeClassName="innerheader-menu-active">
              내가 작성한 문서
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default InnerHeader;
