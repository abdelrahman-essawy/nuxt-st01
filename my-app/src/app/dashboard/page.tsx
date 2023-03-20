"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '../styles/page.module.css'
import Button from '../utilities/Button'
import { redirect } from 'next/navigation'
const page = ({ }) => {
    const { data, status } = useSession()

    return (
        <div className={styles.main}>

            <div>
                <h1>Dashboard</h1>
                <p>
                    <strong>Status:</strong> {status}
                </p>
                {status === "authenticated" && data ? (
                    <>
                        <p>
                            <strong>Email:</strong> {data?.user?.email}
                        </p>
                        <p>
                            <strong>Name:</strong> {data?.user?.name}
                        </p>
                        <p>
                            <strong>Image:</strong> {data?.user?.image}
                        </p>
                        <Button onClick={() => signIn()}>Sign in</Button>

                    </>
                ) : (
                    redirect('/')
                )}
            </div>
        </div>
    )
}

export default page