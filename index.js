const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));

require('./src/startup/db')();
require('./src/startup/routes')(app);

routes(app);

const port = 8080;

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));