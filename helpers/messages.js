import colors from 'colors'
import readline from 'readline'


const showMenu = () => {

    return new Promise( resolve => {

        console.clear()
        console.log('====================='.blue)
        console.log('   Choose an option  '.yellow)
        console.log('=====================\n'.blue)

        console.log(`${'1.'.blue} Create new task`);
        console.log(`${'2.'.blue} List all task `);
        console.log(`${'3.'.blue} List completed tasks`);
        console.log(`${'4.'.blue} List pending tasks`);
        console.log(`${'5.'.blue} Mark a task as completed`);
        console.log(`${'6.'.blue} Delete a task`);
        console.log(`${'0.'.blue} Exit\n`);

        const menuInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        menuInterface.question('Select an option: ', (opt) => {
            menuInterface.close();
            resolve(opt)
        })

    })
    

}

const pause = () => {

    return new Promise( resolve => {
        
        const pauseInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        pauseInterface.question(`\nPress ${ 'ENTER'.blue} to continue`, (opt) => {
            pauseInterface.close();
            resolve(opt)
        })

    })

}

export {
    showMenu,
    pause
}

