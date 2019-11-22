const dotenv = require('dotenv');
const express = require('express');

const app = express();
dotenv.config();
const PORT = process.env.PORT;









app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})




