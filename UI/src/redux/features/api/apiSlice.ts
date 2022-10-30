import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "../../../types/AppTypes";
import * as localforage from "localforage";

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        authenticate: builder.mutation({
            query: (payload) => ({
                url: '/login',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        registerUser: builder.mutation({
            query: (payload) => ({
                url: '/AddUser',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',

                }
            })
        }),
        addNewNote: builder.mutation({
            query: (payload) => ({
                url: '/addNote',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
        }),
        deleteNote: builder.mutation({
            query: (payload) => ({
                url: '/DeleteNote',
                method: 'post',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                }
            }),
        }),
        getNotes: builder.query({
            query: () => ({
                url: 'GetNotesByUser',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
        }),
    }),
})
export const {
    useAuthenticateMutation,
    useAddNewNoteMutation,
    useGetNotesQuery,
    useDeleteNoteMutation,
    useRegisterUserMutation
} = apiSlice
