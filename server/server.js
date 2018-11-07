'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

// const app = require('express')();
const app = module.exports = loopback();

app.start = function() {
    // start the web server
    return app.listen(function() {
        app.emit('started');
        const baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
        const explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});
  
// collection of middlewares for server hardening 
// app.use(require('helmet')());

const server = require('http').Server(app);

const io = require('socket.io')(server);
const next = require('next');

const config = require('../config/server.js');
const { PORT } = config;

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connect', (socket) => {
    setTimeout(
        () => {
            socket.emit('now', {
                message: 'Shalom'
            });
        }, 2000
    );
});

nextApp.prepare().then(() => {
    app.get('/about', (req, res) => {
        const fs = require('fs');

        fs.readFile('README.md', 'utf8', function (err, data) {
            const actualPage = '/about'
            const queryParams = { data };

            if (err) {
                console.error(err);
                return nextHandler(req, res);
            }
            nextApp.render(req, res, actualPage, queryParams)
        });
    });

    app.get('/api/files/README', (req, res) => {
        const fs = require('fs');

        fs.readFile('README.md', 'utf8', function (err, data) {
            const queryParams = { data };

            if (err) {
                console.error(err);
                return nextHandler(req, res);
            }

            res.json({
                data: queryParams
            });
        });
    })

    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;

        console.log('-=======================================-','\n-=  Welcome to zp-boilerplate server   =-','\n-=======================================-', '\n\nListen on PORT ', PORT);
    });
})
