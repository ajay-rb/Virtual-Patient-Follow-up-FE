"use client";
import { useState } from "react";
import { respondToFollowUp } from "../services/api";
import { toast } from "react-toastify";

const FollowUpList = ({ followUps, setFollowUps }) => {
    const [loadingId, setLoadingId] = useState(null);

    const handleResponse = async (id, response) => {
        setLoadingId(id);
        try {
            await respondToFollowUp(id, response);
            toast.success(`Response recorded: ${response}`);

            setFollowUps((prevFollowUps) =>
                prevFollowUps.map((f) =>
                    f._id === id ? { ...f, status: response === "Concern" ? "Concern" : "Completed" } : f
                )
            );
        } catch (error) {
            console.log({error});
            toast.error("❌ Failed to update follow-up.");
        }
        setLoadingId(null);
    };

    return (
        <div>
            {followUps.length === 0 ? <p className="text-gray-600 text-lg text-center">No follow-ups yet.</p> : 
                followUps.map((followUp) => (
                    <div key={followUp._id} className="border p-6 mb-4 rounded-lg shadow-md bg-white">
                        <p className="text-lg text-gray-500"><strong>Patient:</strong> {followUp.patient.name}</p>
                        <p className="text-gray-400"><strong>Scheduled At:</strong> {new Date(followUp.scheduledAt).toLocaleDateString()}</p>
                        <p className={`text-lg font-semibold ${followUp.status === "Concern" ? "text-red-500" : followUp.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
                            <strong>Status:</strong> {followUp.status}
                        </p>
                        <div className="mt-3 space-x-2 space-y-2">
                            <button 
                                onClick={() => handleResponse(followUp._id, "Healthy")} 
                                className={`px-4 py-2 rounded text-white font-semibold transition ${
                                    followUp.status !== "Pending" ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                                }`}
                                disabled={followUp.status !== "Pending"}
                            >
                                {loadingId === followUp._id ? "Processing..." : "Mark as Healthy"}
                            </button>
                            <button 
                                onClick={() => handleResponse(followUp._id, "Concern")} 
                                className={`px-4 py-2 rounded text-white font-semibold transition ${
                                    followUp.status !== "Pending" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                                }`}
                                disabled={followUp.status !== "Pending"}
                            >
                                {loadingId === followUp._id ? "Processing..." : "Report Concern"}
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default FollowUpList;
