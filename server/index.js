const express = require('express');
const mongoose = require('mongoose');

const app = express();

const User = require('./models/user')

// Connect to mongodb
mongoose.connect('mongodb://localhost/test');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/signup", (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        res.status(400).json({
            message: 'Please fill all the fields'
        });
    }

    User.findOne({email})
        .then(savedUser => {
            if(savedUser) {
                return res.status(400).json({error:'User already exists'});
            }
            const user = new User({
                name: name,
                email: email,
                password: password
            });
            user.save()
                .then((user) => {
                    res.json({
                        message: 'User created successfully',
                        user
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        })
})

app.listen(5000, () =>{
    console.log('Server started on port 5000');
});