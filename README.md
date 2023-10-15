# Reporters Portal Backend Server [Live Server](https://drab-cyan-caiman-yoke.cyclic.app) [API Documentation](https://documenter.getpostman.com/view/29471893/2s9YR6ZYpc)

## Project Description

Reporters ia a fully functional Backend Server that enables the reporters to create, delete and rate Latest News. The server is built using Node.Js, Express.Js and MongoDB.
Reporters aims to provide:
* A server to be used by reporters to showcase their expertise and connect with readers
across the globe.
In the following sections, we will cover the technical details of the platform, including:
1. System architecture: The high-level overview of the server's components.
2. Back-end: The description of the back-end architecture, features and functionalities of
the back-end, frameworks, libraries, tools used, and data models and database schema.
3. API Design: The description of the API design, list of API endpoints, their
functionalities, and sample API requests and responses.
4. Deployment: The description of the deployment process, hosting environment and
infrastructure, and deployment scripts and configuration.
5. Testing: The description of the testing process, types of testing, test frameworks and 
tools used.

In summary, Reporters ia a backend server which provides the reporters to use the server and create their own Reporting website where they can create/edit/delete news and users can create/edit/delete comments. In the following sections, we will delve into the technical details
of the platform, which will provide a comprehensive understanding of the platform's
features and functionalities.

## System Architecture

The Reporters Backend Server consists of two main components: the back end, and the database. The back end and database serves as the server.

### Back-end 

The back end of the platform is built using NodeJS and ExpressJS,. The back end provides APIs for the front end to consume, which include functionalities such as user authentication, news creation and comments creation. The back end also handles the logic for processing and storing the course content and user data.


### Database

The database for the server is built using MongoDB, which is a NoSQL database that provides a flexible and scalable data storage solution. MongoDB allows for the storage of unstructured and semi-structured data. The database stores the news content, user data, and other relevant information related to the platform.


## Back End

Description of the Back-end Architecture: 
Reporters uses a monolithic architecture, with the backend built using Node.js and Express.js, and MongoDB as the primary database. 

Features and Functionalities of the Back-end: 
The back end of Reporters provides a range of features and functionalities, including:
1. User authentication and authorization: Reporters, Admins, and Editors can sign up and log in to the platform using their email addresses and password.
1. News management: Reporters can create, read, update, and delete news, as well as manage news content and media. Readers can view and rate courses.
1. Cloud-based media management: Reporters uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.

Frameworks, Libraries, and Tools used: 
The back end of Reporters uses a range of frameworks, libraries, and tools to ensure its
functionality and performance, including:
1. Node.js: Node.js is used as the primary framework for the back end.
2. MongoDB: MongoDB is used as the primary database, providing a flexible and scalable data storage solution.
3. Express.js: Express.js is used as a web application framework, providing a range of features and tools for building web applications.
4. JWT: JWT (JSON Web Tokens) are used for authentication and authorization, providing a secure and reliable way to manage user credentials.
5. Bcrypt: Bcrypt is used for password hashing, adding an extra layer of security to user data.
6. Mongoose: Mongoose is used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript

### Data Models and Database Schema: 
The back end of Reporters uses a range of data models and database schemas to
manage data, including:
1. Reporters schema: Includes fields such as name, email, password, and news details
for each reporter.
2. News schema: Includes fields such as News title, description, reporters details,
and media content.

Overall, the back-end of Reporters is designed to provide a robust and scalable solution for an news reading platform, with a focus on security, reliability, and ease of use. By using the right frameworks, libraries, and tools, we can ensure that the server functions smoothly.

## API Design

The Reporters API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE.
[API DOCUMENTATION](https://documenter.getpostman.com/view/29471893/2s9YR6ZYpc)

In conclusion, the REST API design for the Reporters Portal Backend Server is a crucial part of the project. The API endpoints and their functionalities are designed to ensure seamles communication between the front-end and back-end of the application. By following RESTful principles, the API will be scalable, maintainable, and reliable. The sample API requests and responses provided in the [API Documentation](https://documenter.getpostman.com/view/29471893/2s9YR6ZYpc) illustrate how each endpoint will function and what kind of data it will accept or return. With this API design, StudyNotion will be able to provide a smooth user experience while ensuring security and stability.

