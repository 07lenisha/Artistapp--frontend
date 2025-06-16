// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEvents } from "../slices/EventSlice";
// import { fetchArtists } from "../slices/ArtistSlice";
// import EventForm from "./EventForm";

// export default function EventDetails() {
//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.data || []);
  
//   useEffect(() => {
//     dispatch(fetchEvents());
//     dispatch(fetchArtists());
//   }, [dispatch]);

//   console.log(events); // Log events to check if they are being fetched

//   return (
//     <div className="register-container">
//       <h2 className="register-title">Events - {events.length}</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Artist</th>
//             <th>Venue</th>
//             <th>Address</th>
//             <th>Booking Date</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.length === 0 ? (
//             <tr><td colSpan="7">No events available</td></tr>
//           ) : (
//             events.map((event) => (
//               <tr key={event._id}>
//                 <td>{event.name}</td>
//                 <td>{event.description}</td>
//                 <td>{event.ArtistId?.name}</td> {/* Corrected field name */}
//                 <td>{event.venue}</td>
//                 <td>{event.address}</td>
//                 <td>{new Date(event.booking).toLocaleDateString()}</td>
//                   <td>
//                   {/* Display image from Cloudinary */}
//                   <img
//                     src={event.image} // Cloudinary URL
//                     alt={event.name}
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       objectFit: "cover",
//                       border: "1px solid red",
//                     }}
//                   />
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <div>
//         <EventForm />
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../slices/EventSlice";
import { fetchArtists } from "../slices/ArtistSlice";
import EventForm from "./EventForm";

export default function EventDetails() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.data || []);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div className="eventpage-container">
      <h2 className="eventpage-title">Events - {events.length}</h2>

      <div className="eventpage-grid">
        {events.length === 0 ? (
          <p className="eventpage-no-events">No events available</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="eventpage-card">
              <div className="eventpage-image-wrapper">
                <img
                  src={event.image}
                  alt={event.name}
                  className="eventpage-image"
                />
              </div>
              <div className="eventpage-info">
                <h3>{event.name}</h3>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Artist:</strong> {event.ArtistId?.name || "N/A"}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Address:</strong> {event.address}</p>
                <p><strong>Booking Start:</strong> {new Date(event.bookingStart).toLocaleDateString()}</p>
                <p><strong>Booking End:</strong> {new Date(event.bookingEnd).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="eventpage-form-section">
        <EventForm />
      </div>
    </div>
  );
}

