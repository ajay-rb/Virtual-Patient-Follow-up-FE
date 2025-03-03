"use client";
import { useState } from "react";
import { registerPatient } from "../services/api";

const PatientForm = () => {
    const [patientData, setPatientData] = useState({
        name: "",
        ownerEmail: "",
        phone: "",
        species: "",
        procedure: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Email and Phone Validation Regex
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const validatePhone = (phone) => {
        const phonePattern = /^[+]?(\d{1,4})?[-\s]?\(?\d{1,3}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}$/;
        return phonePattern.test(phone);
    };

    const handleChange = (e) => {
        setPatientData({ ...patientData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Email and Phone Validations
        if (!validateEmail(patientData.ownerEmail)) {
            setMessage("❌ Invalid email format.");
            setLoading(false);
            return;
        }

        if (patientData.phone && !validatePhone(patientData.phone)) {
            setMessage("❌ Invalid phone number format.");
            setLoading(false);
            return;
        }

        try {
            await registerPatient(patientData);
            setMessage("✅ Patient Registered Successfully!");
            setPatientData({ name: "", ownerEmail: "", phone: "", species: "", procedure: "" });
        } catch (error) {
            console.log({error})
            setMessage(error?.response?.data?.error ?? "❌ Failed to register patient.");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Register New Patient</h1>
            {message && <p className={`mb-4 p-2 rounded text-center ${message.includes("already") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border p-3 w-full rounded text-black"
                    onChange={handleChange}
                    value={patientData.name}
                    required
                />
                <input
                    type="email"
                    name="ownerEmail"
                    placeholder="Owner Email"
                    className="border p-3 w-full rounded text-black"
                    onChange={handleChange}
                    value={patientData.ownerEmail}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="border p-3 w-full rounded text-black"
                    onChange={handleChange}
                    value={patientData.phone}
                />
                <input
                    type="text"
                    name="species"
                    placeholder="Species (Dog, Cat, Human)"
                    className="border p-3 w-full rounded text-black"
                    onChange={handleChange}
                    value={patientData.species}
                    required
                />
                <input
                    type="text"
                    name="procedure"
                    placeholder="Procedure"
                    className="border p-3 w-full rounded text-black"
                    onChange={handleChange}
                    value={patientData.procedure}
                    required
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-3 rounded w-full font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default PatientForm;
