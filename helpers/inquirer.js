import inquirer from 'inquirer';
import colors from 'colors'

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: '1',
                name: `${'1'.blue}. Create new task`,
            },
            {
                value: '2',
                name: `${'2'.blue}. List tasks`,
            },
            {
                value: '3',
                name: `${'3'.blue}. List completed tasks`,
            },
            {
                value: '4',
                name: `${'4'.blue}. List pending tasks`,
            },
            {
                value: '5',
                name: `${'5'.blue}. Mark a task as completed`,
            },
            {
                value: '6',
                name: `${'6'.blue}. Delete a task`,
            },
            {
                value: '0',
                name: `${'0'.blue}. Exit`,
            },
        ]
    }
]

const inquirerMenu = async() => {

    console.log('====================='.blue)
    console.log('   Choose an option  '.yellow)
    console.log('=====================\n'.blue)

    const { option } = await inquirer.prompt(questions)

    return option
}

const inquirerPause = async() => {

    const pauseMessage = [
        {
            type: 'input',
            name: 'option',
            message: `Press ${ 'ENTER'.blue } to continue`,
        }
    ]

    console.log('\n')
    const { option } = await inquirer.prompt(pauseMessage)

    return option;
    
}

const readInput = async( message ) => {

    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0){
                    return 'Please, type a valid option'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listTasksDelete = async( tasks = [] ) => {

    const choices = tasks.map( (task, i) => {

        const id = `${i + 1}.`.blue

        return {
            value: task.id,
            name: `${id} ${task.desc}`
        }

    })

    choices.unshift({
        value: '0',
        name: '0.'.blue + ' Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);

    return id;

}

const showListChecklist = async( tasks = [] ) => {

    const choices = tasks.map( (task, i) => {

        const id = `${i + 1}.`.blue

        return {
            value: task.id,
            name: `${ id } ${ task.desc }`,
            checked: ( task.completedOn ) ? true : false,
        }

    })

    choices.unshift({
        value: '0',
        name: '0.'.blue + ' Cancelar'
    })

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select to delete',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions);

    return ids;
}

const confirm = async ( message ) => {

    const question = 
    {
        type: 'confirm',
        name: 'ok',
        message
    }

    const { ok } = await inquirer.prompt(question)

    return ok;

}


export {
    inquirerMenu,
    inquirerPause,
    readInput,
    listTasksDelete,
    confirm,
    showListChecklist
}