const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    id:String,
    fullName: String,
    email: String,
    mobile: String,
    city: String
},{
    versionKey: false // You should be aware of the outcome after set to false
});
module.exports = mongoose.model('Employee', EmployeeSchema);
