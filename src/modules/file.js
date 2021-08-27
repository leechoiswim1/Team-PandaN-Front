/**
 * --------------------------------------------------------------------------
 * Redux Module: file.js
  * 기능 (파일 aws s3 업로드 및 삭제)
 * --------------------------------------------------------------------------
 */

/**
 * --------------------------------------------------------------------------
 * import
    * [Library] redux-actions
    * [Custom] api: axios instance 및 api 요청 함수
 * --------------------------------------------------------------------------
 */

import { createAction, handleActions }  from "redux-actions";
import { fileApi }                      from "../shared/api";
 
/**
 * --------------------------------------------------------------------------
 * initial state
 * --------------------------------------------------------------------------
 */
 
const initialState = {
  files: [],
};
 
/**
 * --------------------------------------------------------------------------
 * action
 * --------------------------------------------------------------------------
 */

/* file */
// const ADD_FILES       = "file/ADD_FILES";
// const EDIT_FILES      = "file/EDIT_FILES";
// const DELETE_FILE     = "file/DELETE_FILE";
/* file preview */
const SET_PREVIEW     = "file/SET_PREVIEW";
const RESET_PREVIEW   = "file/RESET_PREVIEW";
const DELETE_PREVIEW  = "file/DELETE_PREVIEW";
 
/**
 * --------------------------------------------------------------------------
 * action creator
 * --------------------------------------------------------------------------
 */

/* file */ 
// const addFiles      = createAction(ADD_FILES , () => ({}));
// const editFiles     = createAction(EDIT_FILES, () => ({}));
// const deleteFile    = createAction(DELETE_FILE, () => ({}));
/* file preview */
const setPreview    = createAction(SET_PREVIEW, ( fileName, awsFileName, fileUrl ) => ({ fileName, awsFileName, fileUrl }));
const resetPreview  = createAction(RESET_PREVIEW, () => ({}));
const deletePreview = createAction(DELETE_PREVIEW, ( awsFileName ) => ({ awsFileName }));
  
/**
 * --------------------------------------------------------------------------
 * middleware thunk function
 * --------------------------------------------------------------------------
 */
 
// const __addFiles =
//   () =>
//   async (dispatch, getState, { history }) => {
//     try {
//       const fileList = getState().file.files;
//       if ( fileList === [] || fileList.length - 1 > 5) return;
//       // awsFileName 제거
//       fileList.map(file => delete file.awsFileName);
//       const newFiles = {
//         files: fileList
//       }
//       console.log("request body", newFiles) 
//       // const { data } = await fileApi.addFiles(newFiles);
      
//     } catch (e) {
//       console.log(e);
//     }
//   };
 
// const __editFiles =
//   (noteId) =>
//   async (dispatch, getState, { history }) => {
//     try {
//       // const oldFileList = getState().note.detail.files;
//       // const newFileList = getState().file.files;
//       // if ( newFileList === [] || newFileList.length - 1 > 5) return;
//       // // awsFileName 제거
//       // newFileList.map(file => delete file.awsFileName);

//       // const _newFileList = newFileList.filter(newFile => !oldFileList.includes(newFile));
//       // const { data } = await fileApi.editFiles(noteId, _newFileList);
//     } catch (e) {
//       console.log(e);
//     }
//   };

// const __deleteFile =
//   () =>
//   async (dispatch, getState, { history }) => {
//     try {
//       const { data } = await fileApi.deleteFile();
//     } catch (e) {
//       console.log(e);
//     }
//   };

/**
 * --------------------------------------------------------------------------
 * reducer
 * --------------------------------------------------------------------------
 */
 
const file = handleActions(
  {
    // [ADD_FILES]: (state, action) => {
    //   return {
    //     ...state,
    //   };
    // },
    // [EDIT_FILES]: (state, action) => {
    //   return {
    //     ...state,
    //   };
    // },
    // [DELETE_FILE]: (state, action) => {
    //   return {
    //     ...state,
    //   };  
    // },
    [SET_PREVIEW]: (state, action) => {
      return {
        ...state,
        files: [
          ...state.files, 
          {
            fileName: action.payload.fileName,
            awsFileName: action.payload.awsFileName,
            fileUrl: action.payload.fileUrl,          
          }
        ]
      };  
    },
    [RESET_PREVIEW]: (state, action) => {
      return {
        ...state,
        files: [],
      };  
    },
    [DELETE_PREVIEW]: (state, action) => {
      return {
        ...state,
        files: state.files.filter((file) => file.awsFileName !== action.payload.awsFileName),
      };  
    },
  },
  initialState,
);
 
/**
 * --------------------------------------------------------------------------
 * export actions
 * --------------------------------------------------------------------------
 */
 
export const fileActions = {
  // __addFiles,
  // __editFiles,
  // __deleteFile,
  setPreview,
  resetPreview,
  deletePreview,
};

export default file;
 