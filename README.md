# oh-sht
Web component button used to record site issues to configurable backend

## What is it?

The `oh-sht` button is a web component that allows users to report issues on a website. It can be configured to send issue reports to various backends, such as a REST API or a custom server.

It is designed to be easy to integrate into any web application, providing a simple and effective way for users to report problems they encounter.

The button can be integrated on any page by including the component in the HTML and configuring it with the necessary parameters.

By default, the button is floating in the bottom right corner of the page, but it can be styled and positioned as needed.

## Installation

### Using npm

```bash
npm install oh-sht
```

### Manual Installation

1. Clone this repository:
```bash
git clone https://github.com/willosbourne/oh-sht.git
```

2. Install dependencies:
```bash
cd oh-sht
npm run install:all
```

## Usage

### Using the Web Component

1. Import the web component in your JavaScript file:

```javascript
import 'oh-sht';
```

2. Add the component to your HTML:

```html
<oh-sht-button backend-url="https://your-api-endpoint.com/feedback"></oh-sht-button>
```

### Configuration

The `oh-sht-button` component accepts the following attributes:

- `backend-url`: The URL to which the feedback data will be sent (default: '/api/feedback')

### Advanced Features

The `oh-sht-button` component includes several advanced features:

#### Screenshot Capture

When the button is clicked, the component automatically captures a screenshot of the current page using html2canvas. This screenshot is included in the feedback submission.

#### Custom Events

The component dispatches a custom event when the button is clicked:

- `oh-sht-button-pressed`: Fired when the button is clicked and the panel opens. The event includes a callback function that can be used to provide additional data to include in the feedback submission.

Example usage:

```javascript
document.addEventListener('oh-sht-button-pressed', (event) => {
  // Add additional data to the feedback submission
  event.detail.callback({
    userId: 'user123',
    sessionId: 'session456'
  });
});
```

#### Customization Slots

The component provides slots for customization:

- `branding`: A slot for adding branding elements to the feedback panel
- `faq`: A slot for adding FAQ or help links to the feedback panel

Example usage:

```html
<oh-sht-button backend-url="https://your-api-endpoint.com/feedback">
  <div slot="branding">
    <img src="logo.png" alt="Company Logo">
  </div>
  <button slot="faq">Help</button>
</oh-sht-button>
```

### Running the Demos

#### React Demo

To run the React demo application:

```bash
npm run start:react
```

This will start a React application (using Vite) that demonstrates the usage of the `oh-sht-button` component.

You can also build the React demo app for production:

```bash
npm run build:react
```

And preview the production build:

```bash
npm run preview:react
```

#### Simple HTML/CSS/JS Demo

To run the simple HTML/CSS/JS demo:

```bash
npm run start:simple
```

This will start a simple HTML/CSS/JS application that demonstrates the usage of the `oh-sht-button` component on a basic form.

You can also build the simple demo for production:

```bash
npm run build:simple
```

And preview the production build:

```bash
npm run preview:simple
```

## Development

### Project Structure

- `components/`: Contains the web component source code
- `demo-react/`: Contains a React application that demonstrates the web component
- `demo-simple/`: Contains a simple HTML/CSS/JS application that demonstrates the web component

### Local Development

For local development, symlinks are required to allow the demo apps to import the web component.

The symlinks are automatically created when you run the `install:all` script:

```bash
npm run install:all
```

If you need to create the symlinks manually:

```bash
# For the React demo
cd demo-react
ln -sf ../.. node_modules/oh-sht

# For the simple demo
cd ../demo-simple
ln -sf ../.. node_modules/oh-sht
```

This creates symlinks in each demo app's node_modules directory that point to the root of the project, allowing the imports to work through the node_modules path.

#### React Demo Import

The React demo uses Vite, which provides flexibility with imports. The component is imported in the React demo using:

```javascript
// Primary import path
import('oh-sht/components/index.js')
  .catch(error => {
    // Fallback to relative path if needed
    import('../node_modules/oh-sht/components/index.js')
  });
```

#### Simple Demo Import

The simple demo also uses Vite and imports the component directly:

```javascript
// Import the oh-sht button
import '../components/index.js';
```

Vite's import resolution is more flexible than webpack's, but we still maintain the symlink approach for compatibility.

### Building

```bash
npm run build
```

## License

MIT
