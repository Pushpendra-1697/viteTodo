import { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        id: '',
        name: '',
        status: "todo" // can also be inprogress or closed
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3) {
            return toast.error("A task must have more than 3 Characters")
        }

        if (task.name.length > 100) {
            return toast.error("A task must not be more than 100 Characters")
        }

        setTasks((prev) => {
            const list = [...prev, task];
            localStorage.setItem("tasks", JSON.stringify(list));
            return list;
        });
        toast.success("Task Created");
        setTask({
            id: '',
            name: '',
            status: "todo"
        });
    };

    const { name, status } = task;
    return (<form onSubmit={handleSubmit}>
        <input placeholder="Enter Task" type="text" className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-10 w-64 px-1" onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} value={name} />
        <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create</button>
    </form>);
}

export default CreateTask;