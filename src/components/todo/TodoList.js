import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'


function TodoList() {

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
    const [filter, setFilter] = useState("ALL")

    const addTodo = (todo) => {
        if (!todo.text) {
            return
        }

        const newTodos = [todo, ...todos]
        setTodos(newTodos);

    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text) {
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

    }, [todos]);

    return (
        <section>
            <h2>Fill your To-Do List</h2>
            <TodoForm onSubmit={addTodo} />
            <div>
                <button onClick={() => setFilter("DONE")}>Done</button>
                <button onClick={() => setFilter("OPEN")}>Open</button>
                <button onClick={() => setFilter("ALL")} >All</button>
            </div>
            <Todo filter={filter} className="todo-item" todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />

        </section>
    )
}

export default TodoList