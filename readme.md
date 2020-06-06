# Chefsbook.org - handy tool for professional chefs

## Purpose

This application has been dedicated to all chefs wanting to manage their kitchen in digital way.
**It contains 4 main components**:

#### Calender

The calender is made to store events. By clicking a day user is able to choose time and description of the event.
After clicking '**Add event**' button the date and description is stored in database and displayed on calender and the calender dashboard.

#### Preparations

In this section user can create a TODO list - the list of preparations which has to be done on next day. This is common in every professional kitchen, where somethimes the same kitchen section is managed by other chef next day. It helps to be on the same page if other chef comes to work after his free days.

#### Schedule

This part is for creating and managing team schedule. User can add member and his default schedule. If any changes have to be made, it is possible by clicking the name of teams member and then adjusting default schedule or for given week, without changes to default one.

#### Recipes

This part is responsible for creating and displaying created recipes. User has to add new recipe with name, photo, ingredients and preparation process description. That way recipes are stored in database and photo on AWS S3 bucket.

## Structure of the web application

On the server side NodeJS with Express is used for handeling api routes. For authentication Passport two strategies are used: Google and local.
All users data are stored on **MongoDB** database and photos on **AWS S3 bucket**. There is nodemailer with **SendGrid** transport used to send confirmation emails.
Client is created with use of React class based components.

## How to start contributing?

#### fork the repo, clone to local machine and add upstream

1. go to repository page https://github.com/Vastlaan/chefsbook.git and click the fork button

2. clone your forked repo locally on your computer:
   navigate to folder on your laptop where you want to download repo and run command **\$ git clone** followed by the link to your forked repo

3. set up remote upstream to original copy like:

HTTPS: \$ git remote add upstream https://github.com/Vastlaan/chefsbook.git

or

SSH: \$ git remote add upstream git@github.com:Vastlaan/chefsbook.git

#### Install project locally

1. navigate to the **/** root folder and run:
   \$ npm install
2. navigate to client **/client** folder and run:
   \$ npm install


    ## !IMPORTANT!

3. in the folder /config create file **dev.js** where you will save all your **secret credentials** from next step. Note that .gitignore contains already dev.js , so your private secrets will be avaliable only for you locally and won't be commited to github

4. this project requires third party services to run all features properly:

**NOTE: if you dont want to work on specific funcionality, feel free to skip configuration of the third service. For example if you dont want to touch anything related to passport Google strategy, you dont have to create your OAuth API, however you must put in place of that data some dummy data in /config/dev.js to not have any errors**

###### **MongoDB** (required to store recipes, appointments, preparations and calendar events)

You need to have mongoDB account, create new free database and connect it to the project by linking database conneting string to the /config/dev.js file under a key mongoURI.

###### **AWS S3 bucket** (required to store recipes)

You need to have an AWS account to store photos from recipes. Create new S3 bucket and write the **bucket name and region in /config/dev.js** respectively under the keys AWSBucket and AWSRegion. Also **AWS SECRET ACCESS KEY and ID** have to be updated to **/config/dev.js** under the keys AWSSecretKey and AWSAccessKeyId. More info https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/

###### **SendGrid** (required to send confirmation email by registration)

Again sendgrid API key is stored in /config/dev.js under the key sendgridApiKey

###### **Google OAuth Api** (required for google authentication login)

To lunch your own OAuth API you need to have your own google account. More about creating API you will find here: https://developers.google.com/identity/protocols/oauth2 . Google credentials are stored in /config/dev.js under keys googleClientID and googleSecretKey

#### Create a branch and start making changes

To start making changes make sure you are up to date with upstream and create a branch.
\$ git checkout master
\$ git pull upstream master && git push origin master
\$ git checkout -b <your_branch_name>

#### Make a pull request

To make a pull request make sure that you pushed all the changes to your remote

\$ git push -u origin <your_branch_name>

You can now navigate to your forked project and make a pull request
