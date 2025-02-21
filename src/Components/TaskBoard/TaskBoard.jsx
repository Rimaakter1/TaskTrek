import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            });
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        const newTasks = [...tasks];
        const taskIndex = newTasks.findIndex(task => task._id === draggableId);
        const task = newTasks[taskIndex];

        newTasks[taskIndex].category = destination.droppableId;

        setTasks(newTasks);

        axios.put(`http://localhost:5000/tasks/reorder`, {
            taskId: task._id,
            newCategory: destination.droppableId,
            newIndex: destination.index
        }).catch(error => {
            console.error('Error updating task:', error);
        });
    };

    if (loading) return <p className="text-center text-xl">Loading tasks...</p>;

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex space-x-6 p-6 bg-gray-100 min-h-screen">
                {['To-Do', 'In Progress', 'Done'].map(category => (
                    <Droppable droppableId={category} key={category}>
                        {(provided) => (
                            <div
                                className="w-1/3 p-4 bg-white rounded-lg shadow-lg"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h2 className="text-xl font-bold text-center mb-4 text-gray-700">{category}</h2>
                                <div className="space-y-4">
                                    {tasks
                                        .filter(task => task.category === category)
                                        .map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
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
                                                            <button className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                                            <button className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">Edit</button>
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
        </DragDropContext>
    );
};

export default TaskBoard;
