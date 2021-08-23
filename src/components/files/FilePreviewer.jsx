import React, { useEffect, useState } from "react";
/* == Library - style */
import styled 												from "styled-components";
/* == Library - AWS SDK */
import AWS 														from "aws-sdk";
/* == Custom - shared > auth setting */
import { aws_region, aws_poolId } 		from "../../shared/oauthenv";
/* == Custom - Component & Element & Icon */
import { ReactComponent as IconClose }    from "../../styles/images/ico-close.svg";
import { ReactComponent as IconLink }     from "../../styles/images/ico-link.svg";
/* == Redux - actions */
import { useSelector, useDispatch }   from "react-redux";
import { fileActions } 								from "../../modules/file";
import { noteKanbanActions } 					from '../../modules/noteKanban';

// * == ( Note - modal - File Previewer ) -------------------- * //
const FilePreviewer = ({ file, isEditing, ...rest}) => {
	const dispatch = useDispatch();

	AWS.config.update({
		region: aws_region,
		credentials: new AWS.CognitoIdentityCredentials({
			IdentityPoolId: aws_poolId,
		}),
	});
	
	const handleDeleteFile = (e) => {
		// case 1 : 노트 생성 시, 사용자가 파일 서버에 올린 파일을 미리보기 목록에서 삭제하려 할 때
		// 서버 DB로 파일 정보를 아직 보내지 않은 상태이므로 삭제 원할 때 파일 서버의 파일은 지울 것
		if (!isEditing) {
			const params = {
				Bucket: "front.blossomwhale.shop.file", 				
				Key: file.awsFileName,
			}
			const s3 = new AWS.S3();

			const result = window.confirm("파일을 업로드 목록에서 정말로 삭제하시겠습니까?");
			if (result) {
				s3.deleteObject(params, (e, data) => {
					// 삭제 중 에러 발생 시
					if (e) {
						alert("파일 삭제 중 오류가 발생했습니다:", e.message, e.stack);
						return;
					};
					alert("업로드 목록에서 파일을 삭제했습니다.");
					dispatch(noteKanbanActions.deletePreview(file.fileUrl))
				});	
			} else return;		
		} 
		// case 2 : 노트 수정 시, 사용자가 기존에 업로드 한 파일 삭제하려 할 때
		// 서버 DB 파일 정보는 삭제, 파일 서버의 파일은 유지하여야 함
		else {
			const result = window.confirm("업로드 된 파일을 정말로 삭제하시겠습니까? 기존의 파일 및 파일 정보가 삭제됩니다.");
    	if (result) {
				dispatch(noteKanbanActions.deletePreview(file.fileUrl))
    	} else return;
		}		
	}

	// aws 버킷 내 데이터 유지 위해 기존 함수 주석처리 
	// -----------------------------------------
	// const handleDeleteFile = (e) => {
	// 	const params = {
	// 		Bucket: "front.blossomwhale.shop.file", 				
	// 		Key: file.awsFileName,
	// 	}

	// 	const s3 = new AWS.S3();

	// 	const result = window.confirm("파일을 정말로 삭제하시겠습니까?");
  //   if (result) {
  //     s3.deleteObject(params, (e, data) => {
	// 			// 삭제 중 에러 발생 시
	// 			if (e) {
	// 				alert("파일 삭제 중 오류가 발생했습니다:", e.message, e.stack);
	// 				return;
	// 			};
	// 			alert("파일 삭제에 성공했습니다.");
	// 			dispatch(fileActions.deletePreview(file.awsFileName))
	// 		});	
  //   } else return;
	// }

	return (		
		<>
			<span className="note-file-remover" onClick={handleDeleteFile}>
				<IconLink width="24" height="24" fill="#767676" style={{marginRight: "4px"}}/>
				{rest.index + 1}. {file.fileName}
				<IconClose width="12" height="12" fill="#767676" style={{marginLeft: "4px"}}/>
			</span>
		</>
	);
}

export default FilePreviewer;