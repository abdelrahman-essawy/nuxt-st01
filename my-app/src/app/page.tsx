"use client"
import { Inter } from 'next/font/google'
import styles from './styles/page.module.css'
import { Navbar } from './components/navbar/Navbar'
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data, status } = useSession()
  console.log(data, status)
  return (
    <main className={styles.main}>
      {/* <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p> */}

      <header className={styles.header}>
        <Navbar signIn={signIn} signOut={signOut} session={data} />
      </header>

    </main>

  )
}
