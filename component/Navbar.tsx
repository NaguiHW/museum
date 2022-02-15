import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from '../styles/Navbar.module.scss'

const Navbar = () => {
	const [search, setSearch] = useState<string>('');

	const router = useRouter()

	const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		router.push(`/search/${search}`)
	};

	const handleChange = (e: { target: { value: string; }; }) => {
		setSearch(e.target.value);
	};

	return (
		<div className={styles.navbarContainer}>
			<nav className={styles.navbar}>
				<Link href="/">My Museum</Link>
				<div className={styles.searchArea}>
					<form onSubmit={handleSubmit} className={styles.form}>
						<input type="text" name="search" id="search" value={search} onChange={handleChange} className={styles.search} />
						<button type="button" onClick={handleSubmit}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
					</form>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
