
// ========================================
// 1. SCREEN NAVIGATION
// ========================================

// Seleccionamos todas las pantallas
const screens = document.querySelectorAll(".screen");

// Función para mostrar una pantalla
function showScreen(screenId) {

    // Ocultamos todas las pantallas
    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    // Mostramos la pantalla solicitada
    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }
}


// ========================================
// 2. LETTER BUTTON
// ========================================

// Seleccionamos el botón de abrir la carta
const openLetterButton = document.getElementById("open-letter");

// Escuchamos el evento click
openLetterButton.addEventListener("click", () => {

    showScreen("screen-apology");

});
