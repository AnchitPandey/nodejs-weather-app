const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})





/*
// Task table


const task1 = Task({

    description: '        best     '
})


task1.save().then(() => {

    console.log(task1);

}).catch((error) => {
    console.log(error)
})


/*
const task2 = Task({
    description: 'Never give up',
    completed: true
})

task2.save().then(() => {
console.log (task2)
}).catch((error) => {
    console.log(error);
})

*/