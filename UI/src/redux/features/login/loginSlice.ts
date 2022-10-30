import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../../../types/AppTypes";



export interface LoginState {
  email: string,
  password: string,
}

const initialState: LoginState = {
  email: "",
  password: "",
}

export const authenticateUser = createAsyncThunk('login/authenticateUser', async (loginData: LoginState) => {
    const response = await fetch(BASE_URL+"login", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    return response.json()
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    authenticate: (state,action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        // Add user to the state array
        console.log(action.payload)
      })
  }
})

export const { authenticate } = loginSlice.actions
export default loginSlice.reducer
