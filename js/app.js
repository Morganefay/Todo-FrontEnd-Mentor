const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
const toggleIcon = document.querySelector('.toggle-icon');
const bgImg = document.querySelector('.bg-img');
const bgColor = document.querySelector('body');

let allTask = [];
let tasksLeft =0;
let tasksChecked = 0;

toggleIcon.innerHTML = '<img src="images/icon-moon.svg">';
bgImg.setAttribute('src', './images/bg-desktop-light.jpg');
let toggleValue = 1;

toggleIcon.addEventListener('click', switchMode);

form.addEventListener('submit', event => {
    event.preventDefault();

    const text = input.value.trim();

    if(text !== ''){
        addTask(text);
        input.value = '';
    }
})


function addTask(text){

    const todo = {
        text,
        // la méthode Date.now() permet de creer des id facilement
        id: Date.now()
    }
    showList(todo);
}

function showList(todo){

    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id);

    const btnCheck = document.createElement('button');
    btnCheck.setAttribute('class', 'btn-check');
    btnCheck.addEventListener('click', taskDone);

    const imgCheck = document.createElement('img');
    imgCheck.setAttribute('src', './images/icon-check.svg');
    imgCheck.setAttribute('class', 'img-checked');
    btnCheck.appendChild(imgCheck);
    item.appendChild(btnCheck);

    const txt = document.createElement('span');
    txt.innerText = todo.text;
    item.appendChild(txt);

    const btnDelete = document.createElement('button');
    btnDelete.addEventListener('click', deleteTask);

    const imgDelete = document.createElement('img');
    imgDelete.setAttribute('src', './images/icon-cross.svg');
    imgDelete.setAttribute('class', 'img-cross');
    btnDelete.appendChild(imgDelete);
    item.appendChild(btnDelete);

    liste.appendChild(item);
    allTask.push(item);
    tasksLeft = allTask.length;

    if(allTask.length >= 1){
        const actionsShow = document.querySelector('.actions');
        actionsShow.classList.remove('hidden-bar');
        const incrementItems = document.querySelector('.nbItemsLeft');
        incrementItems.innerText = `${tasksLeft} taches restantes`;
    }
}

function taskDone(e){
    e.target.parentNode.classList.toggle('finDeTache');
    // e.target.childNodes.classList.toggle('visible');
    e.target.classList.toggle('checked')

    
    if(e.target.classList.contains('checked')){
        console.log('fait');
        tasksChecked ++;
        console.log(tasksChecked);
    }else if(!e.target.classList.contains('checked')){
        console.log('pas fait');
        console.log(tasksChecked);
        tasksChecked --;
    };
    tasksChecked -1;
    console.log("total taches faites : " + tasksChecked + " total taches notées : " + allTask.length  + " total : " + (allTask.length - tasksChecked));
    
    const doneItems = document.querySelector('.nbItemsLeft');
    doneItems.innerText = `${(allTask.length - tasksChecked)} taches restantes`;
}


function switchMode(){
    if(toggleValue === 1){
        toggleIcon.innerHTML = '<img src="images/icon-moon.svg">';
        bgImg.setAttribute('src', './images/bg-desktop-light.jpg');
        bgColor.style.backgroundColor = '';
        toggleValue = 0;
    }else {
        toggleIcon.innerHTML = '<img src="images/icon-sun.svg">';
        bgImg.setAttribute('src', './images/bg-desktop-dark.jpg');
        bgColor.style.backgroundColor = 'hsl(235, 21%, 11%)';
        toggleValue = 1;
    }
}

function deleteTask(e){
    allTask.forEach(el => {

        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
            el.remove();
            allTask = allTask.filter(li => li.dataset.key !== el.dataset.key);
        }
    })
    
    if(allTask.length === 0){
        const actionsRemove = document.querySelector('.actions');
        actionsRemove.classList.add('hidden-bar');
    }
    tasksLeft = allTask.length;
    const decrementItems = document.querySelector('.nbItemsLeft');
    decrementItems.innerText = `${tasksLeft} taches restantes`;
}
