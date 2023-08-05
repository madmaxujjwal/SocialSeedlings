// Navbar.tsx
'use client'
// Navbar.tsx
// Navbar.tsx
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import instalogo from '../photos/instalogo.jpg'
const Navbar: React.FC = () => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
      <li>
          
          <img  src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png' style={{width:'70px',height:"60px"}} className={styles.navHeading}></img>
       
      </li>
      <li>
          
          <h1 className={styles.navHeading}>Instagram</h1>
       
      </li>
        <li>
          
            <h1 className={styles.navHeading}>Home</h1>
         
        </li>
        <li>
          
            <h1 className={styles.navHeading}>About</h1>
          
        </li>
        <li>
          
            <h1 className={styles.navHeading}>Contact</h1>
          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
