const { isValidObjectId } = require('mongoose');
const Student = require('../data/student-model');

//create
addOne = (req, res) => {
    let response = {
        status: 201,
        message: ''
    };
    console.log('request received: ', req.body);
    let newStudent = req.body;
    const student = new Student(newStudent);
    console.log('created Student', student);
    
    student.save((err, doc)=>{
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.message = doc;
            console.log("Created document", response.message);
        }
        res.status(response.status).json(response.message);//response.message);                
    });        
}

//read
getAll = (req, res)=> {   
    let response = {
        status: 200,
        message: ''
    };

    //if there is a query, count will be what the user specifies 
    //but not exceeding maxcount
    if(req.query.count) {        
        count = parseInt(req.query.count);
        if(isNaN(count)) {
            response.status = 400;
            response.message = {"message:" : "Query string count should be digit"};
            res.status(response.status).json(response.message);                
            return;
        }
            
        if(count > parseInt(process.env.FIND_COUNT_MAX)) {
            response.status = 400; //bad request
            response.message = {"message":"Count should not exceed LIMIT "+ process.env.FIND_COUNT_MAX};

            res.status(response.status).json(response.message);
        }
        else {                
            Student.find().limit(count).exec((err, students) => {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else{                    
                    response.message = students;                    
                    console.log('Found Students: ', response.message);
                }                
                res.status(response.status).json(response.message);                
            });    
        }        
    }
    
    //if there is no query, get all existing documents
    else {      
        count = process.env.FIND_COUNT_MAX        
        Student.find().exec((err, students) => {
            if (err) {
                response.status = 500;
                response.message = err;
            } else {                
                response.message = students;
                console.log('Found students', response.message);
            }                                
            res.status(response.status).json(response.message);
        });          
    }
}

//read by id
getOne = (req, res)=>{
    const studentId = req.params.studId;
       
    //validate Id
    if(!isValidObjectId(studentId)) {
        res.status(400).json({"message" : "Invalid Student Id"});        
        return;
    }
    
    Student.findById(studentId).exec((err, result)=> {
        let response = {
            status: 200,
            message: ''
        };
        
        if (err)  {
            response.status = 500;
            response.message = err;            
            console.log("Error finding Student: ");
        } else if (!result) {
            response.status = 404,
            response.message = {"message" : "Student Id not found"};
            console.log("Student Id not found");
        } else {            
            response.message = result;
            console.log("Found Student: ", response.message);
        }
        res.status(response.status).json(response.message);
    });
}

//update
updateOne = (req, res)=>{
    //target Id
    const studentId = req.params.studId;    
    //updates
    const updates = req.body;
    
    //validate Id
    if(!isValidObjectId(studentId)) {
        res.status(400).json({"message" : "Invalid Student Id"});        
        return;
    }
    
    Student.findByIdAndUpdate(studentId, updates, {new:true}).exec((err, updatedShop) => {            
        let response = {
            status: 200,
            message: ''//updatedShop,
        };
        if(err) { 
            response.status = 500;
            response.message = err;
            console.log("Error updating Student");
        } else if (!updatedShop) {
            response.status = 400; 
            response.message = {"message" : "Student Id not found"};
            console.log("Student Id not found");
        } else {            
            response.message = updatedShop;
            console.log("Updated Student: ", response.message);
        }
        res.status(response.status).json(response.message);
    });            
    
}   

//delete
deleteOne = (req, res) => {
    const studentId = req.params.studId;

    //validate Id
    if(!isValidObjectId(studentId)) {
        res.status(400).json({"message" : "Invalid Student Id"});        
        return;
    }
    
    Student.findByIdAndDelete(studentId).exec((err, deletedShop)=> {        
        const response = {
            status: 204,
            message: deletedShop
        };

        if(err) {            
            response.status = 500; //500 - internal error
            response.message = err;
            console.log('Error finding Student.');
        }
        //if not found        
        else if (!deletedShop) {
            response.status = 404;
            response.message = {"message" : "Student Id not found"};
            console.log('Student Id not found');
        }
        //on success
        else {
            response.message = deletedShop;
            console.log('Deleted Student: ', response.message);          
        }
         res.status(response.status).json(response.message);        
    });

}

module.exports = {
    addOne,
    getOne,
    getAll,    
    updateOne,
    deleteOne
}