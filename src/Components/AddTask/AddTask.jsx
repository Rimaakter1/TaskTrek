import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const AddTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [category, setCategory] = useState('To-Do');
    const navigate = useNavigate();
        const { user } = useContext(AuthContext);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskTitle) {
            alert("Task Title is required!");
            return;
        }
        if (taskTitle.length > 50) {
            alert("Task Title cannot exceed 50 characters!");
            return;
        }

        if (taskDescription.length > 200) {
            alert("Task Description cannot exceed 200 characters!");
            return;
        }

        const timestamp = new Date().toISOString();

        const newTask = {
            title: taskTitle,
            description: taskDescription,
            timestamp: timestamp,
            category: category,
            email: user?.email,
        };

        try {
            const response = await axios.post('http://localhost:5000/tasks', newTask);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task. Please try again.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="taskTitle" className="block text-lg">Task Title</label>
                    <input
                        type="text"
                        id="taskTitle"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className="w-full p-2 mt-2 border rounded"
                        placeholder="Enter task title"
                        maxLength="50"
                    />
                </div>

                <div>
                    <label htmlFor="taskDescription" className="block text-lg">Task Description (Optional)</label>
                    <textarea
                        id="taskDescription"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="w-full p-2 mt-2 border rounded"
                        placeholder="Enter task description (max 200 characters)"
                        maxLength="200"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-lg">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 mt-2 border rounded"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
