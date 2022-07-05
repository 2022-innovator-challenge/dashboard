import Link from "next/link";
import { SetStateAction } from "react";
import styles from '../styles/Sidebar.module.css';

type SidebarElement = {
    name: string,
    isSelected: boolean,
    link: string
}

type SidebarProps = {
    sidebarElements: SidebarElement[],
    setSidebarElements: (value: SetStateAction<SidebarElement[]>) => void,
}

export default function LeftNavbar(props: SidebarProps) {

    const { sidebarElements, setSidebarElements } = props;

    function handleSelect(elementName: string) {
        setSidebarElements(
            sidebarElements.map(element => (
                element.name === elementName
                ? { ...element, isSelected: true } 
                : { ...element, isSelected: false }
            ))
        )
      }

    return (
        <nav className='sidebar'>
            <ul className='sidebar-list'>
                {sidebarElements.map(element =>
                    <li 
                        key={element.name}
                        onClick={() => handleSelect(element.name)}
                        className={element.isSelected ? styles.isSelected : ""}
                    >
                        <Link href={element.link}>
                            <a>{element.name}</a>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}
