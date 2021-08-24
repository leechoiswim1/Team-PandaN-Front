import React, { useEffect, useState } from "react";
/* == Library - style */
import styled 												from "styled-components";
import { Form } 											from "react-bootstrap";
/* == Library - AWS SDK */
import AWS 														from "aws-sdk";
/* == Custom - shared > auth setting */
import { aws_region, aws_poolId } 		from "../../shared/oauthenv";
import { FilePreviewer } 							from "..";
/* == Redux - actions */
import { useSelector, useDispatch }   from "react-redux";
import { fileActions } 								from "../../modules/file";
import { noteKanbanActions } 					from '../../modules/noteKanban';

// * == ( Note - modal - File Uploader ) -------------------- * //
const FileUploader = (props) => {
	const dispatch = useDispatch();

	AWS.config.update({
		region: aws_region,
		credentials: new AWS.CognitoIdentityCredentials({
			IdentityPoolId: aws_poolId,
		}),
	});

	// subscribe 
	// case 1 : 신규 작성 시 필요한 파일 미리보기, 항상 fileList = [] (모달창 열 때 미리보기 리셋됨)
	const fileList = useSelector((state) => state.noteKanban.filePreview);
	// case 2 : 노트 수정 시 기존에 저장했던 파일 리스트 가져오기
	const editingFileList = props.files;
	// const newEditingFileList = editingFileList.concat(fileList)

	const handleUploadFile = (e) => {
		// input 태그를 통해 선택한 파일 객체	
		let file = e.target.files[0];	
		
		// 파일 선택 취소 시
		if (!file) {
			alert("선택한 파일이 없습니다.");
			return;
		}
		// 파일 용량 초과 시
		if (file.size > 5000000) {
			alert("5MB 이하의 파일만 업로드 할 수 있습니다.");
			return;
		}
		// 파일 최대 첨부 개수 초과 시
		if (fileList.length - 1 > 5 ) {
			alert("최대 5개의 파일까지 업로드 할 수 있습니다.");
			return;
		}

		// 원본 파일 이름에서 확장자 추출
		const orgFileName = file.name;
    let orgFileExtension = orgFileName.split(".");
		orgFileExtension = orgFileExtension[orgFileExtension?.length - 1];

    //원본 파일명 중복을 막기 위해 aws에 저장할 무작위 파일명 설정
    function makeid() {
			let randomKey = "";
			let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (let i = 0; i < 10; i++) {
				randomKey += charSet.charAt(Math.floor(Math.random() * charSet.length));
			}
			return randomKey;
    }
    const awsFileName = orgFileName + makeid() + `.${orgFileExtension}`;

		// S3 SDK에 내장된 업로드 함수
		const upload = new AWS.S3.ManagedUpload({
			params: {
				Bucket: "front.blossomwhale.shop.file", 				
				Key: awsFileName,
				Body: file,
				Conditions: [["content-length-range", 100, 5000000]], // 용량 제한 100Byte - 5MB
			},
		})	
		
		const uploadFile = upload.promise()
			
		uploadFile
		.then(alert("파일을 업로드 목록에 추가합니다. 목록에 추가 될 때까지 기다려 주세요."))
		.then(
			function (data) {
				const { Location } = data;
				alert("파일이 업로드 목록에 추가되었습니다.");
				dispatch(noteKanbanActions.setPreview(file.name, awsFileName, Location))
			},
			function (e) {
				return alert("업로드 목록에 추가하는 중 오류가 발생했습니다. :", e.message)
			}
		)	
	}

	return (
		<>
			<Form.Group controlId="formFile">
				<Form.Control className="note-modal-form-width" type="file" onChange = {handleUploadFile} />
  		</Form.Group>
			<div className="note-file-uploader">
				<p>각 항목 당 5MB, 최대 5개의 파일을 업로드 할 수 있습니다.</p>				
				<ul>					
					{ fileList.map((file, index) => {
						return ( 
						<li key={index}>
							<FilePreviewer index={index} file={file} 
								isEditing={ editingFileList ? true : false } />
						</li>)
					})}
				</ul>
			</div>
		</>
	);
}

export default FileUploader;