import React from "react";
import { Link } from "react-router-dom";
import welcomeImage from "../assets/welcome.png";

const Welcome = () => {
    const sectionStyle = {
        background: `url(${welcomeImage}) no-repeat center center fixed`,
        backgroundSize: "cover",
        height: "100vh", // Set the height to cover the full viewport
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff", // Set text color to white or any contrast color
    };

    return (
        <section style={sectionStyle}>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h1 className="fw-bold rounded-lg text-6xl font-bold mb-4  bg-yellow-500 shadow-lg shadow-yellow-500/50 text-blue-900">Welcome to the Quiz App!</h1>
                        <Link to="/Quiz">
                            <button className="rounded-lg text-6xl mt-20 bg-indigo-500 shadow-lg shadow-indigo-500/50 px-4 py-2 bg-light">
                                Start Quiz
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
