import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface RegisterState {
  email: string,
  username: string,
  password: string,
}

const initialState: RegisterState = {
  email: "",
  password: "",
  username:"",
}

export const registerSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    authenticate: (state) => {
        console.log("authenticate", state);
    },
    
  },
})

export const { authenticate } = registerSlice.actions
export default registerSlice.reducer
