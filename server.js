const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());


// ----------------- DB Connection ----------------------
connectDB();

app.use(express.json());

app.use('/admin', require('./routes/api/admin'));
//app.use('/cart', require('./routes/api/cartItems'));
app.use('/user', require('./routes/api/users'));
app.use('/products', require('./routes/api/products'));



app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})




