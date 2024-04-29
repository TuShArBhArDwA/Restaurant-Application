const express=require('express');
const bodyparse=require('body-parser'); 
const db=require('./db.js');
const Person=require('./person.js');
var app=express();
app.use(bodyparse.json()); // req.body
app.get('/',function(req,res){
    res.send('Welcome to our hotel');
})

//POST route to add a Person
app.post('/person',async(req,res)=>{
    try{
        const data=req.body
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//GET method to get the person
app.get('/person',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//GET method to get the filtered list of person (filtered by work)
app.get('/person/:work',async(req,res)=>{
    try{
        const workType=req.params.work;
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
            const response=await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//PUT method to update a person
app.put('/person/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,
            runValidators: true,
        })
        if(!response){
            res.status(404).json({error: 'Person not found'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//DELETE method to update a person
app.delete('/person/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndRemove(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data delete');
        res.status(200).json({error: 'Person deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//POST route to add a Menu
app.post('/menu',async(req,res)=>{
    try{
        const data=req.body
        const newMenu=new MenuItem(data);
        const response=await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//GET method to get the Menu
app.get('/menu',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//PUT method to update a menu
app.put('/menu/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
        const updatedMenuData=req.body;
        const response=await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
            new: true,
            runValidators: true,
        })
        if(!response){
            res.status(404).json({error: 'Menu Item not found'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//DELETE method to update a person
app.delete('/menu/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
        const response=await MenuItem.findByIdAndRemove(menuId);
        if(!response){
            return res.status(404).json({error: 'Menu Item not found'});
        }
        console.log('data delete');
        res.status(200).json({error: 'Menu Item deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
});
