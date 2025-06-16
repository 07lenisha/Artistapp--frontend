import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../Config/axios';

// Action to create an event
// Create Event Thunk (without Geoapify logic in frontend)
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async ({ formData, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/event', formData, {
        
      });
      resetForm(""); // Clear the form on success
      return response.data.events;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

 export const fetchEventsByArtistId = createAsyncThunk('events/fetchByArtistId', async (artistId) => {
      const response = await axios.get(`/event/${artistId}`);  // API call to fetch events for a specific artist
      return response.data;
    });

// Action to fetch all events
export const fetchEvents = createAsyncThunk('events/fetchAll', async () => {
    const response = await axios.get('/event');
    return response.data;
});

// Initial state
const initialState = {
    events: [],
    loading: false,
    error: null,
    serverErrors: null,
};

// Event slice
const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events.push(action.payload);  // Add new event to events array
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.loading = false;
                state.serverErrors = action.payload;  // Store server-side errors
            })
            .addCase(fetchEventsByArtistId.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchEventsByArtistId.fulfilled, (state, action) => {
  state.loading = false;
  state.artist = action.payload.artist;
  state.events = action.payload.events;
})

          .addCase(fetchEventsByArtistId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

           
           .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Update data with fetched events
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  
    },
});

export default eventSlice.reducer;
