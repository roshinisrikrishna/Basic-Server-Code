import express from 'express';
const app = express();
import bodyParser from'body-parser';
import cors from'cors';
import mysql from'mysql2';
import axios from'axios';
import session from'express-session';
import cookieParser from'cookie-parser';

const db = mysql.createPool({
  host:"sampledbhost.sample.trackman.in",
  user: "roshini",
  password: "roshini8398",
  database: "samplebasicdb"
});

app.use(cors({
  origin: "http://localhost:3000", // Updated origin value
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',// secret key to encrypt session cookie
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:false,
    maxAge: 1000*60*60*24
  }//set the session cookie properties
}))

app.get('/',(req,res)=>{
  const result='Hi from server'
  console.log('result',result);
  res.send(result);

})


app.get('/users',(req,res)=>{
  const getQuery = 'SELECT * FROM users';
db.query(getQuery,(err,result)=>{
  console.log('result',result);
  res.send(result);
})
})

  app.listen(process.env.PORT||5000, () => {
  console.log('Server running on port 5000');
  });
  