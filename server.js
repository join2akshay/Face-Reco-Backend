const express= require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const app= express();
var knex = require('knex');
const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'p000000',
      database : 'smart-brains'
    }
  });
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{

})   

app.post('/Signin',(req,res)=>{
 
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data=>{
        const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
        if(isValid)
        {
            return db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user=>{
                res.json(user[0])
            })
            .catch(err=>res.status(400).json('unable to get user'))
        }
    })
    .catch(err=>res.status(400).json('wrong Details entered'));

})

app.post('/Register',(req,res)=>{
    const {email,name,password}=req.body;
    const hash=bcrypt.hashSync(password);
           //Store hash in password DB.
    db.transaction(trx=>{
trx.insert({
        hash:hash,
        email:email
})
    .into('login')
    .returning('email')
    .then(loginEmail=>{
        
       return trx('users')
        .returning('*')
        .insert(
            {
                email:loginEmail[0],
                name:name,
                joined:new Date()
            }
        ).then(user=>{
            res.json(user[0]);
        })
    }).then(trx.commit)
      .catch(trx.rollback)
    })
.catch(err=>res.status(400).json('unable to connent'))
   // res.json(database.users[database.users.length-1]);
})


app.put('/profile/:id',(req,res)=>{
    const {id}=req.params;
    db.select('*').from('users').where({id}).then(user=>{
        if(user.length){
            res.json(user[0])
        }else{
            res.status(400).json('Not Found');
        }
       
    })
})

app.listen(3001,()=>{
   
});


    // 

    // // Load hash from your password DB.
    // 