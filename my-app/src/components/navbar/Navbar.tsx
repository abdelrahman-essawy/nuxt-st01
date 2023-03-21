import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/utilities/Button';
import styles from './navbar.module.css';

interface User {
    avatar: string;
    name: string;
}

interface NavbarProps {
    signIn: () => void;
    signOut: () => void;
    data: { user: User } | null;
    status: 'loading' | 'authenticated' | 'unauthenticated';
}

export const Navbar = ({ signIn, signOut, data, status }: NavbarProps) => {
    const renderLoading = () => <div>Loading...</div>;

    const renderAuthenticated = () => (
        <div className={styles.user}>
            <Image src={data?.user?.avatar || ''} alt="user image" width={40} height={40} priority />
            {data?.user.name}
            <Button onClick={signOut}>Sign Out</Button>
        </div>
    );

    const renderUnauthenticated = () => <Button onClick={signIn}>Sign In</Button>;

    return (
        <>
            <div className={styles.center}>
                <Link href="/">
                    <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
                </Link>
                <div className={styles.thirteen}>
                    <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
                </div>
            </div>

            {status === 'loading'
                ? renderLoading()
                : status === 'authenticated'
                    ? renderAuthenticated()
                    : renderUnauthenticated()}
        </>
    );
};
