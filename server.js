var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3500;
var todos = [];
var toDoNextId = 1;

app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send('Todo API Root');
})

//GET /todos
app.get('/todos',function(request,response){
    response.json(todos); //Convert array to json
});

//GET /todos/:id
app.get('/todos/:id',function(request,response){
    var todoId = parseInt(request.params.id,10);

    // Normal approach
    /*var matchedTodo;

    todos.forEach(function(todos){
        if(todoId === todos.id){
            matchedTodo = todos;
        }
    });
   */

    //with underscore approach
    var matchedTodo = _.findWhere(todos,{id: todoId});

    if (matchedTodo) {
        response.json(matchedTodo)
    }else{
        response.status(404).send();
    }
});



//POST /todos
app.post('/todos',function(request,response){
    //var body = request.body;

    var body = _.pick(request.body,'description','completed');


    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        console.log('Control Came inside');
        return response.status(400).send();
    }

    body.description = body.description.trim();
    console.log("Trimmed body is " + body.description);
    body.id = toDoNextId++;

    todos.push(body);

    response.json(body);

});

app.listen(PORT,function(){
    console.log('Express listening on PORT ' + PORT + '!');
});


/* var todos = [{
     id: 1,
     descriprion: 'Meet Mom for lunch',
     completed: false
 },{
     id: 2,
     description: 'Go to Market',
     completed: false
 },{
     id:3,
     description: 'Have Lunch',
     completed: true
 }];*/
