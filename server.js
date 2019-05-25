const express= require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const app= express();
app.use(bodyParser.json());
app.use(cors());
const database={
    users:[
        {
    id:'123',
    name:'Jhon',
    email:'Jhon@gmail.com',
    password:'cookies',
    entries:0,
    joined:new Date()
},
{
    id:'1234',
    name:'Sally',
    email:'sally@gmail.com',
    password:'bananas',
    entries:0,
    joined:new Date()
}]}
 
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
        console.log('done'); 

    }else{
        res.status(400).json('Error');
        console.log('not done');
    }
    
})

app.post('/Register',(req,res)=>{
    const {email,name,password}=req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
       console.log(hash);//Store hash in your password DB.
        });
    database.users.push({
        id:'1235',
        name:name,
        email:email,
        password:password,
        entries:0,
        joined:new Date()
    })
    res.json(database.users[database.users.length-1]);
})
app.put('/profile/:id',(req,res)=>{
    const {id}=req.params;
    let found=false;
    database.users.forEach(user => {
        if(user.id===id)
        {
            found=true;
           return res.json(user);
        }
        
    })
    if(!found)
    {
        res.status(400).json('no such data');
    };
})

app.put('/image',(req,res)=>{
    const{id}=req.body;
    let found=false;
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
app.listen(3000,()=>{
    //console.log('hello');
});


    // 

    // // Load hash from your password DB.
    // 