# FP Manager

> This project aims to create a central place to manage video player distributions, by creating a listing of video player configurations, and providing an easy to use interface to create, change and delete configurations.

This repo contains all the code for the FP Manager project.

## Setup

- Run `nvm use` to ensure you have the correct Node version ([For information about NVM](https://github.com/nvm-sh/nvm))
- Run `npm install` to install all dependencies
- Copy `.env.local.example`, at this time you need to have a MongoDB instance running to run the project locally
- Run `npm run dev` to serve the project

## Deployment

- Deployment is made automatically when merging a pull request to the main branch

## Infrastructure

The project currently runs in AWS EC2, with the NextJS server running with pm2, and the MongoDB instance running in the same system, for more information check the docs folder.

## Fluid Player

Fluid Player is an open source HTML5 video player that served as inspiration for this project, feel free to check the [Fluid Player documentation](https://docs.fluidplayer.com).