import React from "react";
import "./copyright.css";
const Copyright = () => {
    return (
        <section className="copyright-container">
            <div className="github-links">
                <a href="https://github.com/shantanu0323">
                    <i className="fab fa-github-square"></i>
                </a>
            </div>
            <div className="copyright">
                Made with <i className="fas fa-heart"></i> by{" "}
                <a href="https://shantanu0323.github.io">Shantanu Pramanik</a>
            </div>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/shantanu-pramanik/">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.facebook.com/shantanu.pramanik1">
                    <i className="fab fa-facebook-square"></i>
                </a>
                <a href="https://www.twitter.com/shantanu0323/">
                    <i className="fab fa-twitter-square"></i>
                </a>
                <a href="https://www.instagram.com/shantanu0323/">
                    <i className="fab fa-instagram-square"></i>
                </a>
            </div>
        </section>
    );
};

export default Copyright;
