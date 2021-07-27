import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { exampleApi } from '../shared/api'; // 필요한 api 함수 불러 올 것

// action
const GET_SOMETHING = 'example/GET_SOMETHING';

// action creator
export const getSomething = createAction(GET_SOMETHING, (data) => ({data}));

// Thunk function
export const __getSomething = () =>
	async (dispatch, getState, { history }) => {
		try {
			const { data } = await exampleApi.getSomething();
			console.log(data)
		} catch (e) {
			console.log(e)
		}
	};

// reducer
const example = handleActions(
	{
		[GET_SOMETHING]: (state, action) => {
			const result= action.payload.data;
			console.log(result);
			return {
				...state,
				response: state.example.concat(action.payload.data), // 리덕스액션을 사용하면 action 내에 있는 데이터를 무조건 'payload'로 불러옵니다.
			}
		}		
	},
	{ example: [] }, // initial state,  추후 작성시 삭제하고 intial state 넣어줄 것
);

export const exampleActions = {
	__getSomething,	
};
// import { exampleActions } from '경로'
// exampleActions.__getSomething();
export default example;