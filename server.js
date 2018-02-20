const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = 3000;

io.on('connect', (socket) => {
    setTimeout(
        () => {
            socket.emit('now', {
                message: 'Shalom'
            });
        }, 1000
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

    server.listen(port, (err) => {
        if (err) throw err;
        console.log('Listen on port ', port);
    });
})
