const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const apiRouter = express.Router();
const apiKeys = require('./../config/keys');

app.use(cors());

apiRouter.get('/', (req, res) => {
    res.json({
        requestPath: req.path,
        data: {},
    });
});

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`API Server running at http://localhost:${port}`);
});