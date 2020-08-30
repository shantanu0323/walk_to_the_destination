const resetSourceAndTarget = () => {
    const sourceDom = document.querySelector(".node.node-source");
    sourceDom.classList.remove("path-to-top");
    sourceDom.classList.remove("path-to-right");
    sourceDom.classList.remove("path-to-bottom");
    sourceDom.classList.remove("path-to-left");

    const targetDom = document.querySelector(".node.node-target");
    targetDom.classList.remove("path-to-top");
    targetDom.classList.remove("path-to-right");
    targetDom.classList.remove("path-to-bottom");
    targetDom.classList.remove("path-to-left");
};

export default resetSourceAndTarget;
