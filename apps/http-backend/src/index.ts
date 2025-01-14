import express from 'express';

const app = express();

app.listen(8000, ()=>{
    console.log("HTTP backend running on PORT: 8000")
})