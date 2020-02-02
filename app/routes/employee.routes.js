module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');

    // Create a new Employee
    app.post('/employees', employee.create);

    // Retrieve all Employees
    app.get('/employees', employee.findAll);

    // Retrieve a single employees with fullName
    app.get('/employees/:fullName', employee.findOne);

    // Update a employees with fullName
    app.put('/employees/:id', employee.update);

    // Delete a Note with noteId
    app.delete('/employees/:id', employee.delete);
}
