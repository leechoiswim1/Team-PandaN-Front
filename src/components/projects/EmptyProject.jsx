import React from "react";

import { ProjectModal } from "..";

import ProjectJoin from "../modals/ProjectJoin";

const EmptyProject = () => {
  return (
    <div>
      <h1>앗 프로젝트가 없어요! </h1>
      <img
        alt="img"
        src="https://png.pngtree.com/png-vector/20191219/ourlarge/pngtree-crying-panda-illustration-vector-on-white-background-png-image_2082001.jpg"
      ></img>
      <br />
      <ProjectModal />
      <ProjectJoin />
    </div>
  );
};

export default EmptyProject;
