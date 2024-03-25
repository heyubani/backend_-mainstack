### main-stack assessment

## Requirements

For development, you will only need Node.js (version 16 and above) and a node global package (npm) installed in your environment.

### Node

- #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the following commands.

    ##### Installation Commands

        $ sudo apt install nodejs
        $ sudo apt install npm

- #### Other Operating Systems

    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).
    If the installation was successful, you should be able to run the following command.

    ##### verification Commands

        $ node --version
        v16.19.0 (recommended for this project)
        $ npm --version
        8.19.3
    If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    ##### update Command

        $ npm install npm -g

---

## Project Installation

    $ git clone https://github.com/heyubani/backend-mainstack.git
    $ cd backend-mainstack
    $ npm install

---

## Configure app

create a  `.env` file to the root folder then add url to your db to connect your postgres DBs. 
An example of the structure of the `.env` is seen in `.env.example` file.

---

## Start server locally

run this script in your code terminal

    $ npm run dev

---

## Running the scripts

All the different build steps are arranged via npm scripts.
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script                | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `lint`                    | Runs eslint on project files. Can be invoked with `npm run lint`      |    |
| `dev`                     | starts the server in the local development environment. Can be invoked with `npm run dev` |            |
| `start`                   | starts the server in the staging or production environment. Can be invoked with `npm run start`                  |
| `test`                    | Runs tests using mocha. Can be invoked with `npm run test`      |
| `build`                   | Runs to generate the build file into a dist folder using babel      |

---

## Postman API Documentation

https://documenter.getpostman.com/view/14594801/2sA35D4i4A

___

## Technologies

- NodeJS
- ExpressJs
- TypeScript
- Mocha
- Chai
- Postman
- MongoDB

---
