"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 p-4 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-lg font-bold">
                Virtual Patient Follow-Up
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-gray-200">Dashboard</Link>
                    <Link href="/patient" className="hover:text-gray-200">Register Patient</Link>
                    <Link href="/followups" className="hover:text-gray-200">Follow-ups</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-700 p-2 space-y-2">
                    <Link href="/" className="block px-4 py-2 hover:bg-blue-500 rounded">Dashboard</Link>
                    <Link href="/patient" className="block px-4 py-2 hover:bg-blue-500 rounded">Register Patient</Link>
                    <Link href="/followups" className="block px-4 py-2 hover:bg-blue-500 rounded">Follow-ups</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
