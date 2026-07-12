// =========================
// PROJECT A — MAIN SCRIPTS
// =========================

const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const navMenu = document.getElementById("navMenu");

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const joinProfessionalButton = document.getElementById(
  "joinProfessionalButton"
);

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const closeLoginModal = document.getElementById("closeLoginModal");
const closeSignupModal = document.getElementById("closeSignupModal");

const loginForm = document.getElementById("loginForm");
const searchForm = document.getElementById("searchForm");

const serviceSearch = document.getElementById("serviceSearch");
const locationSearch = document.getElementById("locationSearch");

const categoryCards = document.querySelectorAll(".category-card");
const professionalCards = document.querySelectorAll(".professional-card");
const favoriteButtons = document.querySelectorAll(".favorite-button");
const accountChoices = document.querySelectorAll(".account-choice");

const noResultsMessage = document.getElementById("noResultsMessage");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const currentYear = document.getElementById("currentYear");


// =========================
// DARK MODE
// =========================

function updateThemeButton() {
  const isDarkMode = body.classList.contains("dark-mode");

  themeIcon.textContent = isDarkMode ? "☀️" : "🌙";
  themeText.textContent = isDarkMode ? "Light mode" : "Dark mode";
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("projectATheme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  updateThemeButton();
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  const isDarkMode = body.classList.contains("dark-mode");

  localStorage.setItem(
    "projectATheme",
    isDarkMode ? "dark" : "light"
  );

  updateThemeButton();
});


// =========================
// MOBILE MENU
// =========================

mobileMenuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  mobileMenuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  mobileMenuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    mobileMenuButton.textContent = "☰";
    mobileMenuButton.setAttribute("aria-expanded", "false");
  });
});


// =========================
// MODALS
// =========================

function openModal(modal) {
  modal.classList.add("open");
  body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("open");
  body.style.overflow = "";
}

loginButton.addEventListener("click", () => {
  openModal(loginModal);
});

signupButton.addEventListener("click", () => {
  openModal(signupModal);
});

joinProfessionalButton.addEventListener("click", () => {
  openModal(signupModal);
});

closeLoginModal.addEventListener("click", () => {
  closeModal(loginModal);
});

closeSignupModal.addEventListener("click", () => {
  closeModal(signupModal);
});

loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    closeModal(loginModal);
  }
});

signupModal.addEventListener("click", (event) => {
  if (event.target === signupModal) {
    closeModal(signupModal);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(loginModal);
    closeModal(signupModal);
  }
});


// =========================
// TOAST MESSAGES
// =========================

let toastTimer;

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// =========================
// SEARCH
// =========================

function filterProfessionals(searchTerm) {
  const normalizedSearch = searchTerm
    .trim()
    .toLowerCase();

  let visibleCount = 0;

  professionalCards.forEach((card) => {
    const service = card.dataset.service.toLowerCase();
    const cardText = card.textContent.toLowerCase();

    const matches =
      normalizedSearch === "" ||
      service.includes(normalizedSearch) ||
      cardText.includes(normalizedSearch);

    card.style.display = matches ? "" : "none";

    if (matches) {
      visibleCount += 1;
    }
  });

  noResultsMessage.style.display =
    visibleCount === 0 ? "block" : "none";
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const service = serviceSearch.value.trim();
  const location = locationSearch.value.trim();

  filterProfessionals(service);

  document
    .getElementById("professionals")
    .scrollIntoView({ behavior: "smooth" });

  if (!service && !location) {
    showToast("Enter a service or location to search.");
    return;
  }

  if (service && location) {
    showToast(
      `Showing sample ${service} results near ${location}.`
    );
    return;
  }

  if (service) {
    showToast(`Showing sample results for ${service}.`);
    return;
  }

  showToast(`Showing sample professionals near ${location}.`);
});


// =========================
// CATEGORY BUTTONS
// =========================

categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;

    serviceSearch.value = category;
    filterProfessionals(category);

    document
      .getElementById("professionals")
      .scrollIntoView({ behavior: "smooth" });

    showToast(`Showing sample ${category} professionals.`);
  });
});


// =========================
// FAVORITE BUTTONS
// =========================

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isSaved = button.textContent.trim() === "♥";

    button.textContent = isSaved ? "♡" : "♥";
    button.setAttribute(
      "aria-label",
      isSaved ? "Save professional" : "Remove saved professional"
    );

    showToast(
      isSaved
        ? "Professional removed from saved profiles."
        : "Professional saved."
    );
  });
});


// =========================
// LOGIN DEMO
// =========================

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document
    .getElementById("loginEmail")
    .value
    .trim();

  closeModal(loginModal);
  loginForm.reset();

  showToast(
    `Demo login submitted for ${email}. Real accounts come later.`
  );
});


// =========================
// ACCOUNT TYPE DEMO
// =========================

accountChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const accountType = choice.dataset.accountType;

    closeModal(signupModal);

    if (accountType === "customer") {
      showToast(
        "Customer signup selected. Registration comes in a later version."
      );
    } else {
      showToast(
        "Professional signup selected. Profile creation comes next."
      );
    }
  });
});


// =========================
// VIEW BUTTON DEMOS
// =========================

document
  .querySelectorAll(".secondary-button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".professional-card");
      const professionalName =
        card.querySelector("h3").textContent;

      showToast(
        `${professionalName} profile page will be added next.`
      );
    });
  });

document
  .querySelector(".hero-card .primary-button")
  .addEventListener("click", () => {
    showToast(
      "The full professional profile page will be added next."
    );
  });

document
  .querySelector(".trust-content .primary-button")
  .addEventListener("click", () => {
    showToast(
      "The full Verification Center page will be added next."
    );
  });

document
  .getElementById("viewAllCategories")
  .addEventListener("click", () => {
    showToast(
      "The full categories page will be added in a future version."
    );
  });


// =========================
// INITIAL PAGE SETUP
// =========================

function initializePage() {
  loadSavedTheme();
  currentYear.textContent = new Date().getFullYear();
}

initializePage();
