// =========================
// script.js
// =========================

// SERVICES

const serviceCards =
  document.querySelectorAll(".service-card");

serviceCards.forEach(card => {

  card.addEventListener("click", () => {

    serviceCards.forEach(c =>
      c.classList.remove("active")
    );

    card.classList.add("active");

  });

});

// FILTERS

const filters =
  document.querySelectorAll(".filter");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(f =>
      f.classList.remove("active")
    );

    filter.classList.add("active");

  });

});

// MODAL

const pins =
  document.querySelectorAll(".pin");

const modalOverlay =
  document.getElementById("modalOverlay");

const closeModal =
  document.getElementById("closeModal");

// OPEN

pins.forEach(pin => {

  pin.addEventListener("click", () => {

    modalOverlay.classList.add("active");

  });

});

// CLOSE BUTTON

closeModal.addEventListener("click", () => {

  modalOverlay.classList.remove("active");

});

// CLOSE OUTSIDE

modalOverlay.addEventListener("click", (e) => {

  if(e.target === modalOverlay){

    modalOverlay.classList.remove("active");

  }

});

// ESC CLOSE

document.addEventListener("keydown", (e) => {

  if(e.key === "Escape"){

    modalOverlay.classList.remove("active");

  }

});