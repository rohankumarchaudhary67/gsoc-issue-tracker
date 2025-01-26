import dotenv from 'dotenv';
import express from 'express';
import cronFetchSchedule from './lib/cron-schedule';

dotenv.config({
    path: './.env',
});

const app = express();

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
    console.log('Cron schedule start');
    // cronFetchSchedule.start();
});
