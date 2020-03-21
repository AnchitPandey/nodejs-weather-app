const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')
const User = require('./models/user')
const Task = require ('./models/task')
app.use(express.json())

app.post('/users', (req, res) => {

 //   res.send ('running now!')
    
    const user = new User(req.body)
    user.save().then(() => {
       res.send (user)
    }).catch((error) => {
        res.status(400)
        res.send (error)
    })
})

app.post('/tasks', (req, res) => {

    const task = new Task(req.body)
    task.save().then(() => {
        res.send (task)
    }).catch((e) => {
        res.status(400)
        res.send (e)
    })

})


app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})


app.get('/users/:id', (req, res) => {

    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user)
            return res.status(400).send()
        res.send(user);
    }).catch((e) => {
        res.status(500).send(e);
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})