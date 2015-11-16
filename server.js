var express = require('express');
var bodyParser = require('body-parser');
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
    var matchedTodo;

    todos.forEach(function(todos){
        if(todoId === todos.id){
            matchedTodo = todos;
        }
    });

    if (matchedTodo) {
        response.json(matchedTodo)
    }else{
        response.status(404).send();
    }
});

//POST /todos
app.post('/todos',function(request,response){
    var body = request.body;

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
