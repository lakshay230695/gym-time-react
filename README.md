# gym-time-react
Gym Time is a MERN stack application which I created as a coding challenge in a limited time

How to run the app:

1. Setup Database
Run Mongodb
In root folder, go to "setup" directory and import JSON file for sample tests, questions, and users into the database by running the commands below.
$cd setup
$node importJSON.js

2. Running Server
$npm install
$npm run dev

3. Sample Users
Setting up the database would import certain pre-made users. 
The email and passwords are as follows: 

User1
EmailId: "chainat@byb.com"
Password: "c60195bfff29371f61c1e62330bcd4e3"
"FirstName": "Chainat",
"LastName": "Wongtapan"

User2
EmailId: "lakshay@fullstackengineer.com",
Password: "b21bf6209d00898b42d7f540c17830a8",
"FirstName": "Lakshay",
"LastName": "Anand"


The mailGun email has been disabled as of now as it requires a proper custom domain. If you have a domain, you can replace it in the code along with the key and un-comment it. 
