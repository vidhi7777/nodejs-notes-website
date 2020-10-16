const fs = require('fs')
const chalk = require('chalk')

//add note
const addNote = (title,body) => {
    const notes = loadNotes()
    //joh bhi pehele ke notes honge voh sab load notes mai aajayenge i.e. notes variable(array , as it returns JSON.parse()) mai store hojayege
    
    //check duplicate notes
    //const duplicateNotes = notes.filter( function (note) {
    //    return note.title === title 
    //})

    /*const duplicateNotes = notes.filter((note) => note.title === title )

    if(duplicateNotes.length === 0){
        //add notes using push method
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.inverse.green('New Note added!'))
    }
    else{//if duplicate then
        console.log(chalk.inverse.red('Note title taken!'))
    }*/

    
    //optimized way
    //find method of array returns the first match if any otherwise returns undefined

    //debugger
    const duplicateNote = notes.find((note) => note.title === title )

    if(!duplicateNote){
        //add notes using push method
        // we can also use if(duplicateNote === undefined)
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.inverse.green('New Note added!'))
    }
    else{//if duplicate then
        console.log(chalk.inverse.red('Note title taken!'))
    }
    
    saveNotes(notes)

}

//to saveNotes
const saveNotes = (notes) => {
    //stringify the data and save it to the file system
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

//to load notes
const loadNotes = () => {
    //bcoz if notes.json file is not present then we cannot read it and thus it throws error therefore we have to use try and catch method
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        //if the file doesn't exist then it will throw an error so, we will return an empty array(dipicting empty file)
        return []
    }
}

//remove note

const removeNote = (title) => {
    
    const notes = loadNotes()

    const notesToKeep = notes.filter( (note) => note.title !== title )

    if(notes.length === notesToKeep.length){
        console.log(chalk.bgRed('No Note Found!'))
    }else{
        console.log(chalk.bgGreen('Note Removed!'))
    }

    saveNotes(notesToKeep)
}

//list notes

const listNotes =() => {
    const notes = loadNotes()
    console.log(chalk.bold.bgBlue('Listing Notes'))
    notes.forEach( (note) => {
        console.log(note.title)
    })
}

//read notes

const readNote = (title) => {

    const notes = loadNotes()
    const noteToBeRead = notes.find((note) => note.title === title )

    if(!noteToBeRead){
        console.log(chalk.red('Error:note not found!'))
    }
    else{
        console.log(chalk.inverse.green(noteToBeRead.title))
        console.log(noteToBeRead.body)
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
} 