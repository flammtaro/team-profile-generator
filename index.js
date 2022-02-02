const inquirer = require(`inquirer`);
const fs = require(`fs`);
const Manager = require("./routes/manager");
const Engineer = require("./routes/engineer");
const Intern = require("./routes/intern");

const teamCards = [];
const currentTeam = [];

//TODO: Add questions that will be used to populate HTML page
const managerQuestions = ()=>
{
    return inquirer.prompt([
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
        {
            type: 'input',
            name: 'managerGithub',
            message: "What is your manager's GitHub username?",
        },
    ]).then((answers)=>{
        const newManager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice, answers.managerGithub);
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

const createManagerCard = ({managerName, managerID, managerEmail, managerOffice, managerGithub}) =>{

    const cardHtml =
  `<div class="card col-3 mb-3">
      <div class="card-body">
          <h1 class="card-title">${managerName}</h1>
          <h4 class="card-subtitle">Manager</h4>
          <ul class="card-text">
              <li><strong>ID #: </strong>${managerID}</li>
              <li><strong>Email: </strong>${managerEmail}</li>
              <li><strong>Office #: </strong>${managerOffice}</li>
              <li><strong>Github Username: </strong>${managerGithub}</li>
          </ul>
      </div>
  </div>`
  teamCards.push(cardHtml)
};

const createEngineerCard = ({engineerName, engineerID, engineerEmail, engineerGithub}) =>{

    const cardHtml =
  `<div class="card col-3 mb-3">
      <div class="card-body">
          <h1 class="card-title">${engineerName}</h1>
          <h4 class="card-subtitle">Engineer</h4>
          <ul class="card-text">
              <li><strong>ID #: </strong>${engineerID}</li>
              <li><strong>Email: </strong>${engineerEmail}</li>
              <li><strong>Github Username: </strong>${engineerGithub}</li>
          </ul>
      </div>
  </div>`
  teamCards.push(cardHtml)
};

const createInternCard = ({internName, internID, internEmail, internSchool}) =>{

    const cardHtml =
  `<div class="card col-3 mb-3">
      <div class="card-body">
          <h1 class="card-title">${internName}</h1>
          <h4 class="card-subtitle">Intern</h4>
          <ul class="card-text">
              <li><strong>ID: </strong>${internID}</li>
              <li><strong>Email: </strong>${internEmail}</li>
              <li><strong>School: </strong>${internSchool}</li>
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
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Team Profile Generator</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h3>Current Team</h3>
    <ul class="list-group">
    <li class="list-group-item">${cards}</li>
    </ul>
  </div>
</div>
</body>
</html>`

    fs.writeFile(`index.html`, template, (err)=>
    {
        err => console.error(err);
    });
}

// Function call to initialize app
managerQuestions();