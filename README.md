# 💻 HackHub

HackHub es una plataforma administrativa para una escuela de programación. Esta aplicación fue desarrollada como parte del proyecto final del curso de Angular en CoderHouse. La plataforma permite gestionar estudiantes y cursos, así como sus inscripciones ofreciendo funcionalidades avanzadas como CRUD completo, roles y permisos, y protección de rutas.

## 📝 Descripción

HackHub es una aplicación web desarrollada con Angular para el frontend y JSON Server para simular el backend. La plataforma está diseñada para permitir a los administradores gestionar la información de los estudiantes y los cursos, incluyendo la creación, edición y eliminación de registros.

## ✅ Funcionalidades

- **Gestión de Estudiantes, Cursos e Inscripciones:** CRUD completo para entidades de estudiantes y cursos.
- **Relaciones Many-to-Many:** Relación entre estudiantes y cursos.
- **Roles y Permisos:** Diferentes funciones disponibles según el rol del usuario.
- **Protección de Rutas:** Implementación de guards para proteger las rutas.
- **Alertas:** Uso de SweetAlert para mostrar alertas interactivas.
- **Material Design:** Integración con Angular Material para un diseño moderno y responsivo.
- **Estado Global:** Uso de Redux para manejar el estado del login de usuario.

## 💡 Tecnologías Utilizadas

- **Frontend:** Angular, Angular Material, Redux, SweetAlert
- **Backend:** JSON Server (para simular las peticiones HTTP)
- **Lenguajes:** TypeScript
- **Herramientas de Desarrollo:** Git, GitHub

## 🔨 Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/GwynethS/HackHub.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd hackhub
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Ejecuta el servidor JSON:
    ```bash
    json-server --watch db.json
    ```
5. Inicia la aplicación Angular:
    ```bash
    ng serve
    ```
6. Abre tu navegador y ve a `http://localhost:4200`.

## 👩🏻‍💻 Uso

1. Inicia sesión con las credenciales proporcionadas.
```
Admin:
  - Email: gwyneth@gmail.com
  - Password: 12345678
User:
  - Email: alexandra@gmail.com
  - Password: 12345678
```
2. Navega a las diferentes secciones de la plataforma para gestionar estudiantes y cursos.
3. Usa las funcionalidades CRUD para agregar, editar o eliminar registros.

## 📸 Ejecución
Formulario de *login*

![Formulario de inicio de sesión](./src/assets/img/execution/auth.png)

Página de Inicio (*vista de administrador*)

![Página de inicio](./src/assets/img/execution/home.png)

Página de Inicio (*vista de usuario*)

![Página de inicio](./src/assets/img/execution/home-user.png)

Página de Usuarios (*vista de administrador*)

![Página de usuarios](./src/assets/img/execution/users-list.png)

Formulario de Usuarios (*vista de administrador*)

![Formulario de usuarios](./src/assets/img/execution/users-form.png)

Eliminar Usuario (*vista de administrador*)

![Acción de eliminar usuario](./src/assets/img/execution/users-delete.png)

Página de Estudiantes (*vista de administrador*)

![Página de estudiantes](./src/assets/img/execution/students-list.png)

Formulario de Estudiantes (*vista de administrador*)

![Formulario de estudiantes](./src/assets/img/execution/students-form.png)

Página de Estudiantes (*vista de usuario*)

![Página de estudiantes](./src/assets/img/execution/students-list-user.png)

Página de Información de un Estudiante

![Página de información de un estudiante](./src/assets/img/execution/students-detail.png)

Página de Cursos (*vista de administrador*)

![Página de cursos](./src/assets/img/execution/courses-list.png)

Formulario de Cursos (*vista de administrador*)

![Formulario de cursos](./src/assets/img/execution/courses-form.png)

Página de Cursos (*vista de usuario*)

![Página de cursos](./src/assets/img/execution/courses-list-user.png)

Página de Información de un Curso

![Página de información de un curso](./src/assets/img/execution/courses-detail.png)

Página de Inscripciones

![Página de inscripciones](./src/assets/img/execution/enrollments-list.png)

Formulario de Inscripciones

![Formulario de inscripciones](./src/assets/img/execution/enrollments-form.png)

Página 404

![Página 404](./src/assets/img/execution/not-found.png)


