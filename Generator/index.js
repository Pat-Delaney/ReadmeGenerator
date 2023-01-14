// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
// TODO: Create an array of questions for user input
const questions = ["What is the name of your project?","Give a short description of your project:","What are the steps to install your project?","Do you have a screenshot in your project on Github?","What is your Github Username?","What is the name of your Repo?","What is the name of your screenshot?","Give some examples of uses for your project:","List your credits:","What license does your project have?"];
const [nameq,descq,installq,githubq,userq,repoq,screenshotq,useq,creditq,licenseq] = questions;
// TODO: Create a function to write README file
function writeToFile(data) {
    const template = generatorFunc(data);
    fs.mkdir('../newFolder', { recursive: true }, (err) => err ? console.log(err):console.log("New Folder Sucessfully created"))
    
    fs.appendFile("../newFolder/ReadMe.md",template,(err)=>
    err ? console.log(err):console.log("Readme successfully created"))
}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt([
        {
            type:"input",
            message: nameq,
            name:"name"
        },
        {
            type:"input",
            message: descq,
            name: "desc"
        },
        {
            type:"input",
            message: installq,
            name: "install"
        },
        {
            type:"list",
            message: githubq,
            name: "github",
            choices: ["Yes","No"]
        },
        {
            type:"input",
            message:userq,
            name:"user",
            when: (answers) => answers.github === 'Yes'
        },
        {
            type:"input",
            message:repoq,
            name:"repo",
            when: (answers) => answers.github === 'Yes'
        },
        {
            type:"input",
            message: screenshotq,
            name: "screenshot",
            when: (answers) => answers.github === 'Yes'
        },
        {
            type:"input",
            message: useq,
            name:"use"
        },
        {
            type: "input",
            message: creditq,
            name: "credit"
        },
        {
            type:"list",
            message:licenseq,
            choices:["MIT","CC","GPL"],
            name:"license"
        }
    ])
    .then((response) =>{
        writeToFile(response)
    })
};

function generatorFunc(data){
    const {name,desc,install,github,user,repo,screenshot,use,credit,license} = data
    return `# ${name}
    
    ## Description
    ${desc}
    
    ## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${install}

## Usage
${data[github] ?  `![Screenshot of application](https://github.com/${user}/${repo}/blob/main/${screenshot}?raw=true)`:""}
${use}

## Credits

${credit}

## License

${license}
`
}

// Function call to initialize app
init();
