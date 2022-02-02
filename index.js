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
        currentTeam.push(newManager);
        createCard(newManager, "Manager")
        console.log(currentTeam);
        selectTeammates();
    })
}

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
            case "Add Engineer":
                engineerQuestions();
                break;
            case "Add Intern":
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
        createCard(newEngineer, "Engineer");
        team.push(newEngineer);
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
        createCard(newIntern, "Intern");
        team.push(newIntern);
        selectTeammates();
    })
}

const createCard = (person, role) => {
    let extra;
    let info;
    switch (role) {
        case "Manager":
            extra = "Office Number"
            info = person.office
            break;
        case "Engineer":
            extra = "Github"
            info = `<a href="https://github.com/${person.github}" target="_blank">${person.github}</a>`
            break;
        case "Intern":
            extra = "School"
            info = person.school
            break;

    }
    const cardHtml =
  `<div class="card col-3 mb-3">
      <div class="card-body">
          <h5 class="card-title">${person.name}</h5>
          <h6 class="card-subtitle">${role}</h6>
          <ul class="card-text">
              <li>ID: ${person.id}</li>
              <li>Email: <a href="mailto:${person.email}" target="_blank" class="btn btn-primary">${person.email}</a></li>
              <li>${extra}: ${info}</li>
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
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
    <li class="list-group-item">Current Team: ${cards}</li>
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