import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  // the slice's name
  name: 'loading',
  // the initial state
  initialState: false,
  // reducers define actions and the reducer
  reducers: {
    // the set action ('loading/set')
    set: (state, action) => {
      return action.payload
    },
  },
})

// we export each action individually
export const { set } = actions
// we export the reducer as default export
export default reducer
