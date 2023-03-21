"use client"
import Button from '@/app/utilities/Button'
import Image from 'next/image'
import React, { use } from 'react'
import styles from './singin.module.css'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

const getUsers = async () => await fetch('http://localhost:4000/users')
    .then(response => response.json())
    .then(json => json)

const getUsersPromise = getUsers()

interface User {
    id: number
    name: string
    avatar: string
    username: string
}

const handleSubmission = async (username: String, password: String, setAuthError: (e: string) => void, router: any) => {
    const res = await signIn('credentials', {
        username,
        password,
        callbackUrl: 'http://localhost:3000',
        redirect: false
    })
    res?.status === 401 && setAuthError('Invalid username or password')
    res?.status === 200 && router.push('/')
}


const Page = () => {
    const { data, status } = useSession()
    console.log(data, status)
    const users = use(getUsersPromise)
    const [authError, setAuthError] = React.useState<String>('')

    const [selectedUser, setSelectedUser] = React.useState<String>('' || users[0]?.username)
    const [password, setPassword] = React.useState<String>('')

    const router = useRouter();
    return (
        <div className={styles.container}>
            <Image src={
                users.find(({ username }: User) => username === selectedUser)?.avatar
            } alt={'selected user image'} width={100} height={100} priority />

            <label>Username</label>
            <select
                defaultChecked={users[0].username}
                onChange={
                    (e) => {
                        setSelectedUser(e.target.value)
                    }
                } style={{ padding: 8, width: 300 }} name="cars" id="cars">
                {users.map(({ id, name, username }: User) => <option key={id} value={username}>
                    {name}
                </option>)}
            </select>

            <label>Password</label>
            <input
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: 8, width: 300 }} type="password" placeholder="Enter Password" required />

            <Button onClick={(e) => handleSubmission(selectedUser, password, setAuthError, router)}>Sign in</Button>

            <p>{authError}</p>
        </div>
    )
}
export default Page