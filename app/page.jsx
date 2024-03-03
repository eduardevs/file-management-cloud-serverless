"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { uploadToS3 } from "../pages/upload";
import { useState, useEffect } from "react";

export default function Home() {
    const [user] = useAuthState(auth);
    const [fileLink, setFileLink] = useState(null);

    const router = useRouter();

    const [userSession, setUserSession] = useState(null);

    useEffect(() => {
      // Access sessionStorage here
      const storedData = sessionStorage.getItem('user');
      if (storedData) {
        setUserSession(JSON.parse(storedData));
      }
    }, []);

    console.log(process.env.URL_AWS_S3, "aqs upload");

    if (!user && !userSession) {
        router.push("/sign-up");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const key = await uploadToS3(e);

        if (key) {
            setFileLink(key);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo or Brand Name */}
                        <div>
                            <div style={{ width: "200px" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="50"
                                    height="50"
                                >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        fill="#0D47A1"
                                        d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18a2 2 0 002-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
                                    />
                                </svg>
                            </div>

                            <a
                                href="/"
                                className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition duration-150 ease-in-out"
                            >
                                FileManager
                            </a>
                        </div>
                        {/* Logout Button */}
                        <button
                            onClick={() => {
                                signOut(auth);
                                sessionStorage.removeItem("user");
                                router.push("/sign-up");
                            }}
                            className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition duration-150 ease-in-out"
                            aria-label="Log out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex flex-1 justify-center items-center p-24">
                <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow">
                    <p className="text-lg font-semibold mb-4">
                        Please select a file to upload
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent"
                            type="file"
                            accept="image/jpeg,image/png"
                            name="file"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-150 ease-in-out"
                        >
                            Upload
                        </button>
                    </form>
                </div>
                <div>
                    <ul>
                        <ul>
                            {fileLink && (
                                <li>
                                    {/* <Image
                                        src={`${process.env.NEXT_PUBLIC_URL_AWS_S3}/${fileLink}`}
                                        alt="Uploaded Image"
                                        width={500}
                                        height={500}
                                    /> */}
                                </li>
                            )}
                        </ul>
                    </ul>
                </div>
            </main>
        </div>
    );
}
