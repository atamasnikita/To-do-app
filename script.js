let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.buttonadd__main'),
    todo = document.querySelector('.plashka__list'),
    timer = document.querySelector('.timer__value'),
    ButtonTimer = document.querySelector('.add__timeButton'),
    ArrowUp = document.querySelector(".arrow__up"),
    ArrowDown = document.querySelector(".arrow__down"),
    timerValue = document.querySelector('.timer__value'),
    timerButton = document.querySelector('.timer__button'),
    clockButton = document.querySelector('.clock__button'),
    timerWindow = document.querySelector('.timer__window');

    let sdf;
    let time = 0; 
    let minutes = 0;
    let seconds = 0;
    let asd;


    let tasks = [];

    if(localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const cssClass = task.done ? 'plashka__list--done' : 'plashka__list__label';

        const taskHTML =`
            <div id ="${task.id}"class="plashka__super_puper">
                <li  class="plashka__list__proba">
                    <span class="${cssClass}">${task.text}</span>
                <li>
                <div class = "Buttons">
                        <button type="button" data-action ="done" class="Button-done"></button>
                        <button type="button" data-action ="delete" class="Button-delete"></button>
                </div>
            </div>`;
            todo.insertAdjacentHTML('beforeend', taskHTML); 
    })

    /*let animation = bodymovin.loadAnimation({
        container: document.querySelector('.head-animation'),
        rederer: 'svg',
        loop: false,
        autoplay: false,
        path:'data.json'
    });*/
    
    clockButton.addEventListener('click', function(){
        timerWindow.classList.toggle('timer__window--clock'); 
        clearInterval(asd);
        time = 0;
        minutes = 0;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = 0;
        seconds = seconds < 10 ? '0' + seconds : seconds;   
        timer.innerHTML = `${minutes}:${seconds}`;
    });

    ArrowUp.addEventListener('click', function(){
        time = time + 300;
        minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;   
        timer.innerHTML = `${minutes}:${seconds}`;
    });

    ArrowDown.addEventListener('click', function(){
        if(time<=0 || time <300){

        }else{
        time = time - 300;
        minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;   
        timer.innerHTML = `${minutes}:${seconds}`;
    }
    });

    timerButton.addEventListener('click', function(){
            asd = setInterval(timers, 1000);
            
    });

    function timers(){
        minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds; 
        timer.innerHTML = `${minutes}:${seconds}`;
        time --;
        if(time<=0){
            clearInterval(asd);
            alert ('Время вышло');
        }
    }
// Добавление задачи
    addButton.addEventListener('click', addTask);

// Удаление задачи
    todo.addEventListener('click', deleteTask);

//  Завершение задачи
    todo.addEventListener('click', doneTask);

    
    function addTask (event){
        event.preventDefault();
        const taskText = addMessage.value;

        //Добавили объект с задачами
        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false
        };
        tasks.push(newTask);
        const cssClass = newTask.done ? 'plashka__list--done' : 'plashka__list__label';
        savetoLocalStorage()
        if(addMessage.value == 0){
            
        } else{
            const taskHTML =`
            <div id ="${newTask.id}"class="plashka__super_puper">
                <li  class="plashka__list__proba">
                    <span class="${cssClass}">${newTask.text}</span>
                <li>
                <div class = "Buttons">
                        <button type="button" data-action ="done" class="Button-done"></button>
                        <button type="button" data-action ="delete" class="Button-delete"></button>
                </div>
            </div>`;
            todo.insertAdjacentHTML('beforeend', taskHTML); 
        }
        addMessage.value ="";
        addMessage.focus();
    };

    function deleteTask (event){
        if (event.target.dataset.action === 'delete'){
        const parentNode =  event.target.closest('.plashka__super_puper');
        const id = parentNode.id;
        const index = tasks.findIndex(function(taskss){
            if(taskss.id == id){
                return true;
            }
        });
        tasks.splice(index, 1);
        
        parentNode.remove();
        }
        savetoLocalStorage()
    }

    function doneTask (event){
        
        if(event.target.dataset.action === 'done'){
            const parentNode = event.target.closest('.plashka__super_puper');
            const taskTitle = parentNode.querySelector('.plashka__list__label')
            taskTitle.classList.add('plashka__list--done');

            const id = parentNode.id;
            const index = tasks.find(function(task){
                if( task.id == id){
                    return true;
                    
                }
            })
            console.log(index);
            index.done = true;
            savetoLocalStorage();
            //bodymovin.play();
            clearInterval(asd);
            
        }
    }

    function savetoLocalStorage(){
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }