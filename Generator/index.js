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
            type:"input",
            message:userq,
            name:"user"
        },
        {
            type:"list",
            message: githubq,
            name: "github",
            choices: ["Yes","No"]
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
            choices:["MIT","CC","MPL"],
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
${data[license] === "MIT" ? `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)` : ""}
${data[license] === "CC" ? `[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)` : ""}
${data[license] === "MPL" ? `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)` : ""}
    
## Description
${desc}
    
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Installation

${install}
## Usage
${data[github] ?  `![Screenshot of application](https://github.com/${user}/${repo}/blob/main/${screenshot}?raw=true)`:""}
    
${use}

## Credits

${credit}

## License

${license}

## Questions

Questions can be directed to [My Github](https://github.com/${user} "My Github")
`
}

// Function call to initialize app
init();
