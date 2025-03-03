import "./globals.css";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <div className="container mx-auto p-6">{children}</div>
                <ToastContainer position="top-right" autoClose={3000} />
            </body>
        </html>
    );
}
