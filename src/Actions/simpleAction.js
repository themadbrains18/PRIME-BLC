export const simpleAction = (data) => async (dispatch) => {
  dispatch({
   type: 'SIMPLE_ACTION',
   payload: data
  })
}
