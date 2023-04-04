const express = require('express');

const bodyParser= require('body-parser');

const cors= require('cors');

const sequelize= require('./backend/util/database');

const expenseTrackerRoutes= require('./backend/routes/expensetrackerroutes');


const app= express();
app.use(cors());
app.use(bodyParser.json({ extended:false }));



app.use('/single-expense/:id',expenseTrackerRoutes);

app.use('/delete/:id',expenseTrackerRoutes);

app.use('/update-expense/:edId',expenseTrackerRoutes);

app.use('/',expenseTrackerRoutes);

sequelize.sync()
.then((results)=>{
    app.listen(3000);
})
.catch((err)=>{console.log(err);});
