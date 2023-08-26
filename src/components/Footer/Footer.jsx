import React from 'react';
import Styles from './styles.module.css';
import { CgGym } from "react-icons/cg";

export default function Footer() {
    return (
        <footer className={Styles.footer}>
            <div className={Styles.footerContent}>
                <div className={Styles.footerLogo}>
                    <CgGym size={30} color={'white'} />
                    <span className={Styles.footerLogoText}>FITBIT</span>
                </div>
                <p className={Styles.footerText}>© 2023 Fitbit. All rights reserved.</p>
            </div>
        </footer>
    );
}
