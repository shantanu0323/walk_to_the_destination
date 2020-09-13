import React from "react";
import "./insights.css";

const Insights = (props) => {
    const {
        totalNodes,
        walls,
        numberOfVisitedNodes,
        pathLength,
        timeTaken,
        targetReached,
    } = props;
    return (
        <section className="insights-container">
            <div>
                {totalNodes ? (
                    <span className="insights insights-total">
                        Total Nodes: <strong>{totalNodes}</strong>
                    </span>
                ) : null}
                {walls ? (
                    <span className="insights insights-walls">
                        Walls: <strong>{walls}</strong>
                    </span>
                ) : null}
                {numberOfVisitedNodes ? (
                    <span className="insights insights-visited">
                        Visited Nodes: <strong>{numberOfVisitedNodes}</strong>
                    </span>
                ) : null}
                {pathLength && targetReached ? (
                    <span className="insights insights-path">
                        Length of Path: <strong>{pathLength}</strong>
                    </span>
                ) : null}
                {timeTaken ? (
                    <span className="insights insights-time">
                        Time Taken:{" "}
                        <strong>
                            {timeTaken >= 1000 ? (
                                <React.Fragment>
                                    {timeTaken / 1000} s
                                </React.Fragment>
                            ) : (
                                <React.Fragment>{timeTaken} ms</React.Fragment>
                            )}
                        </strong>
                    </span>
                ) : null}
                {!targetReached && numberOfVisitedNodes ? (
                    <span className="insights insights-target-not-reached">
                        <strong>Target NOT Reachable</strong>
                    </span>
                ) : null}
            </div>
        </section>
    );
};

export default Insights;
