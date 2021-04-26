const express = require('express');
const model = require('./model');
const usersData = require('./users.json')

const hello = (req,res) => {
    res.send('hello world!')
}
const tasks = [];

//CRUD USER

const createUser = (req,res) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    let response;
    if(model.validEmail(email) && model.validPassword(password) && !model.existEmail(email)) {
        usersData.users.push({
            email,
            name,
            password,
            tasks
        })
        model.saveUser(usersData);
        response = `Usuario ${name} agregado.`
    }else if(model.existEmail(email)){
        response = `Usuario ya existe. Pruebe con otro email.`
    }else if(!model.validEmail(email)){
        response = `Email incorrecto.`
    }else if(!model.validPassword(password)){
        response = `Contraseña incorrecta, debe contener 8 caracteres como minimo, al menos 1 mayuscula, 1 minuscula y 1 caracter especial.`
    }
    res.send(response)
}

const readUser = (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const userFind = usersData.users.find(user => user.email === email)
    let response2;
    if(userFind?.password === password) {
        response2 = userFind
    } else {
        response2 = 'Email o cotraseña incorrecto.'
    }
    res.send(response2)
}

const updateUser = (req,res) => { //si el email es incorrecto al crearlo no se podra modificar
    const email = req.body.email
    const newName = req.body.name
    const newPassword = req.body.password
    const userIndex = usersData.users.findIndex(user => user.email === email)
    let response3;
    if(userIndex >= 0){
        if(newName && newPassword && model.validPassword(newPassword)){
            usersData.users[userIndex].password = newPassword
            usersData.users[userIndex].name = newName
            model.saveUser(usersData)
            response3 = `Usuario ${email} modificado.`
        }else if(newName){
            usersData.users[userIndex].name = newName
            model.saveUser(usersData)
            response3 = `Usuario ${email}: Nombre modificado.`
        }else if(newPassword && model.validPassword(newPassword)){ 
            usersData.users[userIndex].password = newPassword
            model.saveUser(usersData)
            response3 = `Usuario ${email}: Contraseña modificada.`
        }else{
            response3 = 'Contraseña incorrecta, debe contener 8 caracteres como minimo, al menos 1 mayuscula, 1 minuscula y 1 caracter especial.'
        }

    }else{
        response3 = 'Usuario no encontrado.'
    }
    res.send(response3)
}





//CRUD TASK USER

const createTask = (req,res) => { //crear nuevo objeto(task) anidado dentro del user
    const title = req.body.title
    const description = req.body.description
    const flag = req.body.flag //is_public o no
    const creationDate = new Date().toISOString() //otra opcion new Date().toString()
    const updateDate = new Date().toISOString()

    usersData.users.user.tasks.push({
        taskID,
        title,
        description,
        flag,
        creationDate,
        updateDate

    })

}


const readTask = (req,res) => {
    //TODO
}

const updateTask = (req,res) => {
    //TODO
}

const deleteTask = (req,res) => {
    //TODO
}




module.exports = {
    hello,
    createUser,
    createTask,
    readUser,
    readTask,
    updateUser,
    updateTask,
    deleteTask
}