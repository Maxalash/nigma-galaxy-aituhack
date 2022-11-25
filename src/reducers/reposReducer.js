import { createSlice } from '@reduxjs/toolkit'

const reposReducer = createSlice({
  name: 'repos',
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    setCount(state, action){
      return {...state,count: action.payload}
    }
  }
})

export const { todoAdded, todoToggled, setCount } = reposReducer.actions
export default reposReducer.reducer

