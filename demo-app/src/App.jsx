import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    satisfaction: 'satisfied',
    interests: {
      productUpdates: false,
      newFeatures: false,
      bugReports: false,
      other: false
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Use effect to programmatically create and mount the web component
  useEffect(() => {
    // Check if the custom element is defined
    if (customElements.get('oh-sht-button')) {
      const container = document.getElementById('oh-sht-button-container');
      if (container) {
        // Clear any existing content
        container.innerHTML = '';

        // Create the web component
        const ohShtButton = document.createElement('oh-sht-button');

        // Set attributes
        ohShtButton.setAttribute('backend-url', 'https://example.com/api/feedback');

        // Append to container
        container.appendChild(ohShtButton);
      }
    } else {
      console.warn('oh-sht-button custom element not defined. Check the import.');
    }
  }, []); // Empty dependency array means this runs once after initial render

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      interests: {
        ...formData.interests,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Show success message
    setShowSuccess(true);

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      feedback: '',
      satisfaction: 'satisfied',
      interests: {
        productUpdates: false,
        newFeatures: false,
        bugReports: false,
        other: false
      }
    });

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="container">
      <h1>Customer Feedback Survey</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Your Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="5"
            value={formData.feedback}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="satisfaction">Overall Satisfaction:</label>
          <select
            id="satisfaction"
            name="satisfaction"
            value={formData.satisfaction}
            onChange={handleInputChange}
          >
            <option value="very-satisfied">Very Satisfied</option>
            <option value="satisfied">Satisfied</option>
            <option value="neutral">Neutral</option>
            <option value="dissatisfied">Dissatisfied</option>
            <option value="very-dissatisfied">Very Dissatisfied</option>
          </select>
        </div>

        <div className="form-group">
          <label>What are you interested in?</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="productUpdates"
                checked={formData.interests.productUpdates}
                onChange={handleCheckboxChange}
              />
              Product Updates
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="newFeatures"
                checked={formData.interests.newFeatures}
                onChange={handleCheckboxChange}
              />
              New Features
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="bugReports"
                checked={formData.interests.bugReports}
                onChange={handleCheckboxChange}
              />
              Bug Reports
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="other"
                checked={formData.interests.other}
                onChange={handleCheckboxChange}
              />
              Other
            </label>
          </div>
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      <div className={`success-message ${showSuccess ? 'visible' : ''}`}>
        Thank you for your feedback! We appreciate your input.
      </div>

      {/* Add the Oh SHT button web component */}
      <div id="oh-sht-button-container">
        {/* The web component will be mounted here using useEffect */}
      </div>
    </div>
  );
}

export default App;