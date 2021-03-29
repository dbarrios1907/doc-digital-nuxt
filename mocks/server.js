const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 5000

server.use(middlewares)
// Add custom routes before JSON Server router

//
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     console.log(req)
//   }
//   // Continue to JSON Server router
//   next()
// })

server.post('/auth/login', (req, res) => {
  res.status(403)
  res.json({
    count: 0,
    error: 'Any 403 Unhandled Error',
    // errorCode: 40103,
    message: 'Not Found',
    status: 403,
    timestamp: '28-03-2021 05:55:05',
  })
})

// Use default router
server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running')
})
