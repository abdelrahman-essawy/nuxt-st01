import Button from '@/app/utilities/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'

interface NavbarProps {
    signIn: () => void
    signOut: () => void
    data: any
    status: 'loading' | 'authenticated' | 'unauthenticated'
}

export const Navbar = ({ signIn, signOut, data, status }: NavbarProps) => {
    return (
        <>
            <div
                className={styles.center}>
                <Link href="/">
                    <Image
                        className={styles.logo}
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />
                </Link>
                <div className={styles.thirteen}>
                    <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
                </div>
            </div>

            {
                status === 'loading' ?
                    <div>Loading...</div>
                    :
                    status === 'authenticated' &&
                        data ?
                        <div className={styles.user}>
                            <Image src={data.user.avatar} alt="user image" width={40} height={40} priority />
                            {data.user.name}
                            <Button onClick={signOut}>Sign Out</Button>
                        </div>
                        :
                        <Button onClick={signIn}>Sign In</Button>

            }
        </>
    )
}
