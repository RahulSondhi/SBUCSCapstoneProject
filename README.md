# Tipsy 
## Team 
### Lead Programmer - Rahul Sondhi
<img src="./Documentation/READMEAssets/rahul.jpg" width="200" height="auto">
The lead programmer will have their hands full because in addition to their own coding responsibilities, they will need to have a general understanding of all the technologies being used and all the implementation work being done at any time. The lead programmer will be responsible for directing group decision-making regarding any technical aspects of the project, including design, implementation, and test decisions.

### Front End Designer- Ju-Hsin Chen
<img src="./Documentation/READMEAssets/judy.jpg" width="200" height="auto">
The Front End Designer is responsible for the look and feel, including interactivity, of the Web app. 

### Back End Engineer - Bryan Valarezo
<img src="./Documentation/READMEAssets/bryan.jpg" width="200" height="auto">
The Data Designer is responsible for the data persisted to your site's database. This means deciding what needs to be stored there and in what format to put it, and then making decisions regarding how to setup the database, how to update it, and how to make sure proper data is preserved and reset when necessary.

### Project Manager - Immanuel Almosara
<img src="./Documentation/READMEAssets/manny.jpg" width="200" height="auto">
The project manager drives the project, which means working with the lead programmer to direct the meetings (i.e. make the meeting agenda, assign action items, follow up on action items, take meeting minutes), develop the Project Specifications, help divide project responsibilities, develop Gantt and Pert Charts for managing work measurement, forecasting, task breakdown, task assignment, and task dependencies.

## Project Description
Tipsy is a Web Application for users who want to learn the art of bartending. The user will be invited to a bar, and within the bars, there will be an example recipe of actual mixed drinks the user may learn from and recipes made by other users who were in the same bar. The users may be creative and make their own drinks, or further more, create their own bar. The web application should be able to provide the service of teaching the instructions on how to make common drinks we may see in real life.

### Overview
Have you ever wanted to learn the art of bartending? What are the various tools needed to create a good drink you could serve at a bar? Given the various forms of alcohol out there, we merge our creativity alongside it. The possibilities are endless. Tipsy is designed to teach you these skills! Users will be allowed to make their own bars, where they can then invite their friends to so they can attempt to recreate their own custom made recipes. This web application will serve as a simulator for creating various drinks of your own, or it can serve as a training tool for teaching aspiring bartenders how to create their own drinks. It teaches the ins and outs of creating your favorite alcoholic drinks right in the convenience of your own web browser. 

### Technologies
The technologies we implemented in Tipsy include:
- ReactJS
- Spring Boot
- Foundation
- HTML
- CSS
- Javascript

### API Calls
- **Login POST**
-- This call handles logging in the for the user. It will send the username and password to Spring as a JSON. If the credentials are valid, Spring will then return a JSON Web Token (JWT) with a digest message containing the user session token. If the credentials are invalid, Spring will return an HTTP Bad Request code.
- **Forgot POST**
-- This call will handle the Forget Password use case. It will send an email address to Spring as a JSON. If the email address is registered in the database, Spring will generate a reset token and send an email to the address. The email will contain a link that will handle resetting the password. If the email address is not registered in the database, Spring will return with an HTTP Bad Request code.
- **Register POST**
-- This call will handle User Registration. It will send a First Name, Last Name, Email Address, Nickname, and Password to Spring as a JSON. Spring will register an account with those JSON values and it returns with an HTTP OK Request code. If any values are invalid, Spring will return an HTTP Bad Request code.
- **ValidateConfirm GET**
-- This call will handle confirming an account after registration. It requests the confirmation URL that validates the confirmation token generated during registration. Spring will then respond with a JSON that contains a boolean and a message. If the confirmation URL was valid, the user is enabled. Otherwise the confirmation URL was invalid and the user must request a new valid token.
- **ValidateReset GET**
-- This call will handle validating the reset token after the user clicks on the link after the "Forgot Password" form. It requests the reset URL and checks if the reset token sent and the reset token in the database match. Spring will then respond with a JSON that contains a boolean and message. If the URL was valid, the user will be able to reset their password. Otherwise if the reset URL is invalid, the user must request a new valid token.
- **ResetPassword POST**
-- This call will handle resetting a user's password. It sends a request for a JSON from Spring with the reset token from the reset URL and a new password. Spring will then use the token to find the User account and overwrite the password with the new one from the JSON. Spring will then set the reset token to NULL. Spring then responds with HTTP OK code. If spring was unable to reset the password, Spring will respond with an HTTP Bad request.
- **CheckEmailAvailability POST**
-- This call will handle checking if an email is already registered in the database. It sends a request with a String and Spring then checks if the provided email is already registered in the database. If the given email is already registered, then the user will not be permitted to register for an account, otherwise the user will be allowed to create a new account.
- **CheckNicknameAvailability POST**
-- This call will handle checking if a nickname is already registered in the database. It sends a request with a String and Spring then checks if the provided nickname is already reigstered in the database. If the nickname is already registered, then the user will not be allowed to register for an account with that nickname, otherwise the user will be allowed to create a new account.
- **GetCurrentUser GET**
-- This call will handle returning a JSON containing a UserSummary Object that holds the user ID, nickname, and name. The value that is returned will return a user based on the JWT Token, if no user is found then the function returns nothing. 

## Documentation
### Overview
We are using an Agile Software Engineering strategy. This means planning a build schedule, specifying the necessary use case implementations for each build, developing a maleable system design using UML Class diagrams, and then reviewing progress and updating the schedule as needed. 

### UI Mockups
This is a UI Mockup created in Adobe XD to show how the site is to desgined.
#### ![Link to Adobe XD Files](https://github.com/RahulSondhi/SBUCSCapstoneProject/blob/master/Documentation/UIMockUps/Tipsy.xd)
### UML Class Diagram
This is a UML Class Diagram which maps out the structure of our system by modeling its classes, attributes, operations, and relationships between objects. This was created using Lucidcharts.
![ClassDiagram](./Documentation/UMLDiagrams/tipsyUMLClassDiagram.png)
### UML Component Diagram
This is a UML Component Diagram which is integral to building our software systembecause it helps the team understand the structure of the system we are trying to build. This was created using Lucidcharts.
![ComponentDiagram](./Documentation/UMLDiagrams/tipsyUMLComponentDiagram.png)
### UML Package Diagram
This is a UML Package Diagram which simplifies the complex class diagrams and helps create/show the hiearchy and dependencies for our system. This was created using Lucidcharts. 
![PackageDiagram](./Documentation/UMLDiagrams/tipsyUMLPackageDiagram.png)
### SRS Document
This is a software requirements specification (SRS) which is a document that describes what the software will do and how it will be expected to perform. This was created in Google Documents.
#### ![Link to SRS Document File](https://github.com/RahulSondhi/SBUCSCapstoneProject/blob/master/Documentation/SRSDocument/CSE308%20SRS.docx)

## Build Process/Work Flow
### Team Communication/Organization
Our team has utilized various tools to ensure that our communication continues through the project. In regards to organization we used Trello and TeamGantt to properly delegate our work evenly. For staying connected we created a group chat in Facebook Messenger. For organizing meetings we used When2Meet to quickly find a time where all members were available to schedule an appropriate time to hold a meeting.
### Project Checking Procedure
To ensure the project doesn't crash or fail at anytime or interval, we utilize Git Branches to maintain work flow. This allows our team member to work at the same time on the project without causing issues to each other. This ensures the project doesnt randomly start crashing for others and no merge conflicts remove others' code. Before a push to main branch, the group is given a headsup and everything is saved and stashed before hand. The person merging is responsible for doing a quality check of master and making sure no functions were broken. In order to accomadate lack of experience in git, people on the team who are not familiar with git commandline are using git kraken. 
### Rules for committing
We as a group have collectively decided to only make commits once a significant amount of progress has been made or before merging of any branches. The description of the commit is to be detailed and summarizing of all changes made with the commit. We refrain our team from making multiple small commits back to back.
### Rules of the Database
The database will be only handled by the Data Designer to prevent any problems arising. The format of data going in and out of database are set by data designer. Our team can request changes in data schema and format, but the data designer is the only one to implement those changes unless team member was given permission to change themself. The data within database will only be dropped with the approval of the data designer.
### Making Changes to Project Plan 
The team meets weekly to do check-ins on everyones assigned tasks and sections. If there is a disagreement on how something is implemented, team members will converse about solutions that will result in a compromise. No change is discussed without proper reasoning given first. The other members of the team have the ability to veto an implementation if atleast 2 of 3 other members severly disagree with the current setup. An agenda is created 2 days prior to each meeting day to ensure that the topics that need to be discussed are mentioned during the meeting.
