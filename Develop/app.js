//jshint esversion:6
const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");


// start
async function start() {
    console.log("Let's make an engineering team!");

    // variables
    let teamHTML = "";
    let teamSize;

    // Begining of question loop
    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are on the team?",
            name: "numTeamMem"
        }
    )
        .then((data) => {

            teamSize = data.numTeamMem + 1;
        });

    // Team can not be 0
    if (teamSize === 0) {
        console.log("Start again. You must have someone on the team.");
        return;
    }

    // Question loop
    for (i = 1; i < teamSize; i++) {

        // Global variables set
        let name;
        let id;
        let title;
        let email;

        // Prompts employee questions 
        await inquirer.prompt([
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `what the employee (${i})'s title?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
            .then((data) => {


                name = data.name;
                id = data.id;
                title = data.title;
                email = data.email;
            });

        // Switch case depending on title 
        switch (title) {
            case "Manager":

                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Office Number?",
                        name: "officeNo"
                    }
                ])
                    .then((data) => {


                        const manager = new Manager(name, id, email, data.officeNo);

                        teamMember = fs.readFileSync("templates/manager.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;

            //Intern specific question
            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school is your Intern attending?",
                        name: "school"
                    }
                ])
                    .then((data) => {
                        const intern = new Intern(name, id, email, data.school);
                        teamMember = fs.readFileSync("templates/intern.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;

            //Engineer specific question
            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "github"
                    }
                ])
                    .then((data) => {
                        const engineer = new Engineer(name, id, email, data.github);
                        teamMember = fs.readFileSync("templates/engineer.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;

        }

    }

    // Reads main.html 
    const mainHTML = fs.readFileSync("templates/main.html");

    teamHTML = eval('`' + mainHTML + '`');

    //  new team.html file
    fs.writeFile("output/team.html", teamHTML, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });

}


start();
