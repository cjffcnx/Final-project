import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from 'react-toastify';
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password, role }, { rejectWithValue }) => {
        try {
            //Success case
            const { data } = await API.post('/auth/login', { email, password, role })
            //Store token
            if (data.success) {
                localStorage.setItem('token', data.token)
                toast.success(data.message)
                return data; // Return data for fulfilled case
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)