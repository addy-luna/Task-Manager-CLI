import inquirer from "inquirer";
import { connectDB, disconnectDB } from '../db/connectDB.js'
import Todos from "../schema/todoSchema.js";
import ora from "ora";
import chalk from "chalk";

/* 
    - input() uses inquirer to ask user for task name and details.
    The answer will return as an object.
    - inquirer.prompt() is a method in the inquirer package that asks question and waits for responses.
    - By providing an array of question objects each containing details like a message to display the user
    and type of question. 
    - the function returns a Promise, so we use 'await' to wait for users answers which returns an object.
*/



async function input(){
    const answers = await inquirer.prompt([
        { name: 'name', message: 'Enter name of the task:', type: 'input' },
        { name: 'detail', message: 'Enter the details of the task:', type: 'input' },
    ])

    return answers
}

/* 
    askQuestions sets a loop that asks for tasks until user decides to stop 
*/

const askQuestions = async() => {

    const todoArray = []
    let loop = false

    do{
        const userRes = await input()
        todoArray.push(userRes)
        const confirmQ = await inquirer.prompt([{ name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm' }])
        if(confirmQ.confirm){
            loop = true
        } else {
            loop = false
        }
    } while(loop)

    return todoArray
}

/* 
    the addTask() function gathers the array of tasks and assigning it to userResponse() variable. 
    Then the function will connect to the database using connectDB(). 
    Ora enables a spinner to show the task creation process.
*/ 

export default async function addTask() {
    try {
        // calling askQuestions() to get array of todo's
        const userResponse = await askQuestions()

        // connecting to the database
        await connectDB()

        // Displaying a spinner with the following text message using ora 
        let spinner = ora('Creating the todos...').start()

        // looping over every todo in the userResponse array
        // and saving each todo in the database
        for(let i=0; i<userResponse.length; i++){
            const response = userResponse[i]
            await Todos.create(response)
        }

        // Stopping the spinner and displaying the success message
        spinner.stop()
        console.log(
            chalk.greenBright('Created the todos!')
        )

        // disconnecting the database
        await disconnectDB()
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}

// try...catch block will handle any errors that arise