import React, { useState, useEffect } from 'react';

function ToDoList(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Fetch tasks from API when component mounts
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5') // example API
            .then(response => response.json())
            .then(data => {
                // Only take the "title" field for our tasks
                const fetchedTasks = data.map(item => item.title);
                setTasks(fetchedTasks);
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    function handleInputChange(event){
        setNewTask(event.target.value);   
    }

    function addTask(){
        if(newTask.trim() !== ''){
            setTasks(t => [...t, newTask]);
            setNewTask('');
        }
    }
    
    function deleteTask(index){
        setTasks(tasks.filter((_, i) => i !== index));
    }
  
    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
        <div className="to-do-list">
            <h1>My To-Do List</h1>      
            <div>
                <input 
                    type="text" 
                    placeholder="Enter a task..." 
                    value={newTask} 
                    onChange={handleInputChange}
                />
                <button
                    className="add-button"
                    onClick={addTask}>
                    Add 
                </button>            
            </div>  
            <ol>
                {tasks.map((task, index) => 
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button 
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button 
                            className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            Move Up
                        </button>
                        <button 
                            className="move-button"
                            onClick={() => moveTaskDown(index)}>
                            Move Down
                        </button>
                    </li>
                )}
            </ol>
        </div>
    );                                                                      
}

export default ToDoList;
