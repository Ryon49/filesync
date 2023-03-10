# filesync-server
This is the frontend implementation of FileSync using .NET Core and C#. This project is aimed to simulate a backup program for personal files across multiple data source such as S3 and Google drive etc. And also provide account login service for verification. 

## Project Structure
Because of the design, the server design is seperated into 
- Controller: handles all RestApi Request and call serive manager to perform different tasks
- ServiceManager: Governs all underlying service using same interface.
- Service: The actual implementation that will contact external services.

## Things already done:
- The project only supports local storage for uploaded files

## Things to do
- [x] A Index/Directory KV service that stores the mapping of user given file and actual filename stored in the system. 
    - Implement local storage (like a json file) right now
- [x] Support file deletion and download serive
    - [x] Local storage
    - [x] AWS S3
- [ ] Allow for configuring whether to use local storage or S3.
- [ ] Future me: Login service!!!