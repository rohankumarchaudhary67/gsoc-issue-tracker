import dotenv from "dotenv";

// Configure environment variables
dotenv.config({
    path: "./.env",
});

import app from "./app";

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port 8000');
});