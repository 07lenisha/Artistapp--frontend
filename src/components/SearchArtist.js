// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventsByArtistId } from "../slices/EventSlice";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix Leaflet marker icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// export default function SearchArtist() {
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const { events, loading } = useSelector((state) => state.events);
//   const [eventsWithCoordinates, setEventsWithCoordinates] = useState([]);
//   const [searched, setSearched] = useState(false); // know if search was clicked

//   // Fetch coordinates
//   const fetchCoordinates = (address) => {
//     return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.length > 0) {
//           return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
//         }
//         return null;
//       });
//   };

//   const handleSearch = () => {
//     if (query.trim()) {
//       dispatch(fetchEventsByArtistId(query));
//       setEventsWithCoordinates([]); // Reset coordinates before new search
//       setSearched(true); // Set searched flag to true when search starts
//     }
//   };

//   useEffect(() => {
//     if (events.length > 0) {
//       const updatedEvents = events.map(async (event) => {
//         const eventCopy = { ...event };
//         if (eventCopy.address) {
//           const coordinates = await fetchCoordinates(eventCopy.address);
//           if (coordinates) {
//             eventCopy.coordinates = coordinates;
//           }
//         }
//         return eventCopy;
//       });

//       Promise.all(updatedEvents).then((updatedEvents) => {
//         setEventsWithCoordinates(updatedEvents);
//       });
//     } else {
//       setEventsWithCoordinates([]); // Clear events if no data is returned
//     }
//   }, [events]);

//   return (
//     <div className="search-artist-container">
//       <h2>Search Event by Artist ID or Name</h2>
//       <input
//         type="text"
//         placeholder="Enter artist ID or name"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch} disabled={loading}>
//         {loading ? "Searching..." : "Search"}
//       </button>

//       {/* loading */}
//       {loading && (
//         <p style={{ marginTop: "20px" }}>Loading...</p>
//       )}

//       {/* when events found */}
//       {!loading && eventsWithCoordinates.length > 0 && (
//         <div className="event-info">
//           {eventsWithCoordinates.map((event) => (
//             <div key={event._id}>
//               <h3>Event Details</h3>
//               <p><strong>Artistname:</strong> {event.ArtistId.name}</p>
//               <p><strong>Event:</strong> {event.name}</p>
//               <p><strong>Venue:</strong> {event.venue}</p>
//               <p><strong>Address:</strong> {event.address}</p>

//               {event.coordinates ? (
//                 <MapContainer
//                   center={event.coordinates}
//                   zoom={13}
//                   style={{ height: "300px", width: "100%", marginTop: "20px" }}
//                 >
//                   <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution="&copy; OpenStreetMap contributors"
//                   />
//                   <Marker position={event.coordinates}>
//                     <Popup>{event.address}</Popup>
//                   </Marker>
//                 </MapContainer>
//               ) : (
//                 <p>No coordinates available for this event</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByArtistId } from "../slices/EventSlice";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function SearchArtist() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  const [eventsWithCoordinates, setEventsWithCoordinates] = useState([]);
  const [searched, setSearched] = useState(false); // know if search was clicked

  // Fetch coordinates
  const fetchCoordinates = (address) => {
    return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
        return null;
      });
  };

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchEventsByArtistId(query));
      setEventsWithCoordinates([]); // Reset coordinates before new search
      setSearched(true); // Set searched flag to true when search starts
    }
  };

  useEffect(() => {
    if (events.length > 0) {
      const updatedEvents = events.map(async (event) => {
        const eventCopy = { ...event };
        if (eventCopy.address) {
          const coordinates = await fetchCoordinates(eventCopy.address);
          if (coordinates) {
            eventCopy.coordinates = coordinates;
          }
        }
        return eventCopy;
      });

      Promise.all(updatedEvents).then((updatedEvents) => {
        setEventsWithCoordinates(updatedEvents);
      });
    } else {
      setEventsWithCoordinates([]); // Clear events if no data is returned
    }
  }, [events]);

  return (
    <div className="search-artist-container">
      <h2>Search Event by Artist ID or Name</h2>
      <input
        type="text"
        placeholder="Enter artist ID or name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {/* loading */}
      {loading && <p style={{ marginTop: "20px" }}>Loading...</p>}

      {/* when events found */}
      {!loading && eventsWithCoordinates.length > 0 && (
        <div className="event-info">
          {eventsWithCoordinates.map((event) => (
            <div key={event._id} className="event-box">
              <h3>Event Details</h3>
              <p><strong>Artistname:</strong> {event.ArtistId?.name}</p>
              <p><strong>Event:</strong> {event.name}</p>
              {event.image && (
                <img
                alt={event.name}
                  src={event.image}
                  
                  className="event-image"
                />
              )}
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Address:</strong> {event.address}</p>

              {event.coordinates ? (
                <MapContainer
                  center={event.coordinates}
                  zoom={13}
                  style={{ height: "300px", width: "100%", marginTop: "20px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={event.coordinates}>
                    <Popup>{event.address}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <p>No coordinates available for this event</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
