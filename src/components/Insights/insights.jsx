import React from "react";
import "./insigts.css";

const Insights = (props) => {
    const { insights } = props;
    return (
        <section className="insights-container">
            <div>
                <p>{insights}</p>
            </div>
        </section>
    );
};

export default Insights;
