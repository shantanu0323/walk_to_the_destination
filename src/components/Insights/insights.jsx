import React from "react";
import "./insights.css";

const Insights = (props) => {
    const {
        totalNodes,
        walls,
        numberOfVisitedNodes,
        pathLength,
        timeTaken,
    } = props;
    return (
        <section className="insights-container">
            <div>
                {totalNodes ? <span>Total Nodes: {totalNodes}</span> : null}
                {walls ? <span>Walls: {walls}</span> : null}
                {numberOfVisitedNodes ? (
                    <span>Visited Nodes: {numberOfVisitedNodes}</span>
                ) : null}
                {pathLength ? <span>Length of Path: {pathLength}</span> : null}
                {timeTaken ? <span>Time Taken: {timeTaken} ms</span> : null}
            </div>
        </section>
    );
};

export default Insights;
