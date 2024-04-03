# NCT Report Tool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

## Project Description

The NCT Report Tool is a web application developed for users to report villains or bad guys in Metro Vancouver and manage the status of the reports.

## Features

- Report Villains: Users can submit reports about villains or bad guys in Metro Vancouver.
- Open and Close Reports: Users can open new reports and close existing reports based on the status of the villain.
- User-friendly Interface: The application provides an intuitive and easy-to-use interface for reporting and managing villains.

## Run Application Using Docker

To run the application using Docker, follow these steps:

1. Install Docker Desktop if you haven't already.

2. Download the docker-compose.yaml file in the root folder.

3. Pull the Docker image by running the following command in your terminal:
    ```bash
    docker pull jv112/nct
    ```

4. Start the application by running the following command in your terminal in the folder with the docker-compose.yaml file:
    ```bash
    docker compose up
    ```

5. Open your browser and navigate to `http://localhost:3000/` to access the application.