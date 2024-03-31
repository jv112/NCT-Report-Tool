const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;

const { initDB } = require('./api/Db');

const locationRouter = require('./api/routers/location');
const reportRouter = require('./api/routers/report');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/location', locationRouter);
app.use('/reports', reportRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    initDB();
});