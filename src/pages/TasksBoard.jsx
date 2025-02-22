import { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { FilePenLine, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';

const TasksBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTask, setEditTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`https://task-trek-server-eight.vercel.app/tasks/${user?.email}`)
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
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const newTasks = [...tasks];
        const taskIndex = newTasks.findIndex(task => task._id === draggableId);
        newTasks[taskIndex].category = destination.droppableId;
        const [movedTask] = newTasks.splice(taskIndex, 1);
        const filteredTasks = newTasks.filter(task => task.category === destination.droppableId);
        filteredTasks.splice(destination.index, 0, movedTask);
        const updatedTasks = [
            ...newTasks.filter(task => task.category !== destination.droppableId),
            ...filteredTasks
        ];
        setTasks(updatedTasks);

        axios.put(`https://task-trek-server-eight.vercel.app/task/reorder`, {
            taskId: draggableId,
            newCategory: destination.droppableId,
            newIndex: destination.index
        })
            .then(() => console.log('Task reordered successfully'))
            .catch(error => console.error('Error updating task:', error));
    };

    const handleDelete = (taskId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://task-trek-server-eight.vercel.app/tasks/${taskId}`)
                    .then(() => {
                        setTasks(tasks.filter(task => task._id !== taskId));
                        Swal.fire(
                            'Deleted!',
                            'Your task has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting task:', error);
                        Swal.fire(
                            'Error!',
                            'There was an issue deleting the task.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleEdit = (task) => {
        setEditTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditedCategory(task.category);
        document.getElementById('edit_modal').showModal();
    };

    const handleEditSave = () => {
        const updatedTask = {
            ...editTask,
            title: editedTitle,
            description: editedDescription,
            category: editedCategory
        };
        setTasks(tasks.map(task => task._id === editTask._id ? updatedTask : task));

        axios.put(`https://task-trek-server-eight.vercel.app/tasks/${editTask._id}`, {
            title: editedTitle,
            description: editedDescription,
            category: editedCategory
        })
            .then(() => {
                document.getElementById('edit_modal').close();
                Swal.fire(
                    'Updated!',
                    'Your task has been updated.',
                    'success'
                );
            })
            .catch(error => {
                console.error('Error updating task:', error);
                setTasks(tasks.map(task => task._id === editTask._id ? editTask : task));
                Swal.fire(
                    'Error!',
                    'There was an issue updating the task.',
                    'error'
                );
            });
    };

    if (loading) return <Loading></Loading>;

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 p-4 bg-gray-100 min-h-screen">
                {['To-Do', 'In Progress', 'Done'].map(category => (
                    <Droppable droppableId={category} key={category}>
                        {(provided) => (
                            <div
                                className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-lg"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h2 className="text-xl font-bold text-center mb-4 text-gray-700">{category}</h2>
                                <div className="space-y-4">
                                    {tasks.filter(task => task.category === category).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h3 className="font-semibold text-lg text-blue-800">{task.title}</h3>
                                                    <p className="text-sm text-gray-600">{task.description}</p>
                                                    <div className="flex justify-end space-x-2 mt-2">
                                                        <button onClick={() => handleDelete(task._id)} className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"><Trash2 /></button>
                                                        <button onClick={() => handleEdit(task)} className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"><FilePenLine /></button>
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
