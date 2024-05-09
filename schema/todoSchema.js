import mongoose from 'mongoose'
import {nanoid} from 'nanoid'

// nanoid is to make short unique IDs 

// name is a short title for the task.
// type is to set that it can only be text
// trim is to remove extra white space before and after when saving to the db

// description is for the description of the task -- same props as name

// status is if the task is done or not 
// can only be set to 'completed' or 'pending'
// default is set to 'pending' is the status is not set -- assumed to be pending

// code is a unique ID for the task

// timestamp is a config option that will add timestamp fields
// 'created at' and 'updated at'

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['completed', 'pending'],
        default: 'pending',
        trim: true
    },
    code: {
        type: String,
        required: true,
        default: 'code',
        trim: true
    }
}, {timestamps: true})

// defines a save hook/function which will run every time before a task is saved in db
// nanoid(10) creates a unique 10 char long ID for the spec. task
// Can access any property/field of task with the 'this' keyword
// next() moves on and saves the doc

todoSchema.pre('save', function(next){
    this.code = nanoid(10)
    next()
})

// make todo model with the todoscema
const Todos = mongoose.model('Todos', todoSchema)
export default Todos