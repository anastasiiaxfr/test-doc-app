import styles from "./header.module.sass"
import Link from "next/link";


export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>GetMyDoc</Link>
            <nav className={styles.menu}>
                <Link href="/users">Users</Link>
                <Link href="/docs">Docs</Link>
                <Link href="/get-doc">Offers</Link>
            </nav>
        </header>
    )
}