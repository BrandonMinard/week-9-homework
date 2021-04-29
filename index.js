const inquirer = require('inquirer');
const fs = require('fs');
//setting up variables
const writingObj = {}
const promptssss = [
    { prompt: "What's the name of your project?", writeTo: "title", type: "string" },
    { prompt: "Please describe your project.", writeTo: "description", type: "array" },
    { prompt: "Describe how to install and import your project", writeTo: "install", type: "array" },
    { prompt: "Describe how to use your project", writeTo: "usage", type: "array" },
    { prompt: "license", writeTo: "unneeded", type: "special" },
    { prompt: "Please describe how someone could contribute to your project.", writeTo: "contributing", type: "array" },
    { prompt: "Please describe how you tested your project", writeTo: "testing", type: "array" },
    { prompt: "Please input your github username", writeTo: "github", type: "array" },
    { prompt: "Please input your email", writeTo: "email", type: "array" }
]
let indexer = 0

//all my testing data.
const setExampleData = () => {
    writingObj.title = "example title";
    writingObj.description = ["example description", "example description cont", "example description cont"];
    writingObj.usage = ["example usage", "example usage cont", "example usage cont"];
    writingObj.contributing = ["example contributing", "example contributing cont", "example contributing cont"];
    writingObj.install = ["example install", "example install cont", "example install cont"];
    writingObj.testing = ["example.testing", "example.testing cont", "example.testing cont"];
    writingObj.license = "Licensed under the GNU General Public License v3.0, see 'COPYING.txt' for more information"
    writingObj.badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
    writingObj.email = "me@something.net";
    writingObj.github = "RGBLEDeverything";
    console.log(writingObj)
}

//The intro console log
console.log("Welcome to QuickReadme,\n please follow along and answer questions appropriately to automatically generate a professional readme!\n", "If you'd like to insert a linebreak, input '-n'", "If you'd like to skip the current piece of input, just don't enter anything and hit ENTER")

//the full readme creation function, it's bloated.
const makeReadme = () => {
    //rewriting the data I'm capturing to conform to my old makereadme stuff.
    for (const key in writingObj) {
        if (Object.hasOwnProperty.call(writingObj, key)) {
            //getting stuff out of the big written object.
            const element = writingObj[key];
            const eleType = element[0]
            let eleContents = element[1]
            //Make sure it's actually got data
            if (eleContents.length === 0) {
                writingObj[key] = []
                //do stuff if it's type is array, to split on '-n'.
            } else if (eleType === "array") {
                let newContents = [];
                let arr = eleContents.split("-n");
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element.trim().length > 0) {
                        newContents.push(element.trim())
                    }
                }
                writingObj[key] = newContents
                //rewriting for dumb reasons, it's passed in as an array of type and contents, so rewriting it to just contents is far easier.
            } else if (!(key === "license" || key === "badge")) {
                writingObj[key] = eleContents
            }
        }
    }

    //where we put stuff.
    let massiveTextBlob = []


    //writing title long as it's present.
    if (writingObj.title.length > 0) {
        massiveTextBlob.push("# " + writingObj.title + "\n\n")
    }
    //badge
    massiveTextBlob.push(writingObj.badge + "\n\n")
    //description
    if (writingObj.description.length > 0) {
        if (writingObj.description.length === 1) {
            massiveTextBlob.push(writingObj.description[0] + "\n\n")
        } else {
            massiveTextBlob.push(writingObj.description.join("\n\n"))
            massiveTextBlob.push("\n\n")
        }
    }

    //makes the table of contents, the table only lists things that have data.
    massiveTextBlob.push("## Table of Contents\n\n")

    if (writingObj.install.length > 0) {
        massiveTextBlob.push("* [Installation](#installation)\n\n")
    }
    if (writingObj.usage.length > 0) {
        massiveTextBlob.push("* [Usage](#usage)\n\n")
    }

    if (writingObj.license) {
        massiveTextBlob.push("* [License](#license)\n\n")
    }

    if (writingObj.contributing.length > 0) {
        massiveTextBlob.push("* [Contribution](#contribution)\n\n")
    }

    if (writingObj.testing.length > 0) {
        massiveTextBlob.push("* [Testing](#testing)\n\n")
    }

    if (writingObj.email.length > 0 || writingObj.github.length > 0) {
        massiveTextBlob.push("* [Questions](#questions)\n\n")
    }

    //adding actual content sections
    massiveTextBlob = addSection("Installation", writingObj.install, massiveTextBlob)
    massiveTextBlob = addSection("Usage", writingObj.usage, massiveTextBlob)

    //license is special, it always has data.
    if (writingObj.license) {
        massiveTextBlob.push("## License\n\n")
        massiveTextBlob.push(writingObj.license + "\n\n")
    }

    massiveTextBlob = addSection("Contribution", writingObj.contributing, massiveTextBlob)
    massiveTextBlob = addSection("Testing", writingObj.testing, massiveTextBlob)

    //Questions is also special, as it keys off of two pieces of data.
    if (writingObj.email.length > 0 || writingObj.github.length > 0) {
        massiveTextBlob.push("## Questions\n\n")
        if (writingObj.github) {
            massiveTextBlob.push("[Github Profile](https://github.com/" + writingObj.github + ") \n\n")
        }
        if (writingObj.email) {
            massiveTextBlob.push("If you have any other questions about this project you can reach me at " + writingObj.email)
        }
    }

    //write to file on harddisk.
    fs.writeFile("GENREADME.txt", massiveTextBlob.join(""), function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
}

//Just the add content section function.
function addSection(name, contents, massiveTextBlob) {
    if (contents.length > 0) {
        massiveTextBlob.push(`## ${name}\n\n`)
        if (contents.length === 1) {
            massiveTextBlob.push(contents[0] + "\n\n")
        } else {
            massiveTextBlob.push(contents.join("\n\n"))
            massiveTextBlob.push("\n\n")
        }
    }
    return massiveTextBlob
}

//mostly unneeded remnant from early version.
function promptObj(message1) {
    return {
        type: 'input',
        name: 'name',
        message: message1,
    }
}

//the beginning of our recurion
//Recursion is mandatory to make Inquirer play nice.
recursiveInqExp(promptssss[indexer])


function recursiveInqExp(objyThing) {
    //iterate our counter
    indexer++;
    //get data from inquirer
    if (!(objyThing.prompt === "license")) {
        inquirer.prompt(promptObj(objyThing.prompt)
        ).then((answers) => {
            //bad practice.
            writingObj[objyThing.writeTo] = [objyThing.type, answers.name];
        }).finally(() => {
            if (indexer >= promptssss.length) {
                //ending clause
                makeReadme()
                console.log("Thank you, please see this directory for your generated README, it will be called GENREADME.txt. Please copy it to your project's directory and rename the file 'README.MD'.")
                return;
            } else {
                recursiveInqExp(promptssss[indexer])
            }
        });
        //same as above but for the license stuff.
    } else {
        inquirer.prompt([
            {
                type: 'list',
                name: 'licenses',
                message: 'What license would you like to distribute your software under?',
                choices: ['MIT License', 'GNU General Public License v3.0', 'The Unlicense'],
            },
        ]).then(answers => {
            if (answers.licenses === 'MIT License') {
                console.log("Please copy the file 'LICENSE.txt' into the root folder of your project's directory, you will also have to modify with the current year and your full name.")
                writingObj.license = "Licensed under the MIT license, see 'LICENSE.txt' for more information"
                writingObj.badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
            } else if (answers.licenses === 'GNU General Public License v3.0') {
                console.log("Please copy the file 'COPYING.txt' into the root folder of your project's directory.")
                writingObj.license = "Licensed under the GNU General Public License v3.0, see 'COPYING.txt' for more information"
                writingObj.badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
            } else if (answers.licenses === 'The Unlicense') {
                console.log("Please copy the file 'Unlicense.txt' into the root folder of your project's directory.")
                writingObj.license = "Licensed under the Unlicense license, see 'Unlicense.txt' for more information"
                writingObj.badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
            }
        }).finally(() => {
            if (indexer >= promptssss.length) {
                makeReadme()
                console.log("Thank you, please see this directory for your generated README, it will be called GENREADME.txt. Please copy it to your project's directory and rename the file 'README.MD'.")
                return;
            } else {
                recursiveInqExp(promptssss[indexer])
            }
        });
    }
}





