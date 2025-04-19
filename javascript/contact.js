// js/script.js
class PageController {
  constructor() {
    this.scrollBtn = document.getElementById("scrollTop");
    this.contactForm = document.getElementById("contactForm");

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Scroll to top
    window.addEventListener("scroll", this.toggleScrollButton.bind(this));
    this.scrollBtn.addEventListener("click", this.scrollToTop.bind(this));

    // Contact form (if present)
    if (this.contactForm) {
      this.contactForm.addEventListener(
        "submit",
        this.handleContactSubmit.bind(this)
      );
    }

    // Health checker form (if present)
    const healthForm = document.getElementById("healthCheckerForm");
    if (healthForm) {
      healthForm.addEventListener("submit", this.handleHealthSubmit.bind(this));
    }
  }

  async handleContactSubmit(event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    try {
      const response = await this.processContactForm(formData);
      this.displayFormResult(response);
    } catch (error) {
      this.showFormError("An error occurred while sending your message");
      console.error("Error:", error);
    }
  }

  async processContactForm(data) {
    // Mock API response - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "Thank you for your message! We’ll get back to you soon.",
        });
      }, 1000);
    });
  }

  displayFormResult(response) {
    const resultContainer = document.getElementById("form-result");
    resultContainer.classList.remove("hidden");
    resultContainer.classList.add(
      response.status === "success" ? "success" : "error"
    );
    resultContainer.textContent = response.message;
    if (response.status === "success") {
      this.contactForm.reset();
    }
  }

  showFormError(message) {
    const resultContainer = document.getElementById("form-result");
    resultContainer.classList.remove("hidden");
    resultContainer.classList.add("error");
    resultContainer.textContent = message;
  }

  async handleHealthSubmit(event) {
    event.preventDefault();

    const formData = {
      symptoms: document.getElementById("symptoms").value.trim(),
      duration: document.getElementById("duration").value.trim(),
      frequency: document.getElementById("frequency").value,
      worsens: document.getElementById("worsens").value.trim(),
      additional: document.getElementById("additional").value.trim(),
      conditions: document.getElementById("conditions").value.trim(),
    };

    try {
      const response = await this.processSymptoms(formData);
      this.displayHealthResults(response);
    } catch (error) {
      this.showHealthError(
        "An error occurred while processing your assessment"
      );
      console.error("Error:", error);
    }
  }

  async processSymptoms(data) {
    // Mock API response - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message:
            "Symptoms received. Please consult a healthcare professional for a proper diagnosis.",
          details: {
            primarySymptoms: data.symptoms,
            duration: data.duration,
            frequency: data.frequency,
          },
        });
      }, 1000);
    });
  }

  displayHealthResults(response) {
    const resultContainer = document.getElementById("result-container");
    const resultMessage = document.getElementById("result-message");
    resultContainer.classList.remove("hidden");
    resultMessage.innerHTML = `
          <p><strong>Status:</strong> ${response.status}</p>
          <p><strong>Message:</strong> ${response.message}</p>
          <p><strong>Submitted Symptoms:</strong> ${response.details.primarySymptoms}</p>
      `;
    document.getElementById("healthCheckerForm").reset();
  }

  showHealthError(message) {
    const resultContainer = document.getElementById("result-container");
    const resultMessage = document.getElementById("result-message");
    resultContainer.classList.remove("hidden");
    resultMessage.innerHTML = `<p class="error">${message}</p>`;
  }

  toggleScrollButton() {
    this.scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  new PageController();
});
