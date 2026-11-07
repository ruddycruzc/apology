export function initPage({ navigateTo }) {

    // Elements
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");

    const questionCard = document.getElementById("question-card");
    const goodbyeCard = document.getElementById("goodbye-card");

    const restartButton = document.getElementById("restart-button");

    if (
        !yesButton ||
        !noButton ||
        !questionCard ||
        !goodbyeCard ||
        !restartButton
    ) {
        console.error("Question page elements not found.");
        return;
    }

    // State
    let touchAttempts = 0;
    const maxTouchEscapes = 2;

    /* ========================================
       YES BUTTON
    ======================================== */

    yesButton.addEventListener("click", () => {
        navigateTo("surprise");
    });


    /* ========================================
       MOVE NO BUTTON
    ======================================== */

    function moveNoButton() {

        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        const padding = 16;

        const maxX = window.innerWidth - buttonWidth - padding;
        const maxY = window.innerHeight - buttonHeight - padding;

        const minX = padding;
        const minY = padding;

        const randomX =
            minX + Math.random() * Math.max(0, maxX - minX);

        const randomY =
            minY + Math.random() * Math.max(0, maxY - minY);

        noButton.style.position = "fixed";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
        noButton.style.transform = "none";
    }


    /* ========================================
       DESKTOP INTERACTION
    ======================================== */

    noButton.addEventListener("pointerenter", (event) => {

        if (event.pointerType === "mouse") {
            moveNoButton();
        }

    });


    /* ========================================
       MOBILE INTERACTION
    ======================================== */

    noButton.addEventListener("pointerdown", (event) => {

        if (event.pointerType === "touch" && touchAttempts < maxTouchEscapes) {

            touchAttempts++;

            moveNoButton();

            // Prevent the click during the first two attempts
            event.preventDefault();
        }

    });


    /* ========================================
       NO BUTTON: GOODBYE
    ======================================== */

    noButton.addEventListener("click", () => {

        questionCard.hidden = true;
        goodbyeCard.hidden = false;

        // Return the button to its normal position
        noButton.style.position = "";
        noButton.style.left = "";
        noButton.style.top = "";
        noButton.style.transform = "";

    });


    /* ========================================
       RESTART EXPERIENCE
    ======================================== */

    restartButton.addEventListener("click", () => {
        window.location.reload();
    });

}