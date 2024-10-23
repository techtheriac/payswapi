# PaySwapi

<img src="https://res.cloudinary.com/techtheriac/image/upload/v1729711774/payswapi_llvxj4.png" >

PaySwapi is a collection of API endpoints to retrieve `pepole` and `planets` in the PaySwapi universe

## Getting started

To run locally, you first need to clone and install the project with Node.js and npm, and it will need to be a newer version like `node@18.17.0` or higher. You can download Node.js and npm [here](https://nodejs.org) or preferably through a version manager like [Volta ⚡](https://volta.sh/).

#### 1. In a terminal, run the following from your desired directory:

```sh
git clone git@github.com:techtheriac/payswapi.git

cd payswapi

npm install
```

#### 2. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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
