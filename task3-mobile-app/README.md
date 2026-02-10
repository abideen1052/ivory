# Ivory Notifications App

This is a React Native mobile application built with [Expo](https://expo.dev) that features a high-performance notification feed with search functionality, optimized list rendering, and a clean UI.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Download and install [Node.js](https://nodejs.org/) (LTS version recommended).
- **Git**: [Download Git](https://git-scm.com/).
- **Expo Go**: Install the Expo Go app on your [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) device (optional, for physical device testing).

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/abideen1052/ivory-not.git
    cd ivory-not
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

## Running the App

1.  **Start the development server:**

    ```bash
    npm start
    ```

2.  **Run on a specific platform:**
    - **Android Emulator/Device:**

      ```bash
      npm run android
      ```

      _Make sure you have an Android Emulator running or a physical device connected via USB with debugging enabled._

    - **iOS Simulator (macOS only):**

      ```bash
      npm run ios
      ```

      _Requires Xcode installed._

3.  **Using Expo Go (Physical Device):**
    - Start the server with `npm start`.
    - Scan the QR code displayed in the terminal using the Expo Go app (Android) or the Camera app (iOS).
