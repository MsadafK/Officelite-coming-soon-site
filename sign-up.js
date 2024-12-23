document.addEventListener("DOMContentLoaded", (event) => {
  // retrieving DOM elements
  const form_el = document.querySelector(".signup-header__form");

  form_el.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    // get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const company = document.getElementById("company").value.trim();

    // regex values
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/; // Accepts 10 to 15 digits
    const companyRegex =
      /^[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:[\s&.,'-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*$/;

    // flag value
    let isValid = true;

    // validating name
    if (!validateElement(name, nameRegex)) {
      showError("name");
      document.getElementById("name").setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      document.getElementById("name").setAttribute("aria-invalid", "false");
    }

    // validating email
    if (!validateElement(email, emailRegex)) {
      showError("email");
      document.getElementById("email").setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      document.getElementById("email").setAttribute("aria-invalid", "false");
    }

    // validating phone number
    if (!validateElement(phoneNumber, phoneRegex)) {
      showError("phone-number");
      document
        .getElementById("phone-number")
        .setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      document
        .getElementById("phone-number")
        .setAttribute("aria-invalid", "false");
    }

    // validating company name
    if (!validateElement(company, companyRegex)) {
      showError("company");
      document.getElementById("company").setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      document.getElementById("company").setAttribute("aria-invalid", "false");
    }

    if (isValid) {
      alert("Form submitted successfully!");
      form_el.reset(); // Reset the form after successful validation
      window.location.href = "./index.html"; // Redirect to the main page
    }
  });

  // validate function
  function validateElement(element, regex_value) {
    return regex_value.test(element);
  }

  // Utility: Show error message
  function showError(inputId) {
    const inputField = document.getElementById(inputId);
    const errorMessage = inputField
      .closest(".input-wrapper")
      .querySelector(".error-message");
    const errorIcon = inputField
      .closest(".input-wrapper")
      .querySelector(".error-icon");

    // check if inputField is null
    if (!inputField) {
      console.error(`Input field with ID ${inputId} not found`);
      return;
    }

    errorMessage.style.display = "block";
    errorIcon.style.display = "block";
  }

  // Utility: Clear all error messages
  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => (error.style.display = "none"));

    const errorIcons = document.querySelectorAll(".error-icon");
    errorIcons.forEach((error) => (error.style.display = "none"));
  }

  const countdownDate = new Date("Nov 4, 2025 00:00:00").getTime();

  const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysElement = document.getElementById("days").querySelector("p");
    const hoursElement = document.getElementById("hours").querySelector("p");
    const minutesElement = document
      .getElementById("minutes")
      .querySelector("p");
    const secondsElement = document
      .getElementById("seconds")
      .querySelector("p");

    daysElement.innerText = days;
    hoursElement.innerText = hours;
    minutesElement.innerText = minutes;
    secondsElement.innerText = seconds;

    // Update aria-live attribute values
    daysElement.setAttribute("aria-live", "polite");
    hoursElement.setAttribute("aria-live", "polite");
    minutesElement.setAttribute("aria-live", "polite");
    secondsElement.setAttribute("aria-live", "polite");

    if (distance < 0) {
      clearInterval(countdownFunction);
      daysElement.innerText = "0";
      hoursElement.innerText = "0";
      minutesElement.innerText = "0";
      secondsElement.innerText = "0";
    }
  }, 1000);
});
