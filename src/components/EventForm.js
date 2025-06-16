import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, fetchEvents } from "../slices/EventSlice";
import { fetchArtists } from "../slices/ArtistSlice";

export default function EventForm() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [venue, setVenue] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState(null);
    const [artist, setArtist] = useState("");
    const [bookingStart, setBookingStart] = useState(""); 
    const [bookingEnd, setBookingEnd] = useState("");
    const [clientError, setClientError] = useState({});

    const { loading, serverErrors } = useSelector((state) => state.events);
    const { artistsList } = useSelector((state) => state.artists);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const resetForm = () => {
        setName("");
        setDescription("");
        setArtist("");
        setVenue("");
        setAddress("");
        setImage(null);
        setBookingStart("");
        setBookingEnd("");
        setClientError({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startDate = new Date(bookingStart);
        const endDate = new Date(bookingEnd);
        const currentDate = new Date();

        // Check if the start date is in the past
        if (startDate < currentDate) {
            setClientError({
                ...clientError,
                bookingStart: "Start date cannot be in the past",
            });
            return; // Prevent form submission if validation fails
        }

        // Check if the end date is after the start date
        if (startDate >= endDate) {
            setClientError({
                ...clientError,
                bookingEnd: "End date must be after start date",
            });
            return; // Prevent form submission if validation fails
        }

        // No error for same month or different month as long as the end date is after the start date
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("venue", venue);
        formData.append("address", address);
        formData.append("ArtistId", artist); // ✅ Correct
        formData.append("bookingStart", bookingStart); // ✅
        formData.append("bookingEnd", bookingEnd); // ✅

        if (image instanceof File) {
            formData.append("image", image);
        }

        dispatch(createEvent({ formData, resetForm }));
        resetForm();
        dispatch(fetchEvents());
    };

    return (
        <div className="event-form-container">
            <form onSubmit={handleSubmit} className="event-form">
                <h2>Add New Event</h2>

                {serverErrors?.errors?.map?.((err, i) => (
                    <div key={i} className="error">{err.msg || err.message}</div>
                ))}

                <div className="form-group">
                    <label>Event Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={clientError.name ? "error-input" : ""}
                    />
                    {clientError.name && <span className="error">{clientError.name}</span>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={clientError.description ? "error-input" : ""}
                    />
                    {clientError.description && <span className="error">{clientError.description}</span>}
                </div>

                <div className="form-group">
                    <label>Venue</label>
                    <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className={clientError.venue ? "error-input" : ""}
                    />
                    {clientError.venue && <span className="error">{clientError.venue}</span>}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={clientError.address ? "error-input" : ""}
                    />
                    {clientError.address && <span className="error">{clientError.address}</span>}
                </div>

                <div className="form-group">
                    <label>Choose an Artist:</label>
                    <select
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    >
                        <option value="">Select an artist</option>
                        {artistsList && Array.isArray(artistsList) &&
                            artistsList.map((ele) => (
                                <option key={ele._id} value={ele._id}>
                                    {ele.name}
                                </option>
                            ))}
                    </select>
                    {clientError.artist && <span className="error">{clientError.artist}</span>}
                </div>

                {/* ✅ Booking Start Date */}
                <div className="form-group">
                    <label>Booking Start Date</label>
                    <input
                        type="date"
                        value={bookingStart}
                        onChange={(e) => setBookingStart(e.target.value)}
                        className={clientError.bookingStart ? "error-input" : ""}
                    />
                    {clientError.bookingStart && <span className="error">{clientError.bookingStart}</span>}
                </div>

                {/* ✅ Booking End Date */}
                <div className="form-group">
                    <label>Booking End Date</label>
                    <input
                        type="date"
                        value={bookingEnd}
                        onChange={(e) => setBookingEnd(e.target.value)}
                        className={clientError.bookingEnd ? "error-input" : ""}
                    />
                    {clientError.bookingEnd && <span className="error">{clientError.bookingEnd}</span>}
                </div>

                <div className="form-group">
                    <label>Event Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image && typeof image === "string" && (
                        <div className="image-preview">
                            <img src={image} alt="Current event" style={{ maxWidth: "150px" }} />
                        </div>
                    )}
                    {image && image instanceof File && (
                        <div className="image-preview">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{ maxWidth: "150px" }}
                            />
                        </div>
                    )}
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? "Processing..." : "Add Event"}
                </button>
            </form>
        </div>
    );
}
