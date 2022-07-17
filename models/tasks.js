import Task from './task.js'
import colors from 'colors'

class Tasks {

    _list = {}

    get listArr (){

        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key]
            list.push( task )
        })

        return list;

    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '' ){

        if( this._list[id] ){
            delete this._list[id]
        }
    }

    loadTasksFromArray( tasks = [] ){

        tasks.forEach( task => {
            this._list[task.id] = task; 
        })

    }

    createTask( desc = '' ){

        const task = new Task(desc);

        this._list[task.id] = task;

    }

    listShow(){

        console.log('')

        let list = [];

        this.listArr.forEach( (task, index ) => {
            const { desc, completedOn } = task;
            const id = `${index + 1}`.blue ;
            const status = completedOn ? 'Completada'.green : 'Pendiente'.red

            console.log(`${id} ${desc} :: ${status}`)

        })

    }

    listPendingCompleted( completed = true ){

        console.log('')

        this.listArr.forEach( (task, index ) => {

            const { desc, completedOn } = task;

            const id = `${index + 1}`.blue ;
            const status = completedOn ? 'Completada'.green : 'Pendiente'.red

            if( completed && completedOn ){
                console.log(`${id}.${desc} :: ${completedOn}`.blue)
            }

            if( !completed && !completedOn ){
                console.log(`${id}.${desc} :: ${status}`)
            }

        })
    }

    toggleCompleted( ids = [] ){

        ids.forEach( id => {

            const task = this._list[id];

            if( !task.completedOn){
                task.completedOn = new Date().toISOString();
            }

        })

        this.listArr.forEach( task => {
            if( !ids.includes(task.id)) task.completedOn = null
        })
    }
}


export default Tasks