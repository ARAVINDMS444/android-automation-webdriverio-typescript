```markdown
# Android Automation WebdriverIO Framework

## Overview

This Android App Automation Framework is built using [WebdriverIO](https://webdriver.io/), designed to automate testing of Android applications. The framework supports writing tests in TypeScript and is equipped with various utilities and configurations to ensure robust and maintainable test automation.

## Features

- **WebdriverIO v9.x**: Leverage the latest features of WebdriverIO.
- **TypeScript Support**: Write your test scripts in TypeScript for type safety and better code management.
- **Page Object Model (POM)**: Organize locators and methods for page interactions in separate classes.
- **Cross-Platform Execution**: Run tests on different devices and emulators.
- **CI/CD Integration**: Seamlessly integrate with CI/CD pipelines.
- **Allure Reporting**: Generate detailed test reports with screenshots, logs, and steps.
- **Flexible Configuration**: Easily configure capabilities and environment settings.
- **Reusable Utilities**: Common utilities and helper functions to streamline test development.

## Prerequisites

Before setting up the framework, ensure you have the following installed:

- **Node.js** (v16.x or later)
- **Java Development Kit (JDK)** (v8 or later)
- **Android SDK**
- **Appium** (Installed globally)
- **WebdriverIO CLI**
```

## Installation

Follow these steps to set up the framework on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/ARAVINDMS444/android-automation-webdriverio-typescript.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Android SDK Path

Ensure that your Android SDK path is correctly set in your environment variables.

**For macOS/Linux:**

```bash
export ANDROID_HOME=/path/to/your/android/sdk
export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH
```

**For Windows:**

1. Open **System Properties**.
2. Navigate to **Advanced** > **Environment Variables**.
3. Add a new **System Variable**:
   - **Variable name**: `ANDROID_HOME`
   - **Variable value**: `C:\path\to\your\android\sdk`
4. Update the **Path** variable by adding:
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\platform-tools`

### 4. Install Appium Globally

```bash
npm install -g appium
```

### 5. Verify Installations

Ensure that all installations are successful by checking their versions:

```bash
node -v
java -version
appium -v
wdio --version
```

## Installation of Prettier

Ensure your code remains clean and consistent by using Prettier. You can install and configure Prettier as follows:

1. **Install Prettier and Related Plugins**

   ```bash
   npm install --save-dev prettier
   ```

2. **Format Your Code**

   You can format your entire codebase using:

   ```bash
   npx prettier --write .
   ```

3. **Integrate with Your IDE**

   Install the Prettier plugin for your code editor (e.g., VS Code, JetBrains IDEs) and enable `Format On Save` for automatic formatting.

## Project Structure

The project follows a modular structure to promote maintainability and scalability.

```
├── src/tests/              # Test Cases
│   ├── test.testcase1.ts
│   └── test.testcase2.ts
│   └── ...
├── src/page-objects/       # Page Object Classes
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   └── ...
├── src/utils/              # Utility functions and constants
│   ├── Helpers.ts
│   ├── Constants.ts
│   └── ...

├── tsconfig.json           # TypeScript Configuration
├── package.json            # NPM Configuration
├── wdio.conf.ts            # WebdriverIO Configuration File
└── README.md               # README File
```

## Running Tests

### 1. Locally on an Emulator/Device

Ensure that an Android emulator or a real device is running.

```bash
npx wdio
```

### 2. Running Specific Test Files

You can specify a particular test or set of tests to run:

```bash
npx wdio --spec ./tests/test1.test.ts
```

### 3. Generating Allure Reports

After test execution, generate Allure reports using:

```bash
npx allure generate ./reports/allure-results --clean
npx allure open ./reports/allure-report
```

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. **Fork the Repository**

   Click the "Fork" button on the repository page to create your own copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/AgentdesksEngine/android-officeapp-automation.git
   cd android-officeapp-automation
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/your-name/your-feature-name
   ```

4. **Make Your Changes**

   Automate your Test and run it locally.

5. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/your-name/your-feature-name
   ```

7. **Create a Pull Request**

   Go to the original repository and create a pull request from your fork.

### Guidelines

- **Code Style**: Follow the existing code style and formatting. Use Prettier to format your code.
- **Testing**: Ensure all tests pass before submitting a pull request.

_Happy Testing! 🚀_
