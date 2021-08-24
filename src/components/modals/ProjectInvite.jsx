import { React, useState, useEffect } from "react";
import ModalPortal from "../../util/ModalPotal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { t } from "../../util/remConverter";
import "./dropbox.css";

import { useDispatch, useSelector } from "react-redux";

import { actionCreators as projectActions } from "../../modules/project";
import { ReactComponent as IconMemberAdd } from "../../styles/images/icon_AddOneMember.svg";
import { ReactComponent as IconCopyCode } from "../../styles/images/icon-content-copy.svg";
import { ReactComponent as CloseModal } from "../../styles/images/Icon_ModalClose.svg";

const ProjectInvite = (props) => {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const projectId = props.projectId;

  const inviteCode = useSelector((state) => state.project.inviteCodeList.inviteCode);

  useEffect(() => {
    dispatch(projectActions.__inviteProject(projectId));
  }, [dispatch, projectId]);

  return (
    <>
      <div class="dropdown" onClick={() => setModalState(true)}>
        <button class="dropbtn">
          <IconMemberAdd class="dropbtnSvg" fill="#767676" style={{ marginRight: "5px", width: "24", height: "24" }} />
          <p>멤버 초대</p>
        </button>
      </div>

      <ModalPortal>
        {modalState ? (
          <Background>
            <Overlay onClick={() => setModalState(false)} />
            <Window>
              <ModalHead>
                <ModalHeadInner>
                  <IconMemberAdd style={{ marginTop: "3px" }} fill="#000000" className="menu-icon" />
                  <ModalTitle>같이 PandaN할 멤버 초대</ModalTitle>
                </ModalHeadInner>
                <CloseModal style={{ cursor: "pointer", width: "15px", marginBottom: "4px" }} onClick={() => setModalState(false)} />
              </ModalHead>
              <ModalBody>
                <ModalBodyInner>
                  <P>초대 링크</P>
                  <InviteCodeInput>
                    <InviteCodeText> {inviteCode}</InviteCodeText>
                    <CopyToClipboard
                      text={inviteCode}
                      onCopy={() => {
                        alert("복사가완료됐습니다");
                      }}
                    >
                      <CodeButton>
                        <IconCopyCode cursor="pointer" width="20" height="20" fill="#9A9A9A" className="menu-icon" />
                      </CodeButton>
                    </CopyToClipboard>
                  </InviteCodeInput>
                  <SubText>링크를 복사해서 멤버에게 전달해주세요 </SubText>{" "}
                  <SubText>링크를 통해 가입한 사용자는 자동으로 프로젝트에 참여하게 됩니다.</SubText>
                </ModalBodyInner>
              </ModalBody>
              <CopyToClipboard
                text={inviteCode}
                onCopy={() => {
                  alert("복사가완료됐습니다");
                }}
              >
                <ModalFooter onClick={() => setModalState(false)}> 멤버 초대하기</ModalFooter>
              </CopyToClipboard>
            </Window>
          </Background>
        ) : (
          ""
        )}
      </ModalPortal>
    </>
  );
};

const Background = styled.div`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  z-index: 1000;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Window = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 430px;
  background: #ffffff;
  border-radius: 20px;

  @media (max-width: 400px) {
    max-width: 350px;
    max-height: 400px;
  }
`;

const ModalHead = styled.div`
  width: 85%;
  height: 20%;
  display: flex;
  flex-shrink: 0;
  align-items: flex-end;
  justify-content: space-between;
  margin: auto;
  @media (max-width: 400px) {
    justify-content: center;
  }
`;
const ModalHeadInner = styled.div`
  display: flex;
  line-height: 30px;
`;

const ModalTitle = styled.p`
  font-weight: 700;
  color: #000000;
  font-size: 22px;
  line-height: 30px;
  margin: 0 0 0 10px;
  @media (max-width: 400px) {
    font-size: 20px;
    margin: 0 10px 0 10px;
  }
`;

const ModalBody = styled.div`
  display: flex;
  height: 60%;
  width: 100%;
  margin: auto;
`;

const ModalBodyInner = styled.div`
  position: relative;
  width: 80%;
  box-sizing: border-box;
  margin: auto;
  padding-bottom: 10px;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #387e4b;
  @media (max-width: 400px) {
    font-size: 18px;
  }
`;
const InviteCodeInput = styled.div`
  width: 100%;
  height: 48px;
  background: #fafbfc;
  border-radius: 8px;
  border: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
  margin: 20px auto 8px auto;
`;

const InviteCodeText = styled.p`
  margin: auto auto auto 10px;
  font-size: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const CodeButton = styled.button`
  width: 96px;
  height: 48px;
  background: #e1ede4;
  @media (max-width: 400px) {
    width: 48px;
  }
`;
const SubText = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: #9a9a9a;
  margin-left: 10px;
`;

const ModalFooter = styled.div`
  box-sizing: border-box;
  height: 20%;
  display: flex;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: auto;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  align-items: center;
  background: #387e4b;
  color: #ffffff;
  &:hover {
    background: #e1ede4;
    color: #767676;
  }
`;

export default ProjectInvite;
