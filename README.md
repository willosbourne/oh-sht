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

### Running the Demo

To run the demo application:

```bash
npm run start:demo
```

This will start a React application that demonstrates the usage of the `oh-sht-button` component.

## Development

### Project Structure

- `src/`: Contains the web component source code
- `demo-app/`: Contains a React application that demonstrates the web component

### Local Development

For local development, a symlink is required to allow the demo app to import the web component. This is because Create React App's webpack configuration doesn't allow imports outside of the src/ directory.

The symlink is automatically created when you run the `install:all` script:

```bash
npm run install:all
```

If you need to create the symlink manually:

```bash
cd demo-app
ln -s .. node_modules/oh-sht
```

This creates a symlink in the demo app's node_modules directory that points to the root of the project, allowing the import to work through the node_modules path.

If you encounter issues with the import, you can try using a direct path to the component:

```javascript
// Instead of
import 'oh-sht';

// Use
import '../node_modules/oh-sht/src/index.js';
```

This approach works better with Create React App's webpack configuration, which restricts imports to be within the project's file system.

### Building

```bash
npm run build
```

## License

MIT
