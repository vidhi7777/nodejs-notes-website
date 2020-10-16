const yargs = require('yargs')
const notes = require('./notes')

//add
yargs.command({
    command:'add',
    describe:'Add a note',
    builder:{
        title :{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body :{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

//remove
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title :{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//list
yargs.command({
    command:'list',
    describe:'List notes',
    builder:{
        title :{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(){
        notes.listNotes()
    }
})

//read
yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title :{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

//console.log(yargs.argv)
yargs.parse()