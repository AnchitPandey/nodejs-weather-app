const mongoose = require('mongoose')
const validator = require ('validator')

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: true,
        validate(value) {
            if (value.includes('password'))
                throw new Error('Do not include password in your field')
        }
    }
})

module.exports = User