import express from 'express';

const app = express();

app.listen(8080, ()=>{
    console.log("Cron running on PORT: 8080")
})