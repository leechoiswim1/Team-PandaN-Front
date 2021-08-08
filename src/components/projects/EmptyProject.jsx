import React from "react";

import { ProjectModal } from "..";

import ProjectInvite from "../modals/ProjectInvite";

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
      <ProjectInvite />
    </div>
  );
};

export default EmptyProject;
