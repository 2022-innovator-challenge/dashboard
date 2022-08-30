import Link from "next/link";
import styles from '../styles/Header.module.css';
import Image from 'next/image'
import { useState } from "react";

export default function Header() {

    const [dropdownElements, setDropdownElements] = useState([
        { name: 'Profile', isSelected: false, link: '/profile' },
        { name: 'Settings ', isSelected: false, link: '/settings' },
        { name: 'Logout ', isSelected: false, link: '/logout' }
    ]);

    function unselectDropdownElement() {
    setDropdownElements(
        dropdownElements.map(element => ({ ...element, isSelected: false }))
    )
    }

    function handleSelect(elementName: string) {
        setDropdownElements(
            dropdownElements.map(element => (
              element.name === elementName
              ? { ...element, isSelected: true } 
              : { ...element, isSelected: false }
          ))
      )
  }

    // get user- and projectname 
    return (
        <div className={styles.wrapper}>
            <nav className={styles.header}>
                <div className={styles.home}>
                    <Link 
                        href='/'
                    >
                        <a onClick={unselectDropdownElement}><Image src="/home.svg" alt="settings" width="30" height="30" /></a>
                    </Link>
                </div>
                <div className={styles.projectName}>
                    <p>{`Overcooked`}</p>
                </div>
                <div className={styles.rightHeader}>
                    <div className={styles.dropdown}>
                        <div className={styles.dropdownBtn}>
                            <Image src="/settings.png" alt="settings" width="30" height="30" />
                        </div>
                        <div className={styles.dropdownContent}>
                            {dropdownElements.map(element =>
                                <Link 
                                    href={element.link}
                                    key={element.name}
                                >
                                    <a
                                        onClick={() => handleSelect(element.name)}
                                        className={element.isSelected ? styles.isSelected : ""}
                                    >{element.name}</a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
