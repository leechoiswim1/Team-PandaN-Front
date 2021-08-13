import { React, useState } from "react";

import { Modal, Button } from "react-bootstrap";

import styled from "styled-components";
import { t } from "../../util/remConverter";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

import { ReactComponent as IconMemberAdd } from "../../styles/images/ico-member-add.svg";
import { EmptyProject } from "..";

const ProjectJoin = (props) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [InviteCode, setInviteCode] = useState("");

  const inviteCode = { inviteCode: InviteCode };
  const JoinProject = () => {
    if (InviteCode === "") {
      window.alert("초대 코드를 입력해주세요!");
      return;
    }
    dispatch(projectActions.__joinProject(inviteCode));
    window.alert("초대가 완료됐습니다!");
    setShow(false);
    history.push("/");
  };

  const changeInviteCode = (e) => {
    setInviteCode(e.target.value);
  };
  return (
    <>
      {props.sidebar === "sidebar" ? (
        <Button variant="primary" size="lg" className="d-block" onClick={handleShow} style={{ width: "100%" }}>
          프로젝트 초대코드 등록
        </Button>
      ) : (
        <EmptyProjectBtn onClick={handleShow}>
          <EmptyProjectText>
            초대코드
            <br />
            등록
            <br />
            📧
          </EmptyProjectText>
        </EmptyProjectBtn>
      )}

      <div>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <div style={{ display: "flex", height: "25px" }}>
              <IconMemberAdd cursor="pointer" width="25px" height="25px" fill="#000000" className="menu-icon" position="absolute" />
              <Modal.Title style={{ fontWeight: "700", color: "#000000", fontSize: "15px" }}>프로젝트 판단권 등록</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body width="100%">
            <Input style={{}} placeholder="초대코드를 입력해주세요!" onChange={changeInviteCode} />
          </Modal.Body>
          <Modal.Footer>
            <JoinBtn variant="primary" onClick={JoinProject}>
              판단권등록
            </JoinBtn>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

const EmptyProjectBtn = styled.div`
  background: #e1ede4;
  width: 400px;
  height: 400px;
  display: block;
  cursor: pointer;
  border-radius: 50px;
  margin: auto;
  padding: auto;
`;

const EmptyProjectText = styled.p`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin: auto;
  padding: auto;
`;
const Input = styled.input(
  ...t`
  margin: 20px 50px; 
  width: 80%;
  border-radius: 5px;
  border:1px solid #EDEDED;
  height:48px;
  color:#9A9A9A; 
  font-size: 15px; 
  `,
);

const JoinBtn = styled.button(
  ...t`
  margin: auto;
  padding: 10px 0;
  color: #767676;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  `,
);

export default ProjectJoin;
