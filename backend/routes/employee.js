const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/', async (req, res) => {
    const employee = await Employee.find();
    res.send(employee);
});

router.post('/', async (req, res) => {
    const employee = new Employee(req.body);
    try{
    await employee.save();
    }  catch(Exception ){

    }
    res.send(employee);
});

router.put('/:id', async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(employee);
});

router.delete('/:id', async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.send({ message: 'Employee deleted' });
});

module.exports = router;
