const bodyParser = require('body-parser');
const ExampleRoutes = require('./ExampleRoutes');



module.exports = (app) => {
    app.use(
        bodyParser.json(),
        ExampleRoutes,
  
    )
}