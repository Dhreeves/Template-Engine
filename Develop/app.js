//jshint esversion:6
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require("./lib/questions");
let html = "";

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function createEmployee() {
    inquirer
        .prompt(questions.empQuestions)
        .then(answers => {
            switch (answers.role) {
                case "Manager":
                    inquirer.prompt(questions.mgmtQuestion).then(async managerAnswers => {
                        const managerData = await new Manager(
                            answers.name,
                            answers.id,
                            answers.email,
                            managerAnswers.officeNumber
                        );
                        readMgnFile(managerData);

                        restartInquirer();
                    });
                    break;

                case "Engineer":
                    inquirer.prompt(questions.engQuestion).then(engineerAnswers => {
                        const engineerData = new Engineer(
                            answers.name,
                            answers.id,
                            answers.email,
                            engineerAnswers.github
                        );
                        readEngFile(engineerData);

                        restartInquirer();
                    });
                    break;

                case "Intern":
                    inquirer
                        .prompt(questions.internQuestion)
                        .then(async internAnswers => {
                            const internData = await new Intern(
                                answers.name,
                                answers.id,
                                answers.email,
                                internAnswers.internSchool
                            );
                            readInternFile(internData);

                            restartInquirer();
                        });
                    break;
            }
        })
        .catch(err => {
            throw err;
        });
}


function readEngFile(engineerData) {
    // console.log(engineerData);

    const icon = `<img src="./Develop/Images/programmer.png" alt="cartoon programmer"/>`;
    fs.readFile("./html/engineer.html", "utf8", function (error, data) {
        // console.log(engineerData.name);
        const newData = data
            .replace("Ename:", engineerData.name)
            .replace("Eicon:", icon)
            .replace("Eid", engineerData.id)
            .replace("Eemail", engineerData.email)
            .replace("Egighub", engineerData.github);

        // read .html, combine them and write file.
        html += newData;

    });
}

function readMgnFile(managerData) {

    const icon = `<img src="./Develop/Images/organization-2.png.png"
    alt="cartoon flowchart" />`;
    fs.readFile("./html/manager.html", "utf8", function (error, data) {
        const newData = data
            .replace("Mname:", managerData.name)
            .replace("Micon:", icon)
            .replace("Mid", managerData.id)
            .replace("Memail", managerData.email)
            .replace("Mphone", managerData.officeNumber);

        html += newData;
    });
}
function readInternFile(internData) {

    const icon = `<img src="./Develop/Images/student.png"
    alt="cartoon student and computer" />`;
    fs.readFile("./html/intern.html", "utf8", function (error, data) {
        const newData = data
            .replace("Iname:", internData.name)
            .replace("Iicon:", icon)
            .replace("Iid", internData.id)
            .replace("Iemail", internData.email)
            .replace("Ischool", internData.internSchool);


        html += newData;
    });
}

function createHTML() {
    fs.readFile("./html/main.html", "utf8", (err, data) => {
        const newData = data.replace("{{html}}", html);

        fs.writeFile("./output/index.html", newData, "utf8", err => {
            if (err) return console.log(err);
        });
        console.log(".html created");
    });
}

module.exports = {};

createEmployee();
