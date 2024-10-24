# PaySwapi

<img src="https://res.cloudinary.com/techtheriac/image/upload/v1729711774/payswapi_llvxj4.png" >

PaySwapi is a collection of API endpoints to retrieve `pepole` and `planets` in the PaySwapi universe

## Getting started

To run locally, you first need to clone and install the project with Node.js and npm, and it will need to be a newer version like `node@18.17.0` or higher. You can download Node.js and npm [here](https://nodejs.org) or preferably through a version manager like [Volta ⚡](https://volta.sh/).

#### 1. In a terminal, run the following commands from your desired directory:

```sh
git clone git@github.com:techtheriac/payswapi.git

cd payswapi

npm install
```

#### 2. First, run the development server:

```bash
npm run dev
```

#### 3. Launch application

From a preferred browser visit `http://localhost:3001` to explore API endpoints

## Running application in a container

This project contains a `Dockerfile` to facilitate running the application application within a container.

### Building docker image

#### 1. From the root folder of the project, run the following command:

```sh
  docker build -t payswapi:latest .
```

- `-t payswapi:lastet` tags the image with the name `payswapi:latest`
- `.` indicates that the `Dockerfile` is in the root directory

#### 2. Run the image

Once the image has been built, you can use the following command to launch the application:

```sh
  docker run -p 3001:3001 payswapi:lastest
```

- `-p 3001:3001` Maps port 3001 on your local machine to 3001 within the container as that is the port on which the application runs.

#### 3. Launch Application

Upon running the container, you should be able to access the application in a preferred browser via `http://localhost:3001`

An API reference page will be presented to you with a collection of endpoints to explore as needed.

## Running Tests

#### 1. Ensure that application dependencies are installed

```sh
npm install
```

#### 2. Execute test command

```sh
npm run test
```

## Application Design

### Structure

This application has been structured with easy navigability in mind so as to ensure that maintenance does not tilt towards a nightmare. Hence, related concerns are colocated in disparate folders as shown below:

```sh
├── __tests__
|  └── handlers
├── handlers
|  ├── people.ts
|  └── planets.ts
├── index.ts
├── middlewares
|  └── cache.ts
├── openapi.yaml
├── router.ts
├── server.ts
├── services
|  ├── peopleApiService.ts
|  ├── planetsApiService.ts
|  └── shared
├── types.ts
└── utils
   └── cache.ts
```

### Technology Stack

- **TypeScript**: is being used for the enumerated reasons:

  - **Improved Code Readability and Maintainability**: Types serves as a form of in-line documentation, which is particularly helpful as this project grows or when new maintainers are onboarded.

  - **Enhanced IDE Support**: TypeScript provides rich autocompletion, intelligent code navigation, and refactoring tools in modern IDEs like Visual Studio Code. This increases productivity and reduces debugging time.

- **ExpressJs**: is the framework of choice in building this application for its:

  - **Simplicity**: Express doesn’t enforce a particular structure or pattern, which gives you the flexibility to design your server application the way you want, especially in simple projects where you don’t need a full-fledged framework.

  - **Middleware Ecosystem**: Express has a powerful middleware system that lets you easily add functionality to the server.

  - **Community and Documentation**: Express has a large and active community, extensive documentation, and a wide array of third-party libraries and tools that make development faster and easier

### Coding Style

- **Functions vs Objects**: simple function are well favoured across codebase for easy composability and, objects are preferred where state encapsulation is of great relevance as in the `cache` utility.

- **Types**: Functions and relevant objects are annotated to ensure contractual consistency across codebase.

### Performance considerations

- **Caching**: A simple in-memory cache is being utilized and relevant routes have been enriched with it via a middleware
- **Rate Limiting**: A rate limiter sits atop endpoints to curb misuse of resources
