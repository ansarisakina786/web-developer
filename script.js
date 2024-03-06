document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const task = document.createElement('li');
        task.innerHTML = `
            <span>${taskText}</span>
            <button class="completeBtn">Complete</button>
            <button class="updateBtn">Update</button>
            <button class="deleteBtn">Delete</button>
        `;
        task.querySelector('.completeBtn').addEventListener('click', completeTask);
        task.querySelector('.updateBtn').addEventListener('click', updateTask);
        task.querySelector('.deleteBtn').addEventListener('click', deleteTask);
        pendingTasksList.appendChild(task);
        saveTasksToLocalStorage();
    }

    function completeTask() {
        const task = this.parentNode;
        task.classList.add('completed');
        completedTasksList.appendChild(task);
        task.querySelector('.completeBtn').remove();
        saveTasksToLocalStorage();
    }

    function updateTask() {
        const task = this.parentNode;
        const taskText = task.querySelector('span').innerText;
        const newTaskText = prompt('Update task:', taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            task.querySelector('span').innerText = newTaskText;
            saveTasksToLocalStorage();
        }
    }

    function deleteTask() {
        const task = this.parentNode;
        task.remove();
        saveTasksToLocalStorage();
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(taskText => addTask(taskText));

    function saveTasksToLocalStorage() {
        const tasks = Array.from(document.querySelectorAll('li span')).map(task => task.innerText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskForm.addEventListener('submit', function () {
        saveTasksToLocalStorage();
    });

    pendingTasksList.addEventListener('click', function (event) {
        if (event.target.classList.contains('completeBtn') || event.target.classList.contains('updateBtn') || event.target.classList.contains('deleteBtn')) {
            saveTasksToLocalStorage();
        }
    });
});
