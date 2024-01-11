import React from 'react';
import styles from './styles.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbarContainer}>
            <a href='/' className={styles.navbarItem}>Exercise 1</a>
            <a href='/exercise2' className={styles.navbarItem}>Exercise 2</a>
        </nav>
    );
};

export default Navbar;
