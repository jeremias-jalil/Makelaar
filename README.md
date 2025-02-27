![Logo](https://lh3.googleusercontent.com/tnl6F4_wYoxSaubriLfxOCTb-6CGbn04h9zoNiUQfafNkuLsBXJOgMqFF6hsaBpJS7u1WOQ=s170)


# Makelaar

Este proyecto está destinado a inmobiliarias y nace de la necesidad de brindar una herramienta de gestión integral. En donde tienen acceso a toda su información, ya sea propiedades, clientes, contratos y pagos, llevando un registro ordenado permitiendo consultar datos de forma rápida.
Adicionalmente los visitantes de la web tienen la posibilidad de localizar y visualizar todas las propiedades para solicitar información de interés, y una vez que forma un vínculo comercial, dentro de su cuenta puede efectuar los pagos de sus alquileres por medio de MercadoPago.

[![Alt text](https://img.youtube.com/vi/ymsuwoBvcvI/0.jpg)](https://youtu.be/ymsuwoBvcvI)

#### La inmobiliaria puede desde su cuenta como administrador:

• publicar los inmuebles de sus clientes.

• visualizar en el panel de control de forma grafica: el estado del inmueble, el balance de los pagos, documentacion de los contratos.

• visualizar en el panel de contratos todos los contratos, sus estados, y modificarlos con aprobacion del cliente.

• visualizar en el panel de usuarios todos los clientes con sus datos.

• visualizar en el panel de inmuebles, un listados de todos los inmuebles y sus estados.


#### El usuario cliente de la inmobiliaria desde su cuenta puede:

• realizar sus pagos recurrente a traves de la misma plataforma mediante Mercado Pago. 

• visualizar en el panel de inmubles los inmuebles que tienen publicados en la inmobiliaria, su estado y los pagos.

• visualizar en el panel de contrartos los contratos, sus estados, y la opcion de realizar el pago.

• tiene acceso a un Chat con respuesta automatica a consultas generales.

• realizar sus consultas desde la plataforma la cual se enviara por e-mail.

• crear un inmuebles para ser publicado

• agregar propiedades a su seccion de favoritos


El usuario visitante puede:

• visualizar todas las propiedades publicadas y agregar a su seccion favoritos.



## Autores

- [@AlanBVN](https://github.com/AlanBVN)
- [@Fernando-Jaramillo](https://github.com/Fernando-Jaramillo)
- [@jeremias-jalil](https://github.com/jeremias-jalil)
- [@marcosvillar456](https://github.com/marcosvillar456)
- [@milagrosniro](https://github.com/milagrosniro)
- [@Simon834](https://github.com/Simon834)
- [@mariavirginiaespeche](https://github.com/mariavirginiaespeche)

  
## Deployment

El proyecto se encuentra publicado en el siguiente enlace: https://makelaar.web.app/

  
## Tecnologias usadas

**Backend:** Node, Express, Sequelize, PostgreSQL, NodeMailer, J.W.T

**Frontend:** FrontEnd: React, Redux, Material UI v4.0.0

**Deployment:** Heroku, Vercel

**Integraciones:** Google Maps, Mercado Pago, Socket.io

## Usuarios de ejemplo

Admin:

User:admin@test.com

password: Qaz12345

Users:

User:martin.diaz@test.com

password: Md123456



## Configuraciones para instalar aplicación en local:

BackEnd: (puerto /3010) 


 1- Dentro de carpeta /api crear un archivo .env con la siguiente estructura:
```bash
AUTH_SECRET= makelaarInm

AUTH_EXPIRES=1d AUTH_ROUNDS=10

DB_USER = postgres 

DB_PASSWORD = Milagros8 

DB_HOST = localhost 

DB_HOST_PORT = 5432 

DB_DATABASE = makelaar 

DB_DIALECT = postgres

MAILUSER = info_makelaar@yahoo.com 

MAILPASS = hriojqhhhgrxjxdc

PROD_ACCESS_TOKEN = APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410
  
```

2- Dentro de carpeta /api

```bash
npm install
npm start
```

FrontEnd: (puerto /3000)

1- Dentro de carpeta /client

```bash
npm install
npm start
```

Start the server

```bash
  npm run start
```

  


    
