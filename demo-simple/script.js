// Import the oh-sht button
import '../src/index.js';

document.addEventListener('DOMContentLoaded', () => {
    // Add the oh-sht button to the page
    const container = document.getElementById('oh-sht-button-container');
    if (container) {
        // Create the web component
        const ohShtButton = document.createElement('oh-sht-button');
        
        // Set attributes (change the URL to your actual backend endpoint)
        ohShtButton.setAttribute('backend-url', 'https://example.com/api/feedback');
        
        // Append to container
        container.appendChild(ohShtButton);
    } else {
        console.warn('oh-sht-button container not found');
    }
    
    // Handle form submission
    const form = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Log form data (in a real app, you would send this to a server)
            console.log('Form submitted:', formData);
            
            // Show success message
            successMessage.classList.add('visible');
            
            // Reset form
            form.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('visible');
            }, 3000);
        });
    }
});