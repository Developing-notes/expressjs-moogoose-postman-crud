var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var StudentModel = require('./model/register');
// Connecting to database
mongoose.connect("mongodb://localhost:27017/rkmart", { useNewUrlParser: true }, function (err) {
    if (!err) {
        console.log("db connected")
    }
    else {
        console.log('db error')
    }
    // router.get('/save', function(req, res) {
    // var newStudent = new StudentModel({StudentId:101, 
    //     Name:"Sam", Roll:1, Birthday:2001-09-08});

    // newStudent.save(function(err, data) {
    //     if(err) {
    //         console.log(error);
    //     }
    //     else {
    //         res.send("Data inserted");
    //     }
    // }); 
    // });
    // http://localhost:3000/api/save => postman command
    router.post('/save', function (req, res) {
        var newStudent = new StudentModel();
        newStudent.StudentId = req.body.StudentId;
        newStudent.Name = req.body.Name;
        newStudent.Roll = req.body.Roll;
        newStudent.Birthday = req.body.Birthday;

        newStudent.save(function (err, data) {
            if (err) {
                console.log(error);
            }
            else {
                res.send("Data inserted");
            }
        });
    });


    // http://localhost:3000/api/findall=> postman command
    router.get('/findall', function (req, res) {
        StudentModel.find(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(data);
            }
        });
    });
    //  http://localhost:3000/api/findfirst=> postman command
    router.get('/findfirst', function (req, res) {
        StudentModel.findOne({ StudentId: { $gt: 201 } },
            function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            });
    });
    // http://localhost:3000/api/delete
    router.get('/delete', function (req, res) {
        StudentModel.remove({ StudentId: 301 },
            function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            });
    });
    router.post('/delete', function (req, res) {
        StudentModel.findByIdAndDelete((req.body.id),
            function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                    console.log("Data Deleted!");
                }
            });
    });
    // http://localhost:3000/api/update
    router.post('/update', function (req, res) {
        StudentModel.findByIdAndUpdate(req.body.id,
            { Name: req.body.Name }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                    console.log("Data updated!");
                }
            });
    });

})



module.exports = router;
// note
// postman=body/json
    // {
    //     "StudentId":"301",
    //     "Name":"david",
    //     "ROll":"2",
    //     "Birthday":"2022-09-08",
    //      "id":"623a0b81b105f10229e9266d"
    // }
