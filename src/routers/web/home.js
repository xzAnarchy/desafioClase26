import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    // res.sendFile(path.join(process.cwd(), '/views/home.html'))
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile('productos-vista-test.html', {root: 'public'})
})

productosWebRouter.get('/info', (req, res) => {
    console.log(process.memoryUsage())
    const datos = {
        specs: [
            { title: 'argumentos de entrada', value: process.argv.slice(2).join(', ') },
            { title: 'plataforma', value: process.platform },
            { title: 'version de node', value: process.version },
            { title: 'memoria total reservada (MB)', value: parseInt(process.memoryUsage().rss / 1024 / 1024) },
            { title: 'path de ejecucion del entorno', value: process.execPath },
            { title: 'id de proceso', value: process.pid },
            { title: 'path del proyecto', value: process.cwd() },
        ]
    }
    res.render(path.join(process.cwd(), '/views/pages/info.ejs'), datos)
})

export default productosWebRouter