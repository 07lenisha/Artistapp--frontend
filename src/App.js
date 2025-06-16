import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from './slices/ArtistSlice';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import List_Artist from './components/List_Artist';
import 'leaflet/dist/leaflet.css';

import SearchArtist from './components/SearchArtist';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import EventDetails from './components/EventDetails';
import { useSelector, useDispatch } from 'react-redux';
import { fetchuserAccount } from './slices/ArtistSlice';

export default function App() {
    const { isLoggedIn } = useSelector((state) => state.artists);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(fetchuserAccount());
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 class="artist-app-title">Artist App</h1>
            </header>

            <nav className="app-nav">
                <ul>
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/account">Account</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                            <li><Link to="/list_Artist">List Artists</Link></li>
                            <li><Link to="/addevent">Add Event</Link></li>
                            <li><Link to="/searchartist">Search_Artists</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                </ul>
            </nav>

            <main className="app-main">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/list_Artist" element={<PrivateRoute><List_Artist /></PrivateRoute>} />
                    <Route path="/addevent" element={<PrivateRoute><EventDetails/></PrivateRoute>} />
                    <Route path="/unauthorized" element={<h1><b>Sorry! You don't have access to the page...</b></h1>} />
                    <Route path="/searchartist" element={<PrivateRoute><SearchArtist /></PrivateRoute>} />
                </Routes>
            </main>
        </div>
    );
}
