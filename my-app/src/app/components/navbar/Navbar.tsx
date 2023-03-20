import Button from '@/app/utilities/Button'
import Image from 'next/image'
import React from 'react'
import styles from './navbar.module.css'

export const Navbar = () => {
    return (
        <>
            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
                <div className={styles.thirteen}>
                    <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
                </div>
            </div>

            <Button>Login</Button>
        </>
    )
}
