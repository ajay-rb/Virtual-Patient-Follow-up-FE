"use client";
import { useEffect, useState } from "react";
import { getFollowUps } from "../../services/api";
import FollowUpList from "../../components/FollowUpList";

export default function Followups() {
    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFollowUps() {
            try {
                const data = await getFollowUps();
                setFollowUps(data);
            } catch (err) {
                setError("❌ Failed to load follow-ups.");
            } finally {
                setLoading(false);
            }
        }
        fetchFollowUps();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Scheduled Follow-Ups</h1>
            {loading && <p className="text-center text-gray-600">Loading follow-ups...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <FollowUpList followUps={followUps} setFollowUps={setFollowUps}/>
        </div>
    );
}
