const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require('mysql');
// session     = require('express-session');
// cookieParser = require('cookie-parser');
// flash       =require('flash');


// app.use(cookieParser());

// app.use('session'({
// secret : 'whatabyte-portal',

// }))

const app = express();

app.use('/static', express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))

const port = process.env.PORT || "8000";

app.get('/',function(req,res)
{
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.set('view engine', 'pug')

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root', 
  password: 'root', 
  database: 'TCZtest'
});

connection.getConnection((err, connection) => {
  if(err) 
      console.error("Something went wrong connecting to the database ...");
  
  if(connection)
      connection.release();
  return;
});



// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', 
//   password: 'root',
//   database: 'TCZtest'

//   });

//   connection.connect(function(err)
//   {
//     if (err) throw err;

//     console.log('connected...');
//   })

  app.post('/product',function(req,res)
  {
  console.log(req.body);
   var sql = "insert into product values(null, '"+ req.body.name + "','"+ req.body.email + "','"+ req.body.message + "')";
  connection.query(sql ,function(err)
  {
     if(err) throw err
     res.render('product', {title :'data saved',success: 'Product Saved Successfully'})
     })

     res.redirect('/');
})


app.post('/mobile',function(req,res)
{
console.log(req.body);
 var sql = "insert into mobile values(null, '"+ req.body.mobileNo + "')";
connection.query(sql ,function(err)
{
   if(err) throw err
   res.render('mobile', {title :'data saved' ,success: 'Product Saved Successfully'})
   })
    res.redirect('/');
   
})
 

 app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});