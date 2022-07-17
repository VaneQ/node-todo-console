import { writeFileSync, existsSync, readFileSync } from 'fs'

const file = './data/tasks.json';

const saveData = ( data ) => {

    writeFileSync(file, JSON.stringify(data) )

}

const readData = () => {

    if( !existsSync(file) ) return null;

    const info = readFileSync(file, { encoding: 'utf-8'});

    const data = JSON.parse(info)

    return data;
}

export {
    saveData,
    readData
};