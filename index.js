const inquirer = require(`inquirer`);
const fs = require(`fs`);

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
    ]).then((answers) =>
    {
        selectTeammates();
    })
}
const selectTeammates = ()=>
{
    inquirer.prompt()[
        {
            type: 'choice',
            name: 'teammateChoice',
            message: 'Do you want to add a new teammate?',
            choices: ['Engineer', 'Intern', 'No'],
        }
    ].then((answers)=>
    {
        if(answers.teammateChoice === 'Engineer')
        {
            engineerQuestions();
        }
        else if(answers.teammateChoice ==='Intern')
        {
            internQuestions();
        }
        else if(answers.teammateChoice ==='No')
        {
            generateHTML();
        }
    })
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
        selectTeammates();
    })
}
//This a function to generate the HTML page based upon the user inputs above
const generateHTML = ({managerName, managerID, managerOffice, managerEmail, managerGithub, engineerName, engineerID, engineerEmail, engineerGithub, internName, internID, internEmail, internSchool}) =>
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`;

// TODO: Create a function to initialize app
const init = () =>{
    managerQuestions()
    .then((answers) => fs.writeFileSync('index.html', generateHTML(answers)))
    .then(() => console.log("Successfully created HTML"))
    .catch((err) => console.error(err));

}
// Function call to initialize app
init();