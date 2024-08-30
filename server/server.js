import express from 'express';
import cors from 'cors';

import Db from './api/Db.js';
import locationRouter from './api/routers/location.js';
import reportRouter from './api/routers/report.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/location', locationRouter);
app.use('/reports', reportRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    Db.initDB();
});

export default app;