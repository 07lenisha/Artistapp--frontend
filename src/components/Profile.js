import { useSelector } from "react-redux";

export default function Profile() {
    const { data } = useSelector((state) => state.artists);

    if (!data) return false;

    return (
        <div className="profile-container">
            <h1 className="welcome-message"><center><b>Welcome User</b></center></h1>
            <div className="profile-box">
                <p><strong>name:</strong> <b>{data.name}</b></p>
                <p><strong>Email:</strong> <b>{data.email}</b></p>
                <p><strong>bio:</strong> <b>{data.bio}</b></p>
            </div>
        </div>
    );
}