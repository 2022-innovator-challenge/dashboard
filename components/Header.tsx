import Link from "next/link";
import styles from '../styles/Header.module.css';

type HeaderProps = {
    unselectSidebar: () => void
}

export default function Header(props: HeaderProps) {

    const { unselectSidebar } = props;

    // get user- and projectname 
    return (
        <div>
            <nav className={styles.header}>
                <div className="emptyDiv"></div>
                <div className={styles.projectName}>
                    <p>{`Overcooked`}</p>
                </div>
                <div className={styles.headerButton}>
                    <ul className={styles.headerList}>
                        <li>
                            <Link
                                href='/settings/user'
                            >
                                <a onClick={unselectSidebar}>Settings</a>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/logout'
                            >
                                <a onClick={unselectSidebar}>Logout</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
