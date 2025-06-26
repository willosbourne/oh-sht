const contentTemplate = `
      <style>
        :host {
          --primary-color: #ff4757;
          --secondary-color: #f1f2f6;
          --text-color: #2f3542;
          --shadow-color: rgba(0, 0, 0, 0.2);
        }

        .oh-sht-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: Arial, sans-serif;
        }

        .oh-sht-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 8px var(--shadow-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          transition: transform 0.3s ease;
        }

        .oh-sht-button:hover {
          transform: scale(1.05);
        }

        .oh-sht-panel {
          display: none;
          position: absolute;
          bottom: 70px;
          right: 0;
          width: 300px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px var(--shadow-color);
          padding: 16px;
        }

        .oh-sht-panel.open {
          display: block;
        }

        .oh-sht-textarea {
          width: 100%;
          height: 150px;
          box-sizing: border-box;
          margin-bottom: 12px;
          padding: 8px;
          border: 1px solid #dfe4ea;
          border-radius: 4px;
          resize: none;
          font-family: inherit;
        }

        .oh-sht-submit {
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          font-weight: bold;
        }

        .oh-sht-submit:hover {
          opacity: 0.9;
        }

        .oh-sht-cancel {
          background-color: var(--secondary-color);
          color: var(--text-color);
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          margin-left: 8px;
        }

        ::slotted(button) {
          background-color: var(--secondary-color) !important;
          color: var(--text-color) !important;
          border: none !important;
          border-radius: 4px !important;
          padding: 8px 16px !important;
          cursor: pointer !important;
          margin-left: 8px !important;
          font-size: 13px !important;
        }

        .oh-sht-success {
          display: none;
          color: green;
          margin-top: 8px;
        }

        .oh-sht-error {
          display: none;
          color: red;
          margin-top: 8px;
        }
      </style>

      <div class="oh-sht-container">
        <button class="oh-sht-button">OH SHT</button>
        <div class="oh-sht-panel">
          <!-- add a slot, branding,  etc.-->
          <slot name="branding"></slot>
          <h3>Report an Issue</h3>
          <textarea class="oh-sht-textarea" placeholder="Describe what happened..."></textarea>
          <div>
            <button class="oh-sht-submit">Submit</button>
            <button class="oh-sht-cancel">Cancel</button>
            <slot name="faq"></slot>
          </div>
          <p class="oh-sht-success">Thank you! Your feedback has been submitted.</p>
          <p class="oh-sht-error">Error submitting feedback. Please try again.</p>
        </div>
      </div>
`;

class OhShtButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = contentTemplate;

    this.isOpen = false;
    this.backendUrl = this.getAttribute('backend-url') || '/api/feedback';
    this.additionalReportData = null;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  static get observedAttributes() {
    return ['backend-url'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'backend-url' && oldValue !== newValue) {
      this.backendUrl = newValue;
    }
  }

  render() { }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('.oh-sht-button');
    const panel = this.shadowRoot.querySelector('.oh-sht-panel');
    const submitBtn = this.shadowRoot.querySelector('.oh-sht-submit');
    const cancelBtn = this.shadowRoot.querySelector('.oh-sht-cancel');
    const textarea = this.shadowRoot.querySelector('.oh-sht-textarea');
    const successMsg = this.shadowRoot.querySelector('.oh-sht-success');
    const errorMsg = this.shadowRoot.querySelector('.oh-sht-error');

    button.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        panel.classList.add('open');
        // Dispatch custom event when button is clicked and panel opens
        this.dispatchEvent(new CustomEvent('oh-sht-button-pressed', {
          bubbles: true,
          composed: true,
          detail: {
            callback: (additionalData) => {
              this.additionalReportData = additionalData;
            }
          }
        }));
      } else {
        panel.classList.remove('open');
      }
    });

    cancelBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      this.isOpen = false;
      textarea.value = '';
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';
    });

    submitBtn.addEventListener('click', () => {
      const feedback = textarea.value.trim();
      if (feedback) {
        this.submitFeedback(feedback)
            .then(() => {
              successMsg.style.display = 'block';
              errorMsg.style.display = 'none';
              textarea.value = '';

              // Auto close after 3 seconds
              setTimeout(() => {
                panel.classList.remove('open');
                this.isOpen = false;
                successMsg.style.display = 'none';
              }, 3000);
            })
            .catch(error => {
              console.error('Error submitting feedback:', error);
              errorMsg.style.display = 'block';
              successMsg.style.display = 'none';
            });
      }
    });
  }

  async submitFeedback(feedback) {
    try {
      const payload = {
        feedback,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      // Include additional form data if available
      if (this.additionalReportData) {
        payload.additionalReportData = this.additionalReportData;
      }

      console.log('Submitting feedback:', payload);

      const response = await fetch(this.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }
}

// Define the custom element
customElements.define('oh-sht-button', OhShtButton);

// Export the class for module usage
export default OhShtButton;
