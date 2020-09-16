import React, { Component } from "react";
import "./navitem.css";
class NavItem extends Component {
    state = {
        description: this.getSelectedOptionDescription(
            this.props.selectedOption,
            this.props.options
        ),
    };

    handleHover = (option) => {
        this.setState({ description: option.description });
    };

    dismissContainer = () => {
        document
            .querySelectorAll(".option-container")
            .forEach((dom) => dom.classList.remove("show"));
    };

    render() {
        const { options, selectedOption, onChanged } = this.props;
        const hasDescription =
            options[0].description === undefined ? false : true;
        const optionNamesContainerWidth = hasDescription ? "30%" : "100%";
        let selectedOptionObject = this.getSelectedOption(
            selectedOption,
            options
        );

        return (
            <div className="options-container">
                <button
                    className="dismiss-container"
                    onClick={this.dismissContainer}
                >
                    X
                </button>
                <div
                    className="option-names-container"
                    style={{ width: optionNamesContainerWidth }}
                >
                    {options.map((option) => (
                        <button
                            key={option.id}
                            style={{
                                textAlign: hasDescription ? "right" : "center",
                            }}
                            className={
                                option.id === selectedOption ? "active" : ""
                            }
                            onMouseEnter={() => this.handleHover(option)}
                            onMouseLeave={() =>
                                this.handleHover(selectedOptionObject)
                            }
                            onClick={() =>
                                onChanged(
                                    option.id,
                                    option.speed === undefined
                                        ? null
                                        : option.speed
                                )
                            }
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
                {hasDescription ? (
                    <div
                        className="option-description-container"
                        style={{
                            width: "60%",
                            left: optionNamesContainerWidth,
                        }}
                    >
                        {this.state.description}
                    </div>
                ) : null}
            </div>
        );
    }

    getSelectedOption(selectedOption, options) {
        const option = options.filter((option) => option.id === selectedOption);
        return option[0];
    }
    getSelectedOptionDescription(selectedOption, options) {
        const option = this.getSelectedOption(selectedOption, options);
        return option === undefined ? null : option.description;
    }
}

export default NavItem;
