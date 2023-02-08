import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import config from './config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import productosApiRouter from './routers/api/productos.js'
import randomsApiRouter from './routers/api/randoms.js'

import addProductosHandlers from './routers/ws/productos.js'
import addMensajesHandlers from './routers/ws/mensajes.js'

import objectUtils from './utils/objectUtils.js'

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//--------------------------------------------
// instancio servidor, socket , api y passport

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    // console.log('Nuevo cliente conectado!');
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(objectUtils.createOnMongoStore())
//app.use(session(config.session))

app.use(passport.initialize())
app.use(passport.session())
// app.use(session({
//     // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
//     store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
//     secret: 'shhhhhhhhhhhhhhhhhhhhh',
//     resave: false,
//     saveUninitialized: false,
//     rolling: true,
//     cookie: {
//         maxAge: 60000
//     }
// }))

// MIDDLEWARE PASSPORT
app.use(passport.initialize())
app.use(passport.session())


import auth from './routers/web/auth.js'
const sessions = auth
app.use('/api/sessions', sessions)
//req.session.passport.user

//--------------------------------------------
// rutas del servidor API REST

app.use(productosApiRouter)
app.use(randomsApiRouter)

//--------------------------------------------
// rutas del servidor web

app.use(authWebRouter)
app.use(homeWebRouter)

//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
