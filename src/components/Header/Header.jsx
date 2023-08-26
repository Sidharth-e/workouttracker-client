import React from 'react';
import Styles from './styles.module.css';
import { CgGym } from "react-icons/cg";

export default function Header() {
    return (
        <header className={Styles.navbar}>
            <div className={Styles.logoContainer}>
                <CgGym size={40} color={'white'} className={Styles.logoIcon} />
                <span className={Styles.logoText}>FITBIT</span>
            </div>
        </header>
    );
}
