import React, { useEffect, useState } from "react";
/* == Library - style */
import styled 												from "styled-components";
/* == Library - AWS SDK */
import AWS 														from "aws-sdk";
/* == Custom - shared > auth setting */
import { aws_region, aws_poolId } 		from "../../shared/oauthenv";
/* == Redux - actions */
import { useSelector, useDispatch }   from "react-redux";
import { fileActions } 								from "../../modules/file";

// * == ( Notemodal - File Previewer ) -------------------- * //
const FilePreviewer = ({ file, ...rest}) => {
	const dispatch = useDispatch();

	AWS.config.update({
		region: aws_region,
		credentials: new AWS.CognitoIdentityCredentials({
			IdentityPoolId: aws_poolId,
		}),
	});
	
	const handleDeleteFile = (e) => {
		const params = {
			Bucket: "front.blossomwhale.shop.file", 				
			Key: file.awsFileName,
		}

		const s3 = new AWS.S3();

		const result = window.confirm("파일을 정말로 삭제하시겠습니까?");
    if (result) {
      s3.deleteObject(params, (e, data) => {
				// 삭제 중 에러 발생 시
				if (e) {
					alert("파일 삭제 중 오류가 발생했습니다:", e.message, e.stack);
					return;
				};
				alert("파일 삭제에 성공했습니다.");
				dispatch(fileActions.deletePreview(file.awsFileName))
			});	
    } else return;
		
		// const deleteFile = remove.promise()	
		// deleteFile.then(
		// 	function (data) {
		// 		alert("파일 삭제에 성공했습니다.");
		// 		const { Location } = data;
		// 		// dispatch(fileActions.__setFiles(file.name, newFileName, Location))
		// 	},
		// 	function (err) {
		// 		return alert("오류가 발생했습니다: ", err.message)
		// 	}
		// )	

	}


	return (		
		<>
			- {file.fileName}
			<span onClick={handleDeleteFile}>x</span>
		</>
	);
}

export default FilePreviewer;