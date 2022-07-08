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
                <p>{`Hey Steve I hope you're having fun workin on Cool Project 123!`}</p>
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
