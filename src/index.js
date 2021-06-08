let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

require('./controllers/authController')(app);
require('./controllers/postController')(app);
require('./controllers/projectController')(app);

app.get('/',(req, res)=>{
    res.send('OK');
});

app.listen(3008);