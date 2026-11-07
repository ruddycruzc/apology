export function initPage({ navigateTo }) {

    const continueButton = document.getElementById("continue-question");

    if (!continueButton) {
        console.error("Continue button not found.");
        return;
    }

    continueButton.addEventListener("click", () => {
        navigateTo("question");
    });

}