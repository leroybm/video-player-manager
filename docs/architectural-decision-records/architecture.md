# Architectural Design

- Status: first draft
- Deciders: Leroy Medeiros, Bernardo Trindade, 
- Date: 2023-12-12
## Context and Problem Statement

As part of building a small project to train development in general we need to ensure that we have an architectural design that is simple and will provide learning opportunities in a short term spam.

## Decision Drivers <!-- optional -->

- The project has a large scope, but we're limited by developer availability. Small achievable goals should be prioritised, KISS.
- The project is open-source, although we will host it while in development, it should be easily picked up by the community
- The project is based on a POC that used React, Tailwind and RHF
	- Further development was made with NextJS, Mongoose and MongoDB
- Project is deployed in AWS EC2, with Github Action to deploy it when merging it on master

## Considered Options

- DB: Using a Sequel as it fits more with the project direction
- DB: Keep using MongoDB as it's already in use
- FE Framework: Maintain what is being used

## Decision Outcome

* Continue using what is already implemented

![Architecture design](./images/architecture_diagram.png 'Architecture design') 

### Positive Consequences

* Architecture works well to handle the player configurations that are large json blobs
* There is no concern in regards of performance since it's a b2b project

### Negative Consequences <!-- optional -->


## Pros and Cons of the Options <!-- optional -->

## Links <!-- optional -->

