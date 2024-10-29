# MockGen

## Description

This project is a web application built with React that allows users to upload and edit images. It offers features such as background removal, color selection, device frame addition, and other visual customization options.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mockgen.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mockgen
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To start the application, run:

```bash
npm start
```

Then, open your browser and go to `http://localhost:3000` to see the application in action.

## Configuration

Ensure you configure your API key for the background removal service. Create a `.env` file at the root of the project and add your API key:

```
VITE_REMOVE_BG_API_KEY=your-api-key-here
```

## Project Structure

```
mockgen/
├── .gitignore
├── .env.example
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
└── src/
    ├── App.tsx
    └── components/
        ├── BackgroundPicker.tsx
        ├── ColorPicker.tsx
        ├── DeviceFrame.tsx
        ├── DotPattern.tsx
        ├── ImageSettings.tsx
        ├── ImageUpload.tsx
        ├── ShadowOverlay.tsx
        └── Sidebar.tsx
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

<<<<<<< HEAD
=======
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
>>>>>>> 6713cbc27e2f67876d0bfefc5005be74689deed4
