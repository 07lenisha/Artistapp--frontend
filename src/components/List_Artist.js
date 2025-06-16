import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtists } from '../slices/ArtistSlice';

const List_Artist = () => {
  const dispatch = useDispatch();
  const { artistsList } = useSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div className="list-artist-container">
      <h2 className="list-artist-title">List of Artists</h2>
      <ul className="artist-list">
        {Array.isArray(artistsList) && artistsList.length > 0 ? (
          artistsList.map((artist) => (
            <li key={artist._id} className="artist-box">
              <h3 className="artist-name">Artist name-{artist.name}</h3>
              <p className="artist-email">Email-{artist.email}</p>
              <p className="artist-bio">Bio-{artist.bio}</p>
            </li>
          ))
        ) : (
          <p className="loading-message">Loading or no artists found...</p>
        )}
      </ul>
    </div>
  );
};

export default List_Artist;
