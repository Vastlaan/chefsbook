#Chefsbook.org - handy tool for professional chefs

##Purpose
This application has been dedicated to all chefs wanting to manage their kitchen in digital way.
**It contains 4 main components**:

####Calender
The calender is made to store events. By clicking a day user is able to choose time and description of the event.
After clicking '**Add event**' button the date and description is stored in database and displayed on calender and the calender dashboard.

####Preparations
In this section user can create a TODO list - the list of preparations which has to be done on next day. This is common in every professional kitchen, where somethimes the same kitchen section is managed by other chef next day. It helps to be on the same page if other chef comes to work after his free days.

####Schedule
This part is for creating and managing team schedule. User can add member and his default schedule. If any changes have to be made, it is possible by clicking the name of teams member and then adjusting default schedule or for given week, without changes to default one.

####Recipes
This part is responsible for creating and displaying created recipes. User has to add new recipe with name, photo, ingredients and preparation process description. That way recipes are stored in database and photo on AWS S3 bucket.

##Structure of the web application

On the server side NodeJS with Express is used for handeling api routes. For authentication Passport two strategies are used: Google and local.
All users data are stored on MongoDB database and photos on AWS S3 bucket. There is nodemailer with SendGrid transport used to send confirmation emails.
Client is created with use of React class components and BrowserRouter.

##How to start contributing?

fork the repo: https://github.com/Vastlaan/chefsbook.git

create new branch

make changes, add them, commit and push to the branch you created

make a pull request.
