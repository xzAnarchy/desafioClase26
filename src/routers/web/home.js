import { Router } from 'express'
import { webAuth } from '../../auth/index.js'
import config from '../../config/config.js'

import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    // res.sendFile('main.html', {root: 'public'})
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile('productos-vista-test.html', { root: 'public' })
})


export default productosWebRouter