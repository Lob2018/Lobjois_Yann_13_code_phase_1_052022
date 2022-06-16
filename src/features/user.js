import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  // the slice's name
  name: 'user',
  // the initial state
  initialState: {
    data: {},
  },
  // reducers define actions and the reducer
  reducers: {
    // the set action ('user/set')
    set: (state, action) => {
      return {
        ...state,
        data: action.payload,
      }
    },
  },
})

// we export each action individually
export const { set } = actions
// we export the reducer as default export
export default reducer
