# Trabajo-Practico-Labo-IV
Trabajo práctico obligatorio para la aprobación de la materia Laboratorio de computación IV del 4to cuatrimestre de TUP.

## Sprint 1 - Armado del proyecto
- Subido a hosting WEB.
- Componente de Login.
- Componente de Home.
- Componente “Quién Soy”
- Favicon

### Implementaciones realizadas:
- Hosting web implementado.
- Componente de Login funcional utilizando firebase auth y swal para la comunicación usuario - cliente.
- Componente Home implementado.
- Componente quién soy implementado con mini biografía + foto.
- Favicon implementado.
- Adicionalmente, agregue un header para navegar entre las distintas rutas
- Identificación y cierre de sesión implementado en el header 
- Script npm run build-host para levantar el servidor rápidamente

## Sprint 2 - 
1. Componente Home
    - Tiene que ser el componente principal, el cual tendrá los accesos a los diferentes juegos y
      listados.
    - Si el usuario está logueado, mostrar información del mismo y botón de Log Out. (No se debe
    mostrar los botones de Registro y Login una vez que el usuario está logueado).

2. Componente Login
    - Tiene que tener la validación de usuario contra firebase
    - Registrar el log de ese usuario en firebase.
    - En caso de que sea exitoso registrar:
      . Usuario
      . Fecha de ingreso
    - En caso de inicio de sesión exitoso debe rutear a la home.
    - Debe tener botones de acceso rápido.
      . Estos botones tienen que completar los campos de email y contraseña con un usuario
        válido que al presionar el botón ingresar acceda a la home.
3. Componente Registro
    - Tiene que generar un nuevo usuario y redirigir al home al crearlo exitosamente, es decir, loguear
      al usuario automáticamente.
    - Emitir mensaje si el usuario ya se encuentra registrado. (NO USAR ALERT)
### Implementaciones realizadas:
1. Requerimientos del componente Home implementado en su totalidad
2. Requerimientos del componente Login implementado en su totalidad + cambio de estilos en base al sprint anterior (1)
3. Requerimientos del componente Registro implementado en su totalidad + cambio de estilos en base al sprint anterior
- Cambios de estilos en el header.
- Favicon actualizado.
- Implementación de nuevos servicios para:
  - Pasar data entre componentes (usuarios).
  - Guardar datos en firebase storage. 
