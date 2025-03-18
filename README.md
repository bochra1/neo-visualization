# NASA Data Visualization App

## Description

This React application fetches data from NASA's Near Earth Object Web Service (NeoWs) API and displays it in a chart using Google Charts. The app allows users to filter the data based on certain criteria and provides a table view of the data with a switcher to toggle between the chart and the table. Additionally, a CSV Download button is available for users to download the displayed data in CSV format.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind
- **State Management:** Redux-toolkit, Redux-Saga
- **API Requests:** Axios
- **Charting Library:** Google Charts

## Setup Instructions

To get started with the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/bochra1/neo-visualization.git
   cd neo-visualizatio
   ```
2. (Optional) Create the .env File:
   In the root directory of the project, create a file named .env and add the following line with your NASA API key: as follows:
   ```bash
   REACT_APP_NASA_API_KEY=your-nasa-api-key-here
   ```
   Note: Replace your-nasa-api-key-here with your actual NASA API key. If you don’t have one, you can obtain it from NASA's API portal.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```
