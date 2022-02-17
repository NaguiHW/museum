import Link from "next/link";
import styles from '../styles/Navbar.module.scss'

const Navbar = () => (
	<div className={styles.navbarContainer}>
		<nav className={styles.navbar}>
			<Link href="/">My Museum</Link>
		</nav>
	</div>
);

export default Navbar;
