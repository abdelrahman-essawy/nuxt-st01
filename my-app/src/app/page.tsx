"use client"
import { Inter } from 'next/font/google'
import styles from './styles/page.module.css'
import { Navbar } from '../components/navbar/Navbar'
import { useSession, signIn, signOut } from "next-auth/react"
import Dashboard from '@/components/dashboard/Dashboard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data, status } = useSession()
  return (
    <main className={styles.main}>

      <header className={styles.header}>
        <Navbar signIn={signIn} signOut={signOut} data={data} status={status} />
      </header>


      {
        status === 'loading' ? <p className={styles.title}>Loading...</p> :
          <h1 className={styles.title}>
            Todo App
          </h1>

      }
      {
        data && status === 'authenticated' &&
        <Dashboard />
      }

    </main>

  )
}
