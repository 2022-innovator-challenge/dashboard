import Link from "next/link";

type HeaderProps = {
    unselectSidebar: () => void
}

export default function Header(props: HeaderProps) {

    const { unselectSidebar } = props;

    // get user- and projectname 
    return (
        <div>
            <p>{`Hey Steve I hope you're having fun workin on Cool Project 123!`}</p>
            <nav className='header'>
                <ul className='header-list'>
                    <li>
                        <Link
                            href='/settings'
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
