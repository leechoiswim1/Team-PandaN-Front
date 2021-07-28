import React from 'react';
import ProjectModal from './ProjectModal';
import Modals from './Modals';
const Sidebar = ({ history }) => {

	return (
		<React.Fragment>
			<div style={{fontSize: '2.0rem'}}>Sidebar</div>
			<ProjectModal/>
			<Modals buttonTitle="프로젝트 초대코드 등록" Title="초대코드를 등록해주세요! " Content=
		{<input placeholder="어쩌고 저쩌고"/>} Summit="등록" />
			<Modals buttonTitle="버튼제목" Title="타이틀" Content="
		컨텐츠" Close="
		Close" Summit="등록" />
			<Modals buttonTitle="버튼제목" Title="타이틀" Content="
		컨텐츠"Close="
		Close" Summit="등록" />
			<p></p>
		</React.Fragment>
	)
};

export default Sidebar;