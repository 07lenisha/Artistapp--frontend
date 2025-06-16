import { configureStore } from '@reduxjs/toolkit';
import EventReducer from "../slices/EventSlice"
import ArtistReducer from '../slices/ArtistSlice';

const Store = configureStore({
  reducer: {
    events: EventReducer,
    artists: ArtistReducer
  },
});

export default Store;
