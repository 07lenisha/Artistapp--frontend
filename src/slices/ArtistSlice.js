import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from "../Config/axios";

export const fetchuserAccount=createAsyncThunk("artists/fetchuserAccount",async(_undefined,{rejectWithValue})=>{
    try{
const response=await axios.get("/profile",{headers:{

  
    Authorization:localStorage.getItem("token")
}})
return response.data
    }catch(err){
      return rejectWithValue({
                
                    message:err.message,
                    errors:err.response.data.errors
                   
        })
    }
})

// Action to fetch all artists
export const fetchArtists = createAsyncThunk('artists/fetchAll', async () => {
  const response = await axios.get('/artist');
   // 🔍 check this in the browser console
  return response.data;
});




const   ArtistSlice = createSlice({
 name:"artists",
    initialState: {
  data: null,           // for logged-in user info
  artistsList: [],      // ✅ store all artists here
  isLoggedIn: false,
  loading: false,
  error: null,
},

 
   reducers:{
        login:(state,action)=>{
            state.data=action.payload
            state.isLoggedIn=true
        },
        logout:(state)=>{
            state.data=null
            state.isLoggedIn=false
        }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
       
              builder.addCase(fetchuserAccount.fulfilled,(state,action)=>{
             state.data=action.payload
             state.isLoggedIn=true
              })
               builder.addCase(fetchuserAccount.rejected,(state,action)=>{
             state.sereverError=action.payload
             state.data=null;
             state.isLoggedIn=false
              })
      
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artistsList = action.payload;// Store the artists data in the state
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
})

  


export const { logout,login } = ArtistSlice.actions;

export default ArtistSlice.reducer;
