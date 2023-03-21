import React from 'react';
import styles from './dashboard.module.css';
import Button from '@/app/utilities/Button';
import { Todo } from './Todo';
import { useTasksCRUD } from '@/hooks/useTasksCRUD';

interface TodoData {
    id: string;
    task: string;
    completed: boolean;
}

const Dashboard: React.FC = () => {
    const [todoText, setTodoText] = React.useState('');
    const [todoTextError, setTodoTextError] = React.useState('');

    const { addTask, deleteTask, getTasks, toggleTask } = useTasksCRUD();
    const { error, isLoading, mutate, todos } = getTasks();

    const handleAddTodo = async (task: string) => {
        if (!task) {
            setTodoTextError('Please enter a task');
            return;
        }
        await addTask(task);
        setTodoText('');
        setTodoTextError('');
        mutate();
    };

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        mutate();
    };

    const handleToggle = async (id: string) => {
        await toggleTask(id);
        mutate();
    };

    return (
        todos && (
            <div className={styles.main}>
                <h1 className={styles.title}>Dashboard</h1>

                <div>
                    <div className={styles.newtask}>
                        <input
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo(e.currentTarget.value)}
                            onChange={(e) => setTodoText(e.target.value)}
                            value={todoText}
                            type="text"
                            placeholder="Add Tasks"
                        />
                        <Button onClick={() => handleAddTodo(todoText)} color="secondary">
                            Add
                        </Button>
                    </div>
                    <p className={styles.error}>{todoTextError}</p>

                    <h2>Tasks</h2>

                    <div className={styles.tasks}>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error</div>
                        ) : (
                            todos &&
                            todos.map(({ id, task, completed }: TodoData) => (
                                <Todo
                                    key={id}
                                    id={id}
                                    task={task}
                                    completed={completed}
                                    handleDelete={handleDelete}
                                    handleToggle={handleToggle}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default Dashboard;
