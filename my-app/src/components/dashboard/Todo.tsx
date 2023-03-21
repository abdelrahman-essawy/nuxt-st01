import React from 'react';
import Button from '@/app/utilities/Button';
import styles from './dashboard.module.css';

interface TodoProps {
    id: string;
    task: string;
    completed: boolean;
    handleDelete: (id: string) => Promise<void>;
    handleToggle: (id: string) => Promise<void>;
}

export const Todo = ({
    id,
    task,
    completed,
    handleDelete,
    handleToggle,
}: TodoProps) => {
    const checkboxProps = {
        className: styles.formcontrol,
        type: 'checkbox',
        onClick: () => handleToggle(id),
    };

    return (
        <div className={styles.task} key={id}>
            <h2>{task}</h2>
            <div className={styles.contollers}>
                <input
                    {...checkboxProps}
                    defaultChecked={completed}
                />
                <Button color="danger" onClick={() => handleDelete(id)}>
                    Delete
                </Button>
            </div>
        </div>
    );
};
