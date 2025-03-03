import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"; 

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Register a new patient
export const registerPatient = async (patientData) => {
    const response = await api.post("/patients", patientData);
    return response.data;
};

// Get all follow-ups
export const getFollowUps = async () => {
    const response = await api.get("/follow-ups");
    return response.data;
};

// Respond to a follow-up
export const respondToFollowUp = async (followUpId, response) => {
    const res = await api.post("/respond", { followUpId, response });
    return res.data;
};
