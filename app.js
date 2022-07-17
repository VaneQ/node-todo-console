import colors from 'colors'
import { inquirerMenu, inquirerPause, readInput, listTasksDelete, confirm, showListChecklist } from './helpers/inquirer.js'
//import { showMenu, pause } from './helpers/messages.js'
import Task from './models/task.js'
import Tasks from './models/tasks.js'
import {saveData, readData } from './helpers/saveFile.js'

console.clear()

const main = async () => {

    let opt = '';

    const tasks = new Tasks();

    const tasksDB = readData();

    if( tasksDB ){
        tasks.loadTasksFromArray(tasksDB)
    }

    do{

        opt = await inquirerMenu()

        switch (opt) {
            case '1': 
                const desc = await readInput('Description:')
                tasks.createTask(desc)

            break;

            case '2':
                tasks.listShow()
            break;

            case '3':
                tasks.listPendingCompleted()
            break;

            case '4':
                tasks.listPendingCompleted(false)
            break;

            case '5':
                const ids = await showListChecklist( tasks.listArr )
                tasks.toggleCompleted( ids );
            break;

            case '6':
                const id = await listTasksDelete( tasks.listArr )
                const approved = await confirm('Are you sure?');

                if( approved && id !== '0' ){

                    tasks.deleteTask( id );
                    console.log('Task deleted')

                    const newData = [...tasks.listArr];
                    saveData(newData)
                }

        }

        if ( opt !== '0') await inquirerPause()
        
        saveData( tasks.listArr );

    } 
    while ( opt != '0'){

    }
 
}


main();