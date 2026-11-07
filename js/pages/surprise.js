export function initPage() {

    // Target date: November 20, 2026 at 09:00 in Spain
    const targetDate = new Date("2026-11-20T09:00:00+01:00");

    // Elements
    const countdown = document.getElementById("countdown");
    const finishedMessage = document.getElementById("countdown-finished");

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (
        !countdown ||
        !finishedMessage ||
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        console.error("Countdown elements not found.");
        return;
    }
let countdownInterval = null;

const restartButton = document.getElementById("restart-surprise");
    /* ========================================
       UPDATE COUNTDOWN
    ======================================== */

    function updateCountdown() {

        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        // The countdown has finished
        if (difference <= 0) {

            countdown.hidden = true;
            finishedMessage.hidden = false;

            clearInterval(countdownInterval);

            return;
        }

        // Calculate remaining time
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        // Update interface
        daysElement.textContent = String(days).padStart(2, "0");
        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }

    // Initial update
    updateCountdown();

if (targetDate.getTime() > Date.now()) {
    countdownInterval = setInterval(updateCountdown, 1000);
}

if (restartButton) {
    restartButton.addEventListener("click", () => {
        window.location.reload();
    });
}
}
