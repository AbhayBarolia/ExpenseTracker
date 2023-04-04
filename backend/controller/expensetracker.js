const express = require('express');

const Expense = require('../models/expensetracker');



exports.addExpenseController = async function (req, res, next) {
   try{
    const amount= req.body.amount;
    const description= req.body.desc;
    const category= req.body.category;
     const res1=await Expense.create({
        amount: amount,
        description: description,
        category: category
    })
    if(res1){
        res.status(201).json({status: 'success'});
    }
    else{
        res.status(500);
        console.log('error');
    }
}
catch(err){console.log(err);}
}




exports.getSingleExpenseController= function (req, res, next) {
    const id =req.params.id;
    Expense.findOne({where:{id:id}})
   .then((data)=>{
        res.status(201).json(data);
   })
   .catch((err)=>{console.log(err)});
}



exports.getAllExpensesController = function (req, res,next) {
    Expense.findAll()
    .then((expenseDetails) => {
    
        res.status(201).json(expenseDetails);
    })
    .catch((err)=>{console.log('error '+err);});
}



exports.updateExpenseController = function (req, res,next) {
    const id= req.params.edId;
    const amount= req.body.amount;
    const description= req.body.desc;
    const category= req.body.category;
    Expense.findByPk(id).then((data)=>{
    data.amount= amount;
    data.description= description;
    data.category= category;
    data.save();
    res.status(201).json(data);})
    .catch((err)=>{console.log('error '+err);});
}



exports.deleteExpenseController  = function (req, res,next) {
    const id =req.params.id;
    Expense.destroy({where:{id:id}})
    .then(() => {
       
        res.status(201).json({status:"deleted"});
    })
    .catch((err)=>{console.log('error '+err);});
}


