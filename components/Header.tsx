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
                <p className={styles.projectName}>{`Overcooked`}</p>
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
            </nav>
        </div>
    )
}
