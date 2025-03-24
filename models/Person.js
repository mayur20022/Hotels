const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})


personSchema.pre('save', async function(next) {
    const person = this;

    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10)
        const HashedPassword = await bcrypt.hash(person.password, salt)
        person.password = HashedPassword;
        next();
    } catch (error) {
        next(error)
    }
})

personSchema.methods.comparePassword = async function(personPass) {
    try {
        const IsMatched = await bcrypt.compare(personPass, this.password)
        return IsMatched;
        
    } catch (error) {
        throw error;
    }
}


const Person = mongoose.model('Person', personSchema);
module.exports = Person;