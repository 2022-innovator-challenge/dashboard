import Link from "next/link";
import styles from '../styles/Header.module.css';
import Image from 'next/image'

type HeaderProps = {
    unselectSidebar: () => void
}

export default function Header(props: HeaderProps) {

    const { unselectSidebar } = props;

    // get user- and projectname 
    return (
        <div className={styles.wrapper}>
            <nav className={styles.header}>
                <div className="emptyDiv"></div>
                <div className={styles.projectName}>
                    <p>{`Overcooked`}</p>
                </div>
                <div className={styles.rightHeader}>
                    <div className={styles.dropdown}>
                        <div className={styles.dropdownBtn}>
                            <Image src="/settings.png" alt="me" width="30" height="30" />
                        </div>
                        <div className={styles.dropdownContent}>
                            <Link
                                href='/settings/user'
                            >
                                <a onClick={unselectSidebar}>Settings</a>
                            </Link>
                            <Link 
                                href='/logout'
                            >
                                <a onClick={unselectSidebar}>Logout</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
