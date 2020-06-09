//jshint esversion:6
const empQuestions = [
    {
        type: "input",
        message: "Employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "Employee ID number?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee email?",
        name: "email"
    },
    {
        type: "list",
        message: "What's their job title?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"]
    }
];

const mgmtQuestion = [
    {
        type: "input",
        message: "What is the office phone number?",
        name: "officeNumber"
    }
];

const engQuestion = [
    {
        type: "input",
        message: "What is the GitHub user-name?",
        name: "github"
    }
];

const internQuestion = [
    {
        type: "input",
        message: "What school do they attend?",
        name: "internSchool"
    }
];


// object literal
module.exports = {
    empQuestions,
    mgmtQuestion,
    engQuestion,
    internQuestion,

};