const Employee = require('../models/employee.model.js');
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const emp = new Employee({
        fullName: req.body.fullName, 
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
    });

    // Save Note in the database
    emp.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(emp => {
        res.send(emp);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    console.log(req.params);
    Employee.findOne({ "fullName": req.params.fullName})
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found  with id " + req.params.id
            });            
        }
        res.send(emp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Employee.findByIdAndUpdate(req.params.id, {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
    }, {new: true}) 
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send(emp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.id)
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.id
        });
    });
};
