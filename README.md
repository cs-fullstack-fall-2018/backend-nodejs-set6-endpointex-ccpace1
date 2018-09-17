# Assignment on adding routes and using conditional searches

* Add an endpoint for ```/api/todo/age/:numdays``` to apiController()
* Use moment date/time package to subtract ```numdays``` from the current date to get the age date
* Return any ToDos that are incomplete *AND* have a create date that is on or before the age date

- Use an HTTP GET for your route endpoint
- You'll need to use Mongoose/Mongo Conditionals for your database query (https://docs.mongodb.com/manual/reference/operator/query-comparison/)



Code:

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
