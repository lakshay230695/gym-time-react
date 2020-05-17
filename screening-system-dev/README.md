# screening-system
The Developer Screening System acts as an automated web application tool which will choose software developers based on their technical, qualification and interpersonal skills, and will further ease the job of the recruiters to recruit the top qualified developers to the most suitable development projects. The target audiences are the software developers from the developing nations.


## 1. Setup Database
1. Run Mongodb
2. In root folder, go to "setup" directory and import JSON file for sample tests, questions, and users into the database by running the commands below.
```
$cd setup
$node importJSON.js
```

## 2. Running Server
```
$npm install
$npm run dev
```

## 3. Sample Users
The Candidate user can register for a new account on the registration page. However, the Recruiter and System Admin users can only be registered by an existing Admin. You can access the recruiter and admin features with the initial accounts below. Note that you will not be able to use these accounts unless the import in Step 1. Setup Database has been completed.

**Initial Admin account**
```
Email: admin@admin.com
Password: Admin@cs5squad_01!
```
**Initial Recruiter account**

```
Email: re@re.com
Password: Recruit@cs5squad_01!
```
