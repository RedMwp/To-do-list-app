const container = document.querySelector('.container');
const toDocontainer = document.querySelector('.to-do-container');
const count = document.getElementById('count');
const btnAdd = document.getElementById('add');
const input = document.getElementById('new-to-do')
const listContainer = document.querySelector('ul');
const activeTask = document.getElementById('active-task')
const complete = document.getElementById('complete');
const clear = document.getElementById('clear');
const all = document.getElementById('all');
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.reverse();

function addToList() {
    // adding to list
    var inputs = input.value;
    var todo = {
        text:inputs,
        state:true,
    }
    tasks.push(todo);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addLi(item,index){
    var img = ''
    var bg = 'none';
    var color = '#fff'
    if(item.state === false){
        color = 'gray'
        bg =" linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%)) ";
        img = '<img src="images/icon-check.svg">'
    }
        listContainer.innerHTML += `<li style='color:${color}' onclick="done(${index})"> <div class="btn" style=" background:${bg}">${img} </div> ${item.text}</h1>`
        console.log(item.state);
}
function display(lists){
    listContainer.innerHTML=''
    lists.map(addLi);
    var take = tasks.length;
    count.innerHTML = take;
    
    
}

var actives;

function active(){
    actives = tasks.filter(function(item){ return item.state === true });
    display( actives )
    console.log(tasks);
}

var comp;
var inex;
function completed(){
    
   comp = tasks.filter(function(item){  
       return item.state === false  ;
       
   })
    display( comp );
} 

function done(index){
    
    if( tasks[index].state === true ){
        
    tasks[index].state=false;
    
    }else{
        tasks[index].state = true;
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    display( tasks )
    
    console.log(tasks)
}

function del(){
    
    tasks.forEach(function(item,index){
        if( item.state === false){
            
            tasks.splice(index,1);
            
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        
         all.style.color="royalblue"
        display( tasks )
    })
    
    
}
display(tasks);
btnAdd.onclick = function(){
    addToList()
    console.log(tasks)
     display(tasks);
     input.value=''
     
}

function colorBlue(e){
    e.target.style.color="royalblue"
}


activeTask.onclick = function(e){
    active();
    colorBlue(e);
}
complete.onclick = function(e){
    completed();
    colorBlue(e);
}

clear.onclick = function(e){
    
    colorBlue(e);
    del();
    //display( comp )
}
all.onclick = function(e){
    display(tasks)
    colorBlue(e)
}
input.onchange = function(){
    addToList()
    display( tasks );
    input.value=''
}
//localStorage.clear();
