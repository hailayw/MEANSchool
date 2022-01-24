const mongoose= require("mongoose"); 
const reqString = {
    type: String,
    required: true
}
const studentSchema = mongoose.Schema({
    firstName: reqString,
    lastName: reqString,
    email: String,
    gpa: Number
});
    
module.exports = mongoose.model('Student', studentSchema, 'students');
