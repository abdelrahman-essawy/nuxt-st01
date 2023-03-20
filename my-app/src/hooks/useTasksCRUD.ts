import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react"
import useSWR from 'swr'
export const useTasksCRUD = () => {
    const { data, status } = useSession()
    const { user } = data as any
    axios.defaults.baseURL = 'http://localhost:4000'
    const tasksPrefix = '/todos'

    const getTasks = () => {
        const tasksFetcher = (url: string) => axios.get(url, {
            auth: {
                username: user.username,
                password: user.password
            }
        }).then(res => res.data)

        const { data: todos, error, isLoading, mutate } = useSWR(`${axios.defaults.baseURL}${tasksPrefix}`, tasksFetcher)
        return { todos, error, isLoading, mutate }
    }

    const addTask = (task: string) =>
        axios.post(`${tasksPrefix}`, {
            task
        }, {
            auth: {
                username: user.username,
                password: user.password
            }
        })

    const toggleTask = (id: string) =>
        axios.put(`${tasksPrefix}/${id}`, {
            completed: true
        }, {
            auth: {
                username: user.username,
                password: user.password
            }
        })

    const deleteTask = (id: string) => axios.delete(`${tasksPrefix}/${id}`, {
        auth: {
            username: user.username,
            password: user.password
        }
    })

    return { getTasks, addTask, toggleTask, deleteTask }
}
