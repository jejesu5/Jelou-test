# How to start the server
create a .env file and set the following variable:
MONGO_DATABASE_URL="mongodb://root:rootpassword@mongodb-Cont:27017"
PORT=8080
JWT_SECRET="thisisasecret"

run docker-compose up

Go to localhost:8080/api/docs for test the API (Get a JWT token to access routes)

### Given an array of integers, keep a total score based on the following:
1. Add 1 point for every even number in the array

2. Add 3 points for every odd number in the array, except for the number "5"

3. Add 5 points every time the number "5" appears in the array

Note that 0 is considered even.


```javascript
function calculateScore(arr) {
    let score = 0;
    for (let num of arr) {
        if (num === 5) {
            score += 5;
        } else if (num % 2 === 0) {
            score += 1;
        } else {
            score += 3;
        }
    }
    return score;
}
```

# Challenge 1: Cryptocurrency Trading Platform
In this challenge, you're building a high-throughput API for a cryptocurrency trading platform. Time is crucial due to the high volume of trade orders. You need to choose the fastest verb for read-only operations.

Correct Answer:
a. GET

# Challenge 2: CRM Company API Design
You work for a Customer Relationship Management (CRM) company, and you need to design an API path for retrieving information about a single contact. The path should be flexible for future software changes.

Correct Answer:
b. /contacts/{contact_id}

# Challenge 3: Social Media Network API Error Handling
You're responsible for error handling in the API of a large social media network. You need to choose appropriate HTTP error codes for authentication failures.

Correct Answer:
b. 403 if the user doesn't exist, and 401 if the password is wrong.

# Challenge 4: Documentation for UUIDs
You're writing documentation for user identification in your system, which uses UUIDs. You need to decide whether to include fake UUIDs in example code.

Correct Answer:
b. FALSE

# Challenge 5: Remote API Error Handling
You're building code to handle errors from a remote API server. You need to determine the extent of error handling in the method handleErrors(response).

Correct Answer:
b. Check for the presence of an error. If it exists, throw an exception with the error.

# Challenge 6: Error Handling in Classes
You have database and email driver classes that need error handling for your platform. You need to decide on the best approach for implementing this error handling.

Correct Answer:
c. Make a driver-based error provider to handle errors in all classes that can issue errors.

# Challenge 7: Naming Convention for Private Method
You need to name a private method in your class responsible for looping through eCommerce products to collect and parse data. The method's name should be descriptive and follow best practices.

Correct Answer:
b. loopProductsAndParse()

# Challenge 8: Database Credentials Management
You have multiple places in your codebase that need access to the database, requiring credentials. You need to decide on the best strategy for storing and accessing these credentials.

Correct Answer:
d. Put them in a .env file, load data from it into a configuration system, then request the credentials from a database service provider.

# Challenge 9: Scenario Analysis
Question: Given a distributed system that experiences latencies and occasional
failures in one of its microservices, how would you optimize it?
Describe your approach to identifying the problem, possible solutions, and how
you would ensure high availability and resilience

## Indentify Problem:
First we need to implement a monitoring and alerting system in order to track performance metrics, latency, error rates, and service availability. this help us to indentify problems way more faster.
This also include implement Logging and tracking strategies inside our code.
## Posible solutions:
1. Optimizate code and queries in order to improve overall performance and reduce latencies.
2. In case first point isnt enough.  Implement horizontal scaling by adding more instances of the microservice to distribute the load evenly and handle increased traffic. Utilize load balancers to distribute incoming requests across multiple instances.
3. Implement catching system and asynchronous Processing for certain tasks.
## Ensure high availability and resilience:
Implement a distributed Architecture that minimizes single points of failure, implement containerization and orchestration tools like docker to ensure scability.
Implement automated deployment and rollback.
Implement recovery mechanisms and regular backup to protect data.
