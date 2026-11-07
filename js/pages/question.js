export function initPage({ navigateTo }) {

    // Elements
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");

    const questionCard = document.getElementById("question-card");
    const goodbyeCard = document.getElementById("goodbye-card");

    const buttonContainer = document.getElementById("question-actions");

    if (!yesButton || !noButton || !questionCard || !goodbyeCard) {
        console.error("Question page elements not found.");
        return;
    }

    /* ========================================
       YES BUTTON
    ======================================== */

    yesButton.addEventListener("click", () => {
        navigateTo("surprise");
    });

    /* ========================================
       ESCAPE BUTTON
    ======================================== */

    function moveNoButton() {

        const containerWidth = buttonContainer.clientWidth;
        const containerHeight = buttonContainer.clientHeight;

        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        const maxX = containerWidth - buttonWidth;
        const maxY = containerHeight - buttonHeight;

        const randomX = Math.random() * Math.max(0, maxX);
        const randomY = Math.random() * Math.max(0, maxY);

        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
        noButton.style.transform = "none";
    }

    // Escape when the mouse approaches
    noButton.addEventListener("pointerenter", (event) => {

        if (event.pointerType === "mouse") {
            moveNoButton();
        }

    });

    /* ========================================
       NO BUTTON: RESPECTFUL GOODBYE
    ======================================== */

    noButton.addEventListener("click", () => {

        questionCard.hidden = true;
        goodbyeCard.hidden = false;

    });

}