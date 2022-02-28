const inquirer = require(`inquirer`);
const fs = require(`fs`);
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
let teamName = "";
const teamCards = [];
const currentTeam = [];

//TODO: Add questions that will be used to populate HTML page
const managerQuestions = ()=>
{
    return inquirer.prompt([
        {
            type: "input",
            name: "teamName",
            message: "What is the team's name?",
          },
        {
            type: 'input',
            name: 'managerName',
            message: "What is your team manager's name?",
        },
        {
            type: 'input',
            name: 'managerID',
            message: "What is your manager's id?",
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is your manager's e-mail address?",
        },
        {
            type: 'input',
            name: 'managerOffice',
            message: "What is your manager's office number?",
        },
    ]).then((answers)=>{
        teamName = answers.teamName;
        const newManager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice);
        createManagerCard(newManager, "Manager")
        currentTeam.push(newManager);
        selectTeammates();
    })
}

//Inquirer prompt to proceed or end the teammate selection process
const selectTeammates = ()=>
{
    inquirer.prompt([
        {
            type: 'list',
            name: 'teammateChoice',
            message: 'Do you want to add a new teammate?',
            choices: ['Engineer', 'Intern', 'Finish'],
        }
    ]).then((answers)=>{
        console.log(answers.teammateChoice);
        switch(answers.teammateChoice){
            case "Engineer":
                engineerQuestions();
                break;
            case "Intern":
                internQuestions();
                break;
            case "Finish":
                generateHTML();
        }
    });
}
const engineerQuestions = ()=>
{
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: "What is your engineer's name?",
        },
        {
            type: 'input',
            name: 'engineerID',
            message: "What is your engineer's id?",
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is your engineer's e-mail address?",
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: "What is your team member's GitHub username?",
        },
    ]).then((answers)=>{
        const newEngineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
        createEngineerCard(newEngineer, "Engineer");
        currentTeam.push(newEngineer);
        selectTeammates();
    })
}
const internQuestions = ()=>
{
    inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: "What is your intern's name?",
        },
        {
            type: 'input',
            name: 'internID',
            message: "What is your intern's id?",
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "What is your intern's e-mail address?",
        },
        {
            type: 'input',
            name: 'internSchool',
            message: "What school does your intern go to?",
        },
    ]).then((answers)=>{
        const newIntern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
        createInternCard(newIntern, "Intern");
        currentTeam.push(newIntern);
        selectTeammates();
    })
}

const createManagerCard = manager =>{

    const cardHtml =
  `<div class="card col-3 mb-3">
      <div class="card-body">
          <h1 class="card-title">${manager.getName()}</h1>
          <h4 class="card-subtitle">Manager</h4>
          <ul class="card-text">
              <li><strong>ID #: </strong>${manager.getId()}</li>
              <li><strong>Email: </strong>${manager.getEmail()}</li>
              <li><strong>Office #: </strong>${manager.getOfficeNumber()}</li>
          </ul>
      </div>
  </div>`
  teamCards.push(cardHtml)
};

const createEngineerCard = engineer =>{

    const cardHtml =
  `<div class="card col-3 mb-3">
      <div class="card-body">
          <h1 class="card-title">${engineer.getName()}</h1>
          <h4 class="card-subtitle">Engineer</h4>
          <ul class="card-text">
              <li><strong>ID #: </strong>${engineer.getId()}</li>
              <li><strong>Email: </strong>${engineer.getEmail()}</li>
              <li><strong>Github Username: </strong>${engineer.getGithub()}</li>
          </ul>
      </div>
  </div>`
  teamCards.push(cardHtml)
};

const createInternCard = intern =>{

    const cardHtml =
  `<div class="card col-3 mb-3">
      <div class="card-body">
          <h1 class="card-title">${intern.getName()}</h1>
          <h4 class="card-subtitle">Intern</h4>
          <ul class="card-text">
              <li><strong>ID: </strong>${intern.getId()}</li>
              <li><strong>Email: </strong>${intern.getEmail()}</li>
              <li><strong>School: </strong>${intern.getSchool()}</li>
          </ul>
      </div>
  </div>`
  teamCards.push(cardHtml)
};

//This a function to generate the HTML page based upon the user inputs above
const generateHTML = () => {
    let cards = "";
    teamCards.forEach(element=>{
        cards += element
});
const template = 
`<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="./assets/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>${teamName}</title>
  </head>
  <body>
    <header>
        <h1>Welcome to ${teamName}'s team!</h1>
    </header>  
    <hr>
    <main class="container">
            <div class="row ">
              ${cards}
            </div>
    </main>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="./assets/js/script.js"></script>
  </body>
</html>`

    fs.writeFile(`index.html`, template, (err)=>
    {
        err => console.error(err);
    });
}

// Function call to initialize app
managerQuestions();