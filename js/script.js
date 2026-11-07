/* ========================================
   1. APP CONFIGURATION
======================================== */

const appContent = document.getElementById("app-content");

const pages = {
  apology: {
    html: "../pages/apology.html",
    css: "../css/pages/apology.css",
    js: "../js/pages/apology.js",
  },
  reflection: {
    html: "../pages/reflection.html",
    css: "../css/pages/reflection.css",
    js: "../js/pages/reflection.js",
  },
  question: {
    html: "../pages/question.html",
    css: "../css/pages/question.css",
    js: "../js/pages/question.js",
  },
  surprise: {
    html: "../pages/surprise.html",
    css: "../css/pages/surprise.css",
    js: "../js/pages/surprise.js",
  },
};

/* ========================================
   2. LOAD PAGE STYLES
======================================== */

function loadPageStyles(cssPath) {
  return new Promise((resolve, reject) => {
    // Remove previous page styles
    const previousStyles = document.getElementById("page-stylesheet");

    if (previousStyles) {
      previousStyles.remove();
    }

    // Create stylesheet link
    const stylesheet = document.createElement("link");

    stylesheet.id = "page-stylesheet";
    stylesheet.rel = "stylesheet";
    stylesheet.href = cssPath;

    stylesheet.onload = resolve;

    stylesheet.onerror = () => {
      reject(new Error(`Could not load stylesheet: ${cssPath}`));
    };

    document.head.appendChild(stylesheet);
  });
}
function animateCurrentScreenOut() {
  return new Promise((resolve) => {
    const currentScreen = appContent.querySelector(".screen.active");

    // Si no hay pantalla activa, continuamos directamente.
    if (!currentScreen) {
      resolve();
      return;
    }

    currentScreen.addEventListener("animationend", resolve, {
      once: true,
    });

    currentScreen.classList.add("is-leaving");
  });
}
/* ========================================
   3. LOAD PAGE CONTENT
======================================== */

async function navigateTo(pageName) {
  const page = pages[pageName];

  if (!page) {
    console.error(`Page not found: ${pageName}`);
    return;
  }

  try {
    // Load HTML
    const response = await fetch(page.html);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const html = await response.text();

    // Load page-specific CSS
    await loadPageStyles(page.css);

    // Animate current screen before replacing it
    await animateCurrentScreenOut();

    // Insert new HTML into the main container
    appContent.innerHTML = html;

    // Load page-specific JavaScript
    const pageModule = await import(page.js);

    // Initialize the page
    pageModule.initPage({ navigateTo });
  } catch (error) {
    console.error("Error loading page:", error);

    appContent.innerHTML = `
            <section class="screen active">
                <div class="letter-card">
                    <h1>Ups...</h1>
                    <p>No hemos podido cargar esta parte de la carta.</p>
                    <button class="btn btn-primary" onclick="location.reload()">
                        Volver a empezar
                    </button>
                </div>
            </section>
        `;
  }
}

/* ========================================
   4. INITIAL NAVIGATION
======================================== */

const openLetterButton = document.getElementById("open-letter");

openLetterButton.addEventListener("click", () => {
  navigateTo("apology");
});
