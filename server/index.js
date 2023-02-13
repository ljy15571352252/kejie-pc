const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);

const app = express()

app.use(session({
    name: 'sid',
    secret: 'carpartner@123-',
    resave: false,
    //rolling: true,
    saveUninitialized: false,
    store: new RedisStore({
        "host": process.env.REDIS_HOST,
        "port": process.env.REDIS_PORT,
        "pass": process.env.REDIS_PASS,
        "db": parseInt(process.env.REDIS_DB),
        "logErrors": true
    })
}))

app.use(cookieParser())
//app.use(bodyParser.urlencoded({extended: false}));//该设置会导致axios的post代理出问题

module.exports = {
    handler: app
}

