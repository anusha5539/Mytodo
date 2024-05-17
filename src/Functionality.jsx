import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Functionality = () => {
    // for input state
    const [todo, setTodo] = useState("")
    // for handling all todo
    const [todos, setTodos] = useState([]);
    //for  upper checked box 
    const [showFinished, setshowFinished] = useState(true)

    // for saving and retrieving data from local storage
    useEffect(() => {
        let todoString = localStorage.getItem("todos");
        if (todoString) {
            let todos = JSON.parse(localStorage.getItem("todos"))
            setTodos(todos);
        }
    }, [])

    const saveToLs = (() => {
        localStorage.setItem("todos", JSON.stringify(todos))

    }
    )

    // for upper check box
    const toggleChange = () => {
        setshowFinished(!showFinished)
    }

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo("");
        // console.log(todos)
        saveToLs();

    }
    const handleChange = (event) => {
        setTodo(event.target.value);

    }
    const handleCheckbox = (event) => {
        const id = event.target.name;
        // console.log(id);
        const index = todos.findIndex(item => {
            return item.id === id;
        })
        // console.log(index);
        let newtodos = [...todos];
        newtodos[index].isCompleted = !newtodos[index].isCompleted;
        setTodos(newtodos)
        saveToLs();

    }
    const handleEdit = (e, id) => {
        let todo = todos.filter(item => (item.id === id));
        setTodo(todo[0].todo);
        let newtodo = todos.filter(item => {
            return item.id !== id
        })
        setTodos(newtodo)
        saveToLs();

    }


    const handleDelete = (e, id) => {
        // console.log(`the id is ${id}`);

        let newtodos = todos.filter(item => {
            return item.id !== id;
        });
        setTodos(newtodos);
        saveToLs();

    }
    return (
        <>
            <div className="mx-2 md:container bg-orange-200 p-5 md:mx-auto my-5 rounded-xl min-h-[80vh] md:w-1/2">
                <h1 className="font-bold text-xl text-center">myTaskk - Manage your todos at one place</h1>
                <div className="addTodo mt-5 ">
                    <h1 className="text-lg font-bold mb-5">Add a Todos</h1>
                    <div className="flex">
                        <input type="text" onChange={handleChange} value={todo} className="text-black w-full rounded-full px-2 py-1 "></input>
                        <button disabled={todo.length <= 3} className="bg-orange-500 hover:bg-orange-600 rounded-full text-sm font-bold text-white py-1 p-3  mt-3 disabled:bg-orange-600 ml-5" onClick={handleAdd}>Add</button>
                    </div>
                </div>
                <input type="checkbox" checked={showFinished} onChange={toggleChange} className="m-5" />Show finished
                <div className="h-[1px] bg-black opacity-15 w-full mx-auto my-2"></div>
                <h2 className="text-lg font-bold">Your Todos</h2>
                <div className="todos">
                    {todos == 0 && <div className="m-5">No todos found</div>}
                    {todos.map((cvalue) => {
                        return (showFinished || !cvalue.isCompleted) &&
                            <div key={cvalue.id} className="todo flex justify-between md:w-1/2 my-4">
                                <div className="flex gap-5">
                                    <input onChange={handleCheckbox} name={cvalue.id} type="checkbox" checked={cvalue.isCompleted} className=""></input>
                                    <div className={cvalue.isCompleted ? "line-through " : ""}>{cvalue.todo}</div>
                                </div>
                                <div className="buttons flex h-full ">
                                    <button onClick={(e) => handleEdit(e, cvalue.id)} className="bg-orange-500 hover:bg-orange-600 rounded-md text-sm font-bold text-white py-1 p-3 mx-2"><FaEdit /></button>

                                    <button onClick={(e) => {
                                        const confirmed = window.confirm("Are you sure you want to delete?");
                                        if (confirmed) {
                                            handleDelete(e, cvalue.id);
                                        }
                                    }} className="bg-orange-500 hover:bg-orange-600 rounded-md text-sm font-bold text-white py-1 px-3 mx-2"><MdDelete /></button>

                                </div>

                            </div >



                    })}

                </div>
            </div >
        </>
    )
}

export default Functionality