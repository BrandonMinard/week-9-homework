const inquirer = require('inquirer');
const fs = require('fs');
const licenses = require("./licenses")


// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README


//I NEED AN INPUT END SYMBOL
//WILL BE REMOVED WHEN WRITING TO FILE
//BUT WILL ALLOW ERROR TO BE ABLE TO REMOVE PREVIOUS INPUT WITHOUT AFFECTING ANYTHING ELSE.
let readMeObj = {
    title: "",
    //done
    description: [],
    //toc gets autogenned
    toc: "",
    //continue with this
    //may need particular rules to get it saving correctly.
    install: [],
    usage: [],
    license: "",
    contributing: [],
    tests: [],
    questions: [],
    github: '',
    email: '',
    badge: ''
}


const setExampleData = () => {
    readMeObj.title = "example title";
    readMeObj.description = ["example description", "example description cont", "example description cont"];
    readMeObj.usage = ["example usage", "example usage cont", "example usage cont"];
    readMeObj.contributing = ["example contributing", "example contributing cont", "example contributing cont"];
    readMeObj.install = ["example install", "example install cont", "example install cont"];
    readMeObj.tests = ["example tests", "example tests cont", "example tests cont"];
    readMeObj.license = "Licensed under the GNU General Public License v3.0, see 'COPYING.txt' for more information"
    readMeObj.badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
    readMeObj.email = "me@something.net";
    readMeObj.github = "RGBLEDeverything";
    console.log(readMeObj)
}

const makeReadme = () => {
    //REMOVE THIS EVENTUALLY
    // setExampleData()
    // console.log("anything")
    // console.log(readMeObj)
    let massiveTextBlob = []
    //title
    // let string = "# " + readMeObj.title + "\n\n"
    // console.log(readMeObj.title)
    // console.log(readMeObj)
    massiveTextBlob.push("# " + readMeObj.title + "\n\n")
    //badge
    massiveTextBlob.push(readMeObj.badge + "\n\n")
    //description
    if (readMeObj.description) {
        if (readMeObj.description.length === 1) {
            massiveTextBlob.push(readMeObj.description[0] + "\n\n")
        } else {
            massiveTextBlob.push(readMeObj.description.join("\n\n"))
            massiveTextBlob.push("\n\n")
        }
    }

    //make toc later
    //ToC
    massiveTextBlob.push("## Table of Contents\n\n")

    if (readMeObj.install) {
        massiveTextBlob.push("* [Installation](#installation)\n\n")
    }
    if (readMeObj.usage) {
        massiveTextBlob.push("* [Usage](#usage)\n\n")
    }

    if (readMeObj.license) {
        massiveTextBlob.push("* [License](#license)\n\n")
    }
    if (readMeObj.contributing) {
        massiveTextBlob.push("* [Contribution](#contribution)\n\n")
    }

    if (readMeObj.tests) {
        massiveTextBlob.push("* [Testing](#testing)\n\n")
    }

    if (readMeObj.email || readMeObj.github) {
        massiveTextBlob.push("* [Questions](#questions)\n\n")
    }
    //installation

    if (readMeObj.install) {
        massiveTextBlob.push("## Installation\n\n")
        if (readMeObj.install.length === 1) {
            massiveTextBlob.push(readMeObj.install[0] + "\n\n")
        } else {
            massiveTextBlob.push(readMeObj.install.join("\n\n"))
            massiveTextBlob.push("\n\n")
        }
    }

    //usage

    if (readMeObj.usage) {
        massiveTextBlob.push("## Usage\n\n")
        if (readMeObj.usage.length === 1) {
            massiveTextBlob.push(readMeObj.usage[0] + "\n\n")
        } else {
            massiveTextBlob.push(readMeObj.usage.join("\n\n"))
            massiveTextBlob.push("\n\n")
        }
    }
    //license
    if (readMeObj.license) {
        massiveTextBlob.push("## License\n\n")
        massiveTextBlob.push(readMeObj.license + "\n\n")
    }
    //contribution
    if (readMeObj.contributing) {
        massiveTextBlob.push("## Contribution\n\n")
        if (readMeObj.contributing.length === 1) {
            massiveTextBlob.push(readMeObj.contributing[0] + "\n\n")
        } else {
            massiveTextBlob.push(readMeObj.contributing.join("\n\n"))
            massiveTextBlob.push("\n\n")
        }
    }
    //tests
    if (readMeObj.tests) {
        massiveTextBlob.push("## Testing\n\n")
        if (readMeObj.tests.length === 1) {
            massiveTextBlob.push(readMeObj.tests[0] + "\n\n")
        } else {
            massiveTextBlob.push(readMeObj.tests.join("\n\n"))
            massiveTextBlob.push("\n\n")
        }
    }
    //questions
    if (readMeObj.email || readMeObj.github) {
        massiveTextBlob.push("## Questions\n\n")
        if (readMeObj.github) {
            massiveTextBlob.push("[Github Profile](https://github.com/" + readMeObj.github + ") \n\n")
        }
        if (readMeObj.email) {
            massiveTextBlob.push("If you have any other questions about this project you can reach me at " + readMeObj.email)
        }
    }
    // console.log(massiveTextBlob)
    fs.writeFile("genreadMe.txt", massiveTextBlob.join(""), function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });

    //console.log(massiveTextBlob)
    //title is '# TITLE\n\notherstuff'
    //Main pattern is '## SECTION NAME\n\nsectionInfo'

    //TOC is like this, #thing is just the section name in lowercase.
    //  * [Installation](#installation)
    // * [Usage](#usage)
    // * [Credits](#credits)
    // * [License](#license)
}
// makeReadme()


//so can't do this with a single inquire, because you can't do multi-line inputs all that easily because reasons.
//So instead I'm thinking have an escape key, and when you press enter, it just inquires again as long as the escape key wasn't the only entered key.
//Also can have a key to re-input an answer or something.
// console.log("Welcome to QuickReadme,\n please follow along and answer questions appropriately to automatically generate a professional readme!\n", "If you feel you made an error in your input,\n please input 'error' in order to redo the previous input.\n If you'd like to skip the current piece of input, type 'skip'")
console.log("Welcome to QuickReadme,\n please follow along and answer questions appropriately to automatically generate a professional readme!\n", "If you'd like to insert a linebreak, input '-n'", "If you'd like to skip the current piece of input, just don't enter anything and hit ENTER")

function promptObj(message1) {
    return {
        type: 'input',
        name: 'name',
        message: message1,
    }
}

function splitAnswerAndMod(answer) {
    let answerThing = answer.trim();
    let modifier = answerThing.slice(-2).toLowerCase();
    if (modifier === "-n") {
        answerThing = answerThing.slice(0, -2).trim();
    }
    return [answerThing, modifier]
}

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
recursiveInqExp(promptssss[indexer])

//? chump ? What is your project called?

function recursiveInqExp(objyThing) {
    indexer++;
    if (!(objyThing.prompt === "license")) {
        inquirer.prompt(promptObj(objyThing.prompt)
        ).then((answers) => {
            writingObj[objyThing.writeTo] = answers.name;
        }).finally(() => {
            if (indexer >= promptssss.length) {
                console.log(writingObj)
                return;
            } else {
                recursiveInqExp(promptssss[indexer])
            }
        });
    } else {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'licenses',
                    message: 'What license would you like to distribute your software under?',
                    choices: ['MIT License', 'GNU General Public License v3.0', 'The Unlicense'],
                },
            ])
            .then(answers => {
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
                    console.log(writingObj)
                    return;
                } else {
                    recursiveInqExp(promptssss[indexer])
                }
            });;
    }


}



// gets name, then starts desription process.
const init = () => {
    inquirer.prompt(promptObj('What is your project called?')
    ).then((answers) => {
        readMeObj.title = answers.name;
    }).finally(() => {
        descriptionStart()
    });
};
// uncomment this
// init()


//Can't methodize, inquirer is far to fragile.

const descriptionStart = () => {
    inquirer.prompt(promptObj("Please describe your project. If it is a multi-line description, add -n to the end of the line, and you'll have the option to input another line. enter 'skip' to skip this section, and 'error' to redo the previous entry.")
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)
        if (answer === "skip") {
            usageStart()
            return
        }
        if (answer === "error") {
            init()
            return
        }
        readMeObj.description.push(answer);
        console.log(readMeObj);
        if (modifier === "-n") {
            descriptionCont()
        } else {
            usageStart()
        }
    });
};

//leads into description cont if error, description cont if -n,
//or usagestart
const descriptionCont = (prompt) => {
    let promptLine = prompt || "Continue your description."
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)
        if (answer === "error") {
            if (readMeObj.description.length === 0) {
                descriptionCont("No entry to delete")
                return
            }
            readMeObj.description.pop()
            descriptionCont("Previous entry deleted, please continue.")
            //????
            return
        }
        if (answer === "skip") {
            usageStart()
            return
        }
        readMeObj.description.push(answer);
        if (modifier === "-n") {
            descriptionCont()
        } else {
            usageStart()
        }
    });
};

//goes back to description cont if error.
//goes on to usagecont if -n
//goes on to instillationstart else.
const usageStart = (prompt) => {
    let promptLine = prompt || "Write out how to import your project. Add '-n' to the end if you'd like to add examples to your usage section"
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)
        if (answer === "skip") {
            installationStart()
            return
        }
        if (answer === "error") {
            if (readMeObj.description.length === 0) {
                usageStart("No entry to delete")
                return
            }
            readMeObj.description.pop()
            descriptionCont("Previous entry deleted, please continue with your description.")
            //????
            return
        }
        readMeObj.usage.push(answer);
        console.log(readMeObj);
        if (modifier === "-n") {
            usageCont()
        } else {
            installationStart()
        }
    });
}

const usageCont = (prompt) => {
    let promptLine = prompt || "Continue adding examples! End with '-n' if there's more examples you'd like to add!"
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)

        if (answer === "error") {
            if (readMeObj.usage.length === 0) {
                usageCont("No entry to delete")
                return
            }
            readMeObj.usage.pop()
            usageCont("Previous entry deleted, please continue with Usage.")
            return
        }

        if (answer === "skip") {
            installationStart()
            return
        }

        readMeObj.usage.push(answer);
        if (modifier === "-n") {
            usageCont()
        } else {
            installationStart()
        }
    });
};

const installationStart = (prompt) => {
    let promptLine = prompt || "Write out how to install your project. Add -n to the end if you'd like to add examples to your install section"
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)
        if (answer === "skip") {
            licenseSelection()
            return
        }

        if (answer === "error") {
            if (readMeObj.usage.length === 0) {
                installationStart("No entry to delete")
                return
            }
            readMeObj.usage.pop()
            usageCont("Previous entry deleted, please continue with Usage.")
            return
        }

        readMeObj.install.push(answer);
        console.log(readMeObj);
        if (modifier === "-n") {
            installationCont()
        } else {
            licenseSelection()
        }
    });
}

const installationCont = (prompt) => {
    let promptLine = prompt || "Continue adding examples! End with '-n' if there's more examples you'd like to add!"
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)

        if (answer === "error") {
            if (readMeObj.install.length === 0) {
                installationCont("No entry to delete")
                return
            }
            readMeObj.install.pop()
            installationCont("Previous entry deleted, please continue with your installation examples..")
            //????
            return
        }
        if (answer === "skip") {
            licenseSelection()
            return
        }
        readMeObj.install.push(answer);
        if (modifier === "-n") {
            installationCont("Please continue with your installation examples.")
        } else {
            licenseSelection()
        }
    });
};

const licenseSelection = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'licenses',
                message: 'What license would you like to distribute your software under?',
                choices: ['MIT License', 'GNU General Public License v3.0', 'The Unlicense'],
            },
        ])
        .then(answers => {
            if (answers.licenses === 'MIT License') {
                console.log("Please copy the file 'LICENSE.txt' into the root folder of your project's directory, you will also have to modify with the current year and your full name.")
                readMeObj.license = "Licensed under the MIT license, see 'LICENSE.txt' for more information"
                readMeObj.badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
            } else if (answers.licenses === 'GNU General Public License v3.0') {
                console.log("Please copy the file 'COPYING.txt' into the root folder of your project's directory.")
                readMeObj.license = "Licensed under the GNU General Public License v3.0, see 'COPYING.txt' for more information"
                readMeObj.badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
            } else if (answers.licenses === 'The Unlicense') {
                console.log("Please copy the file 'Unlicense.txt' into the root folder of your project's directory.")
                readMeObj.license = "Licensed under the Unlicense license, see 'Unlicense.txt' for more information"
                readMeObj.badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
            }

            contributionStart()
        });
}

const contributionStart = (prompt) => {
    let promptLine = prompt || "Write out how to contribute to this project. End with -n if you'd like a new line, or to add more info"
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)
        if (answer === "skip") {
            testingStart()
            return
        }

        if (answer === "error") {
            licenseSelection()
            return
        }

        readMeObj.contributing.push(answer);
        console.log(readMeObj);
        if (modifier === "-n") {
            contributionCont()
        } else {
            testingStart()
        }
    });
}

const contributionCont = (prompt) => {
    let promptLine = prompt || "Continue adding information! End with '-n' if there's more you'd like to add!"
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)

        if (answer === "error") {
            if (readMeObj.contributing.length === 0) {
                contributionCont("No entry to delete")
                return
            }
            readMeObj.contributing.pop()
            contributionCont("Previous entry deleted, please continue with your contribution examples..")
            //????
            return
        }
        if (answer === "skip") {
            testingStart()
            return
        }
        readMeObj.contributing.push(answer);
        if (modifier === "-n") {
            contributionCont("Please continue with your contribution examples.")
        } else {
            testingStart()
        }
    });
};

const testingStart = (prompt) => {
    let promptLine = prompt || "Write out how you tested this project, and what tools were used."
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)
        if (answer === "skip") {
            questionsStart()
            return
        }
        if (answer === "error") {
            if (readMeObj.contributing.length === 0) {
                contributionCont("No entry to delete")
                return
            }
            readMeObj.contributing.pop()
            contributionCont("Previous entry deleted, please continue with your contribution examples.")
            //????
            return
        }

        readMeObj.tests.push(answer);
        console.log(readMeObj);
        if (modifier === "-n") {
            testingCont()
        } else {
            questionsStart()
        }
    });
}

const testingCont = (prompt) => {
    let promptLine = prompt || "Continue adding information for testing! End with '-n' if there's more you'd like to add!"
    inquirer.prompt(promptObj(promptLine)
    ).then((answers) => {
        let [answer, modifier] = splitAnswerAndMod(answers.name)

        if (answer === "error") {
            if (readMeObj.tests.length === 0) {
                testingCont("No entry to delete")
                return
            }
            readMeObj.tests.pop()
            testingCont("Previous entry deleted, please continue with your testing information..")
            //????
            return
        }
        if (answer === "skip") {
            questionsStart()
            return
        }
        readMeObj.tests.push(answer);
        if (modifier === "-n") {
            testingCont("Please continue with your testing information.")
        } else {
            questionsStart()
        }
    });
};

const questionsStart = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'username',
        message: "Please input your github username so that it can be added to the 'Questions' section",
    }, {
        type: 'input',
        name: 'email',
        message: "Please input your email so that it can be added to the 'Questions' section, along with how to reach you if someone has questions about this project.",
    }]).then((answers) => {
        if (answers.username) {
            readMeObj.github = answers.username
        }
        if (answers.email) {
            readMeObj.email = answers.email
        }

        makeReadme();
        console.log("Thank you, please see this directory for your generated README, it will be called GENREADME.txt. Please copy it to your project's directory and rename the file 'README.MD'.")
    })
}

