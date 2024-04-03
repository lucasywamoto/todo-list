import { saveTask, listenForTasks, deleteTask, toggleCheck  } from './firebase.js';

window.addEventListener('load', () => {
    listenForTasks(renderTasks);
});

const taskForm = document.getElementById('task-form');
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = inputBox.value;

    if(taskText.trim() === ''){
        alert("Please enter a task before submitting");
        return;
    }

    saveTask({text: taskText, checked: false});

    taskForm.reset();
});

function renderTasks(tasks) {
    listContainer.innerHTML = ''; // Clear the list before re-rendering
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }

        // Add click event to toggle the checked status
        li.addEventListener('click', () => {
            toggleCheck(task.id, !task.checked);
        });

        // Add delete button
        const span = document.createElement("span");
        span.textContent = "\u00D7"; // Unicode character for the multiplication sign, used as a delete button
        span.classList.add("delete"); // Add a class for styling purposes if needed
        span.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the li click event from firing when the span is clicked

            // Confirm before deleting
            const isConfirmed = confirm("Are you sure you want to delete this task?");
            if (isConfirmed) {
                deleteTask(task.id);
            }
        });

        li.appendChild(span);
        listContainer.appendChild(li);
    });
}
