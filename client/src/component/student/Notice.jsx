import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notice.css";
import { useLocation } from "react-router-dom";

const Notice = () => {
    const [notice, setNotice] = useState([]);
    const [standard, setStandard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const query = new URLSearchParams(useLocation().search);
    const name = query.get("user");

    useEffect(() => {
        const loadNotice = async () => {
            try {
                setLoading(true);

                const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/check-user`, { params: { username: name } });

                const userStandard = userResponse.data.detail.standard;
                setStandard(userStandard);

                const noticeResponse = await axios.get(`${import.meta.env.VITE_API_URL}/get-notice`, { params: { standard: userStandard } });

                setNotice(noticeResponse.data);
            } catch (error) {
                console.error("Error fetching notices:", error);
                setError("Failed to load notices.");
            } finally {
                setLoading(false);
            }
        };

        if (name) {
            loadNotice();
        }
    }, [name]);

    return (
        <div className="main-content">
            <div className="notice-mega-container-box">
                <div className="notice-header-panel">
                    <div className="notice-label">Important Notice</div>
                    <div className="notice-short-label">Report on outdated notices</div>
                </div>

                {loading ? (
                    <p>Loading notices...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : notice.length > 0 ? (
                    <div className="notice-list-box">
                        {notice.map((item, index) => (
                            <div className="notice-box" key={index}>
                                <div className="notice-title">{item.title}</div>
                                <div className="notice-description">{item.description}</div> {/* ✅ Fixed key */}
                            </div>
                        ))}
                    </div>

                ) : (
                    <p>No notices available.</p>
                )}
            </div>
        </div>
    );
};

export default Notice;