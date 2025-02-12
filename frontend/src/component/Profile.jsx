import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.get(`http://localhost:5000/scrape/${username}`);
            setData(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch data");
        }

        setLoading(false);
    };

    return (
        <div className="container">
            <h2>Instagram Profile Scraper</h2>
            <input
                type="text"
                placeholder="Enter Instagram Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={fetchData} disabled={loading}>
                {loading ? "Loading..." : "Fetch Data"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {data && (
                <div className="result">
                    <h3>Username: {data.username}</h3>
                    <p>Followers: {data.followers}</p>
                    <p>Posts: {data.posts}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
