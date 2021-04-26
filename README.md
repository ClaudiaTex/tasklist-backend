Desarrollar e implementar una API para el manejo de tareas, la API deberá gestionar el sistema de registro de usuarios y controlar el acceso a las rutas utilizando para ello lo visto en clases (sesiones o JWT). 

 

Se deberá implementar un sistema de registro, el cual asignará un rol a cada nuevo usuario y a partir de ese rol unos permisos de acceso a la rutas. Se contemplan dos (2) tipos de roles ADMIN y USER.




USER:

Un usuario podrá crear, modificar y eliminar tareas. Una tarea consta de un título, una descripción, una bandera is_public, una fecha de creación y una fecha de actualización.


Si una tarea es pública podrá ser visualizada por cualquier usuario aunque no esté registrado en el sistema, en caso contrario únicamente podrá ser visualizada por el usuario que la creó.

ADMIN:

El ADMIN tendrá acceso al listado de todos los usuarios del sistema y podrá eliminarlos, cuando se elimina un usuario también se deberá eliminar todas las tareas vinculadas a ese usuario.