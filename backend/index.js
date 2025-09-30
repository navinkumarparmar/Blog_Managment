const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path')
dotenv.config();
const PORT = process.env.PORT || 4000
const bodyparser =  require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const Database = require('./models/dbConnection');
Database();

const routes = require('./routes/index');
const errorHandler = require('./middlwere/errorHandler');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
  origin: true,   
  credentials: true,  
}));

app.use('/api',routes);

//serve
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distPath));
  app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.use(errorHandler)
app.get('/',(req,res,next)=>{
    res.send('server is running')
})

app.listen(PORT,()=>{
    console.log(`your server is running on port ${PORT}`);
})
