// js/script.js
class HealthChecker {
  constructor() {
    this.form = document.getElementById("healthCheckerForm");
    this.resultContainer = document.getElementById("result-container");
    this.resultMessage = document.getElementById("result-message");
    this.scrollBtn = document.getElementById("scrollTop");

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Form submission
    this.form.addEventListener("submit", this.handleSubmit.bind(this));

    // Scroll to top
    window.addEventListener("scroll", this.toggleScrollButton.bind(this));
    this.scrollBtn.addEventListener("click", this.scrollToTop.bind(this));
  }

  async handleSubmit(event) {
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
      // Simulate API call (replace with actual endpoint)
      const response = await this.processSymptoms(formData);
      this.displayResults(response);
    } catch (error) {
      this.showError("An error occurred while processing your assessment");
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

  displayResults(response) {
    this.resultContainer.classList.remove("hidden");
    this.resultMessage.innerHTML = `
          <p><strong>Status:</strong> ${response.status}</p>
          <p><strong>Message:</strong> ${response.message}</p>
          <p><strong>Submitted Symptoms:</strong> ${response.details.primarySymptoms}</p>
      `;
    this.form.reset();
  }

  showError(message) {
    this.resultContainer.classList.remove("hidden");
    this.resultMessage.innerHTML = `<p class="error">${message}</p>`;
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
  new HealthChecker();
});
