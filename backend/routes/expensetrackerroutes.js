const express = require('express');

const routes = express();

const expenseController= require('../controller/expensetracker');


routes.get('/get-all-expense',expenseController.getAllExpensesController);

routes.post('/add-expense',expenseController.addExpenseController);

routes.delete('/delete/:id',expenseController.deleteExpenseController);

routes.get('/single-expense/:id',expenseController.getSingleExpenseController);

routes.put('/update-expense/:edId',expenseController.updateExpenseController);





module.exports = routes;