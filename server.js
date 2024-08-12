
import fetch from 'node-fetch';
import express from 'express';
// const express=require('express');
// const fetch=require('node-fetch');
const app=express();
const PORT=3003;

app.use(express.static('public'));


app.get('/api/random-user', async (req,res) => {
    const gender=req.query.gender;
    console.log(gender);
    const nationality=req.query.nationality;
    const apiUrl=`https://randomuser.me/api/?gender=${gender}&nat=${nationality}`;
    try{
        const response=await fetch(apiUrl);
        const data=await response.json();
        if(data.results.length===0){
            return res.status(404).json({error: 'No user found'});
        }
        const user=data.results[0];
        const age=user.dob.age;

        let loanOffer="";

        if(age<30){
            loanOffer="Low-interest student loans available!";

        }
        else if(age<50){
            loanOffer="Competitive mortgage rates just for you!";
        }
        else{
            loanOffer="Secure your retirement with our senior loans";
        }

        res.json({
            picture:user.picture.large,
            name: user.name,
            age: user.dob.age,
            location: user.location,
            nat:user.nationality,
            email: user.email,
            loanOffer:loanOffer

        });


    }catch(error){
        console.error(error);
        res.status(500).json({error:'Failed in fetching user data'});
    }
});

app.listen(PORT, () =>{
    console.log('server is running successfully');
});

