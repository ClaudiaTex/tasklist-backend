const express = require('express');
const morgan = require('morgan');
const userController = require('./controller.user.js');
const adminController = require('./controller.admin')


//settings
const app = express();


//server
app.set('port', 3500);

//midleware
app.use(morgan('dev'))
app.use(express.json());


//endpoints(routes)
app.get('/', userController.hello);

// /user
app.post('/createUser', userController.createUser);
app.get('/user', userController.readUser);
app.put('/updateUser', userController.updateUser); // verificacion usuario en /user


// /admin
app.post('/createAdmin', adminController.createAdmin);
app.get('/admin', adminController.readAdmin);
app.get('/admins', adminController.readAllAdmin);
app.put('/updateAdmin', adminController.updateAdmin);
app.delete('/deleteAdmin', adminController.deleteAdmin);

app.get('/users', adminController.readAllUsers);
app.delete('/deleteUserByAdmin', adminController.deleteUserByAdmin);



//port
app.listen(app.get('port'), () =>{
    console.log('Server on port:', app.get('port'))
})