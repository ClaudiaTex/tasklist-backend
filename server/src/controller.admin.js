const express = require('express');
const model = require('./model');
const usersData = require('./users.json');
const adminData = require('./admin.json');
const { response } = require('express');

//CRUD ADMIN

const createAdmin = (req,res) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    let response4;
    if(model.validEmail(email) && !model.validAdminEmail(email) && model.validPassword(password)){
        adminData.admin.push({
            email,
            name,
            password
        })
        model.saveAdmin(adminData)
        response4 = `Administrador ${email} agregado a la base de datos.`
    }else if(model.validAdminEmail(email)){
        response4 = 'Administrador ya existe.'
    }else if(model.validEmail(email) && !model.validPassword(password)){
        response4 = 'Contraseña incorrecta, debe contener 8 caracteres como minimo, al menos 1 mayuscula, 1 minuscula y 1 caracter especial.'
    }
    res.send(response4)
}

const readAdmin = (req,res) => { 
    const email = req.body.email
    const password = req.body.password
    const adminFind = adminData.admin.find(admin => admin.email === email)
    let response5;
    if(adminFind?.password === password){
        response5 = adminFind
    }else{
        response5 = 'Email o contraseña incorrecta.'
    }
    res.send(response5)
}

const readAllUsers = (req,res) => {
    const users = model.getAllUsers(usersData)
    res.sendFile(users)
}

const readAllAdmin = (req,res) => {
    const admins = model.getAllAdmin(adminData)
    res.sendFile(admins)
}

const updateAdmin = (req,res) => { //si el email es incorrecto al crearlo no se podra modificar
    const email = req.body.email
    const newName = req.body.name
    const newPassword = req.body.password
    const adminIndex = adminData.admin.findIndex(admin => admin.email === email)
    let response6;
    if(adminIndex >= 0){
        if(newName && newPassword && model.validPassword(newPassword)){
            adminData.admin[adminIndex].password = newPassword
            adminData.admin[adminIndex].name = newName
            model.saveAdmin(adminData)
            response6 = `Administrador ${email} modificado.`
        }else if(newName){
            adminData.admin[adminIndex].name = newName
            model.saveAdmin(adminData)
            response6 = `Usuario ${email}: Nombre modificado.`
        }else if(newPassword && model.validPassword(newPassword)){ 
            adminData.users[adminIndex].password = newPassword
            model.saveAdmin(adminData)
            response6 = `Usuario ${email}: Contraseña modificada.`
        }else{
            response6 = 'Contraseña incorrecta, debe contener 8 caracteres como minimo, al menos 1 mayuscula, 1 minuscula y 1 caracter especial.'
        }

    }else{
        response6 = 'Usuario no encontrado.'
    }
    res.send(response6)
}

const deleteAdmin = (req,res) => { //NO VERIFICA CONTRASEÑA
    const email = req.body.email
    const adminIndex = adminData.admin.findIndex(admin => admin.email === email)
    let response7;
    if(adminIndex >= 0){
        adminData.admin.splice(adminIndex, 1)
        model.saveAdmin(adminData)
        response7 = `Administrador ${email} eliminado.`
    }else{
        response7 = 'Administrador no encontrado.'
    }
    res.send(response7)
}

const deleteUserByAdmin = (req,res) => { //borrado logico (borrar totalmente el usuario)
    const email = req.body.email
    const userIndex = usersData.users.findIndex(user => user.email === email)
    let response8;
    if(userIndex >= 0){
        usersData.users.splice(userIndex, 1)
        model.saveUser(usersData)
        response8 = `Usuario ${email} eliminado.`
    }else{
        response8 = 'Usuario no encontrado.'
    }
    res.send(response8)
}



module.exports = {
    createAdmin,
    readAdmin,
    readAllUsers,
    readAllAdmin,
    updateAdmin,
    deleteAdmin,
    deleteUserByAdmin
}