# NCT Report Tool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

## Project Description

The NCT Report Tool is a web application developed for users to report villains or bad guys in Metro Vancouver and manage the status of the reports.

## Features

- Report Villains: Users can submit reports about villains or bad guys in Metro Vancouver.
- Open and Close Reports: Users can open new reports and close existing reports based on the status of the villain.
- User-friendly Interface: The application provides an intuitive and easy-to-use interface for reporting and managing villains.

## Technologies

This application is built with the following technologies:

- **Frontend**: The frontend of the application is built with Angular, a powerful framework for building complex web applications.

- **Backend**: The backend of the application is built with Express.js, a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- **Database**: The application data is stored in a PostgreSQL database. PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

- **Containerization**: The application is containerized using Docker, which allows it to be easily deployed and run on any system that has Docker installed.

## Run Application Using Docker

To run the application using Docker, follow these steps:

1. Install Docker Desktop if you haven't already.

2. Download the docker-compose.yaml file in the root folder

3. Pull the Docker image by running the following command in your terminal:
    ```bash
    docker pull jv112/nct
    ```

4. Start the application using Docker Compose by running the following command in your terminal:
    ```bash
    docker compose up
    ```

5. Open your browser and navigate to `http://localhost:3000/` to access the application.

## Development server

5. Open your browser and navigate to `http://localhost:4200/` to access the application. The application will automatically reload if you change any of the source files.
2. Start the development server by running `ng serve`.
3. Open your browser and navigate to `http://localhost:4200/` to access the application. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.