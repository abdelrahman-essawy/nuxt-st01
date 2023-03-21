import Button from '@/app/utilities/Button'
import React from 'react'
import styles from './dashboard.module.css'

interface TodoProps {
    id: string
    task: string
    completed: boolean
    handleDelete: (id: string) => Promise<void>
    handleToggle: (id: string) => Promise<void>
}
export const Todo = ({
    id,
    task,
    completed,
    handleDelete,
    handleToggle
}: TodoProps) => {
    return (
        <div className={styles.task} key={id}>
            <h2>{task}</h2>
            <p>{completed}</p>
            <div className={styles.contollers}>
                {
                    completed ?
                        <input onClick={() => handleToggle(id)} className={styles.formcontrol} type="checkbox" defaultChecked />
                        :
                        <input onClick={() => handleToggle(id)} className={styles.formcontrol} type="checkbox" />
                }
                <Button color='danger' onClick={() => handleDelete(id)}>Delete</Button>
            </div>
        </div>
    )

}
