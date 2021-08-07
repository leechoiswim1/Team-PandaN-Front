import React from "react";
import { Modals, ProjectModal } from "..";

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
      <Modals
        buttonTitle="프로젝트 초대코드 등록"
        Title="초대코드를 등록해주세요! "
        Content={<input placeholder="어쩌고 저쩌고" />}
        Summit="등록"
      />
    </div>
  );
};

export default EmptyProject;
