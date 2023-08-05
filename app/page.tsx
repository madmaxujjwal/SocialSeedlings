import Image from 'next/image'
import styles from './page.module.css'

import Feedpage from '@/components/feedpage'

import Navbar from '@/components/Navbar'
export default function Home() {
  return (
    <main className={styles.main} style={{"background":"white"}}>
      <Navbar></Navbar>
      <h1  style={{'color':"black"}}>INSTAGRAM</h1>
      <Feedpage/>
      
    </main>
  )
}
