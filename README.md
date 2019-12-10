# Tipsy 
## Team 
### Lead Programmer - Rahul Sondhi
<img src="./Documentation/READMEAssets/rahul.jpg" width="300" height="auto">
The lead programmer will have their hands full because in addition to their own coding responsibilities, they will need to have a general understanding of all the technologies being used and all the implementation work being done at any time. The lead programmer will be responsible for directing group decision-making regarding any technical aspects of the project, including design, implementation, and test decisions.

### Front End Designer- Ju-Hsin Chen
<img src="./Documentation/READMEAssets/judy.jpg" width="300" height="auto">
The Front End Designer is responsible for the look and feel, including interactivity, of the Web app. 

### Back End Engineer - Bryan Valarezo
<img src="./Documentation/READMEAssets/bryan.jpg" width="300" height="auto">
The Data Designer is responsible for the data persisted to your site's database. This means deciding what needs to be stored there and in what format to put it, and then making decisions regarding how to setup the database, how to update it, and how to make sure proper data is preserved and reset when necessary.

### Project Manager - Immanuel Almosara
<img src="./Documentation/READMEAssets/manny.jpg" width="300" height="auto">
The project manager drives the project, which means working with the lead programmer to direct the meetings (i.e. make the meeting agenda, assign action items, follow up on action items, take meeting minutes), develop the Project Specifications, help divide project responsibilities, develop Gantt and Pert Charts for managing work measurement, forecasting, task breakdown, task assignment, and task dependencies.

## Project Description
Tipsy is a Web Application for users who want to learn the art of bartending. The user will be invited to a bar, and within the bars, there will be an example recipe of actual mixed drinks the user may learn from and recipes made by other users who were in the same bar. The users may be creative and make their own drinks, or further more, create their own bar. The web application should be able to provide the service of teaching the instructions on how to make common drinks we may see in real life.

### Overview
Have you ever wanted to learn the art of bartending? What are the various tools needed to create a good drink you could serve at a bar? Given the various forms of alcohol out there, we merge our creativity alongside it. The possibilities are endless. Tipsy is designed to teach you these skills! users will be allowed to make their own bars, where they can then invite their friends to so they can attempt to recreate their own custom made recipes. This web application will serve as a simulator for creating various drinks of your own, or it can serve as a training tool for teaching aspiring bartenders how to create their own drinks. It teaches the ins and outs of creating your favorite alcoholic drinks right in the convenience of your own web browser. 

### Technologies
The technologies we implemented in Tipsy include:
- ReactJS
- Spring Boot
- Foundation
- HTML
- CSS
- Javascript

## Documentation
### Overview
We are using an Agile Software Engineering strategy. This means planning a build schedule, specifying the necessary use case implementations for each build, developing a maleable system design using UML Class diagrams, and then reviewing progress and updating the schedule as needed. 

### UI Mockups
This is a UI Mockup created in Adobe XD to show how the site is to desgined.
#### ![Link to Adobe XD Files](https://github.com/RahulSondhi/Tipsy/blob/master/Documentation/UIMockUps/Tipsy.xd)
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
#### ![Link to SRS Document File](https://github.com/RahulSondhi/Tipsy/blob/master/Documentation/SRSDocument/CSE308%20SRS.docx)

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

## Installation
To launch **Tipsy** you must clone our repository using the command
------------

	git clone https://github.com/RahulSondhi/Tipsy.git
From there you must switch into the /scripts/run-scripts/ directory 

From there run the install & run scripts to properly install all the dependencies and launch the program using the following commands in your terminal:

	cd scripts/run-scripts
	./install.sh
	./run.sh

When you launch the script your default browser will open at localhost:4500 and you will be taken to the Login screen

<img src="./Documentation/READMEAssets/loginScreen.png" width="450" height="auto">
