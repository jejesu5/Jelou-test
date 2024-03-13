# How to start the server
create a .env file and set the following variable:
MONGO_DATABASE_URL="mongodb://root:rootpassword@mongodb-Cont:27017"
PORT=8080
JWT_SECRET="thisisasecret"

run docker-compose up

#Challenge 1: Cryptocurrency Trading Platform
In this challenge, you're building a high-throughput API for a cryptocurrency trading platform. Time is crucial due to the high volume of trade orders. You need to choose the fastest verb for read-only operations.

Correct Answer:
a. GET

#Challenge 2: CRM Company API Design
You work for a Customer Relationship Management (CRM) company, and you need to design an API path for retrieving information about a single contact. The path should be flexible for future software changes.

Correct Answer:
b. /contacts/{contact_id}

#Challenge 3: Social Media Network API Error Handling
You're responsible for error handling in the API of a large social media network. You need to choose appropriate HTTP error codes for authentication failures.

Correct Answer:
b. 403 if the user doesn't exist, and 401 if the password is wrong.

#Challenge 4: Documentation for UUIDs
You're writing documentation for user identification in your system, which uses UUIDs. You need to decide whether to include fake UUIDs in example code.

Correct Answer:
b. FALSE

#Challenge 5: Remote API Error Handling
You're building code to handle errors from a remote API server. You need to determine the extent of error handling in the method handleErrors(response).

Correct Answer:
b. Check for the presence of an error. If it exists, throw an exception with the error.

#Challenge 6: Error Handling in Classes
You have database and email driver classes that need error handling for your platform. You need to decide on the best approach for implementing this error handling.

Correct Answer:
c. Make a driver-based error provider to handle errors in all classes that can issue errors.

#Challenge 7: Naming Convention for Private Method
You need to name a private method in your class responsible for looping through eCommerce products to collect and parse data. The method's name should be descriptive and follow best practices.

Correct Answer:
b. loopProductsAndParse()

#Challenge 8: Database Credentials Management
You have multiple places in your codebase that need access to the database, requiring credentials. You need to decide on the best strategy for storing and accessing these credentials.

Correct Answer:
d. Put them in a .env file, load data from it into a configuration system, then request the credentials from a database service provider.

