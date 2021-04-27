const usersData = require('./users.json');
const adminData = require('./admin.json');
const fs = require('fs');
const path = require('path');


//REGEX
const validEmail = email => {
    const regexEmail = /^[a-z]+@[a-z]{2,8}\.[a-z]{2,3}$/
    return regexEmail.test(email);
}

const validPassword = password => {
    const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    //Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
    return regexPassword.test(password);
}

//EXIST

const existEmail = email => {
    const userFind = usersData.users.find(user => user.email === email)
    return userFind
}

const validAdminEmail = email => {
    const adminFind = adminData.admin.find(admin => admin.email === email)
    return adminFind
}


// SAVE

const saveUser = usersData => {
    fs.writeFile('./src/users.json', JSON.stringify(usersData),
    function (err){
        if(err) {
            console.log('Error!!!!!!')
        }
    })
}

const saveAdmin = adminData => {
    fs.writeFile('./src/admin.json', JSON.stringify(adminData),
    function (err){
        if(err) {
            console.log('Error!!!!!!')
        }
    })
}

//GET ALL

const getAllUsers = usersData => {
    const users = path.join(__dirname, 'users.json')
    return users
}

const getAllAdmin = adminData => {
    const admins = path.join(__dirname, 'admin.json')
    return admins
}

//Create taskID

// for (const user of usersData.users) { 
//     taskIDCounter = 0;
//     for (const task in user.tasks) {
//         if (user.tasks.task){
//             taskIDCounter ++;
//         }else {
//             taskIDCounter
//         }
//     }
//     tasks.taskID = taskIDCounter;
// }


module.exports = {
    validEmail,
    validPassword,
    existEmail,
    validAdminEmail,
    saveUser,
    saveAdmin,
    getAllUsers,
    getAllAdmin
}


