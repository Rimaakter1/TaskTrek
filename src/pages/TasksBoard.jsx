import { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';

const TasksBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTask, setEditTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:5000/tasks/${user?.email}`)
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            });
    }, [user?.email]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        const newTasks = [...tasks];
        const taskIndex = newTasks.findIndex(task => task._id === draggableId);
        newTasks[taskIndex].category = destination.droppableId;
        setTasks(newTasks);

        axios.put(`http://localhost:5000/tasks/reorder`, {
            taskId: draggableId,
            newCategory: destination.droppableId,
            newIndex: destination.index
        }).catch(error => {
            console.error('Error updating task:', error);
        });
    };

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:5000/tasks/${taskId}`)
            .then(() => setTasks(tasks.filter(task => task._id !== taskId)))
            .catch(error => console.error('Error deleting task:', error));
    };

    const handleEdit = (task) => {
        setEditTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditedCategory(task.category); // Set category for editing
        document.getElementById('edit_modal').showModal();
    };

    const handleEditSave = () => {
        axios.put(`http://localhost:5000/tasks/${editTask._id}`, {
            title: editedTitle,
            description: editedDescription,
            category: editedCategory
        })
            .then(() => {
                setTasks(tasks.map(task => task._id === editTask._id ? { ...task, title: editedTitle, description: editedDescription, category: editedCategory } : task));
                document.getElementById('edit_modal').close();
            })
            .catch(error => console.error('Error updating task:', error));
    };

    if (loading) return <p className="text-center text-xl">Loading tasks...</p>;

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex space-x-6 p-6 bg-gray-100 min-h-screen">
                {['To-Do', 'In Progress', 'Done'].map(category => (
                    <Droppable droppableId={category} key={category}>
                        {(provided) => (
                            <div className="w-1/3 p-4 bg-white rounded-lg shadow-lg" ref={provided.innerRef} {...provided.droppableProps}>
                                <h2 className="text-xl font-bold text-center mb-4 text-gray-700">{category}</h2>
                                <div className="space-y-4">
                                    {tasks.filter(task => task.category === category).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <h3 className="font-semibold text-lg text-blue-800">{task.title}</h3>
                                                    <p className="text-sm text-gray-600">{task.description}</p>
                                                    <div className="flex justify-end space-x-2 mt-2">
                                                        <button onClick={() => handleDelete(task._id)} className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                                        <button onClick={() => handleEdit(task)} className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">Edit</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>

            {/* DaisyUI Modal */}
            <dialog id="edit_modal" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Edit Task</h3>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="input input-bordered w-full mt-4"
                        placeholder="Task Title"
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="textarea textarea-bordered w-full mt-4"
                        placeholder="Task Description"
                    />
                    {/* Dropdown to select category */}
                    <select
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                        className="select select-bordered w-full mt-4"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={() => document.getElementById('edit_modal').close()}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleEditSave}>Save</button>
                    </div>
                </form>
            </dialog>
        </DragDropContext>
    );
};

export default TasksBoard;
