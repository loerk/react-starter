import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'


function TodoList() {

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]
        setTodos(newTodos);

    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }


    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr)
    }



    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)


    }

    useEffect(() => {
        window.addEventListener("beforeunload", safeData);
        function safeData() {
            localStorage.setItem("todos", JSON.stringify(todos))
        }
        return () => window.removeEventListener("beforeunload", safeData);
    }, [todos]);

    return (
        <section className='todo-section'>
            <h2>Fill your To-Do List</h2>
            <TodoForm onSubmit={addTodo} />
            <div>
                <button onClick={() => { setTodos(todos.filter(todo => todo.isComplete)) }}>Done</button>
                <button onClick={() => { setTodos(todos.filter(todo => !todo.isComplete)) }}>Open</button>
                <button >All</button>
            </div>
            <Todo className="todo-item" todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />

        </section>
    )
}

export default TodoList