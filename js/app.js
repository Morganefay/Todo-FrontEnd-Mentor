const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
const toggleIcon = document.querySelector('.toggle-icon');
const bgImg = document.querySelector('.bg-img');
const bgColor = document.querySelector('body');
let allTask = [];

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

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', taskDone);
    item.appendChild(input);


    const txt = document.createElement('span');
    txt.innerText = todo.text;
    item.appendChild(txt);

    const btnDelete = document.createElement('button');
    btnDelete.addEventListener('click', deleteTask);

    const imgDelete = document.createElement('img');
    imgDelete.setAttribute('src', './images/icon-cross.svg');
    btnDelete.appendChild(imgDelete);
    item.appendChild(btnDelete);

    liste.appendChild(item);
    allTask.push(item);
}

function taskDone(e){
    e.target.parentNode.classList.toggle('finDeTache');
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
}