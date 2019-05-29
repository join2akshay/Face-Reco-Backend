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
 db.select('*').table('users').then(data=>{console.log(data)});
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
res.send(database.users);
})   

app.post('/Signin',(req,res)=>{
    // console.log(req.body);
    // bcrypt.compare("cookies", '$2a$10$ZL9RdsjffcNm3BjuXtt1Se1LNeefIFyd2NQmryX3a4KXlG3VTBP1i', function(err, res) {
    //      console.log('first guess',res);//res == true
    //      });
    // bcrypt.compare("veggies",'$2a$10$ZL9RdsjffcNm3BjuXtt1Se1LNeefIFyd2NQmryX3a4KXlG3VTBP1i', function(err, res) {
    //     console.log('second guess',res);//res = false
    //      });
    if(req.body.email===database.users[0].email &&req.body.password===database.users[0].password)
    {
       
        res.json(database.users[0]);
      

    }else{
        res.status(400).json('Error');
      
    }
    
})

app.post('/Register',(req,res)=>{
    const {email,name,password}=req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
       console.log(hash);//Store hash in your password DB.
        });
    db('users').returning('*')
    .insert(
        {
            email:email,
            name:name,
            joined:new Date()
        }
    ).then(user=>{
        res.json(user[0]);
    }).catch(err=>res.status(400).json('unable to connent'))
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

app.put('/image',(req,res)=>{
    const{id}=req.body; 
    database.users.forEach(user => {
        if(user.id===id)
        {
            found=true;
            user.entries++;
           return res.json(user.entries);
        }
        
    })
    if(!found)
    {
        res.status(400).json('no such data');
    };
})
app.listen(3001,()=>{
   
});


    // 

    // // Load hash from your password DB.
    // 