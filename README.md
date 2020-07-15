# Frenon  API


> Desarrollo de test, evaluacion frenon
---

### Tabla de contenido
Secciones para ser usadas de referencia para cada item de la tabla de contenido


- [Descripcion](#descripcion)
- [como usar](#Como-usar)

---

## Descripcion

Creación de una api basica de usuarios para demostración de dominio en tecnologias basadas en desarrollo de softwares

#### Técnologias

- express
- pg
- mocha
- chai
- chai-http
- swagger

#### Infrastructura
La infrastructura de este software se basa en una arquitectura cliente/servidor, donde los clientes podran consumir o mandar datos a traves de endpoints que conforman una api la cual administra un sistema de usuarios

#### Patrón de diseño 
El patrón utilizado fue FACTORY, utilizado por su versatilidad para usar programacion funcional declarativa


## Como usar
clone el repositorio con el comando git clone "url-git" (git clone https://github.com/BakirDiyar/frenon-test.git), posteriormente instale administrador de base de datos PostgreSql y cree una base de datos. Una vez creada registre sus credenciales en el archivo index alojado en la carpeta "databases", esta api hace referencia una tabla llamada "users", se recomienda usar los script entregados en la misma carpeta en el archivo "data.sql"

#### Instalacion

Ubiquese dentro de la carpeta del proyecto, abra la terminal de su editor de codigo o terminal y ejecute el comando npm install, una vez instaladas las dependencias procesa a iniciar el servidor con  el comando npm start (debe tener instalado nodemon de scope global)