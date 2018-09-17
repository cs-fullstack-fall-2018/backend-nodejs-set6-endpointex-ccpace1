// We first need to load our mongoose data model
const Todos = require('../models/todoModel');
const moment = require('moment');
// Include body parser
const bodyParser = require('body-parser'); // In node_modules

module.exports = function (app) {

    app.use(bodyParser.json()); // Use body parser middleware
    app.use(bodyParser.urlencoded({extended: true})); // Parse out any JSON from body and handle URL encoded data

    //  Add a method to get all todos for a particular User (uname)
    app.get('/api/todos/:uname', function (req, res) {

        // ROUTE: GET a user's list of todos
        Todos.find({username: req.params.uname}, function (err, todos) { //Use the find method on the data model to search DB
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todos);
        });

    });

//Get all open to Dos
    app.get('/api/todos/all/open', function (req, res) {
        Todos.find({isDone:false}, function (err,todos) {
            if(err){
                throw err;
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todos);
        });
    });

    //Get current age on file
    app.get('/api/todo/age/:numdays', function(req,res){
        let ageDays = req.params.numdays;
        var cutoffDate = moment().subtract(ageDays, 'days');

        Todos.find({$and:[{dueDate: {$lte:cutoffDate} }, {isDone:false}]}, function (err,todos) {
            if (err){
                throw err;
            }
            res.send(todos);
        });
    });


    // ROUTE: GET a specific ToDo list item by it's record ID
    app.get('/api/todo/:id', function (req, res) {

        Todos.findById({_id: req.params.id}, function (err, todo) { //Use the findID method on the data model to search DB
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todo);
        });

    });

    // ROUTE: POST (create) a new Todo item to my list
    app.post('/api/todo', function (req, res) {

        const newTodo = Todos({
            username: req.body.username,
            todo: req.body.todo,
            isDone: req.body.isDone,
            // hasAttachment: req.body.hasAttachment
        });
        newTodo.save(function (err) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            res.json({result: 'OK'});
        });

    });

    // ROUTE: UPDATE and existing item
    app.put('/api/todo', function (req, res) {

        Todos.findOneAndUpdate(req.body.id, {
            todo: req.body.todo,
            isDone: req.body.isDone,
          //  hasAttachment: req.body.hasAttachment
        }, function (err, todo) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            res.json({result: 'OK'});
        });
    });

    // ROUTE: DELETE an existing todo item by its ID
    app.delete('/api/todo', function (req, res) {

        Todos.findByIdAndRemove(req.body.id, function (err) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            res.json({result: 'OK'});
        })

    });

};