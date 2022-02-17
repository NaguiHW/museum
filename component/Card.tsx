import Link from "next/link";
import styles from "../styles/Card.module.scss";

const Card = ({
	title,
	id,
	principalOrFirstMaker,
	image
}:{
	title: string;
	id: string;
	principalOrFirstMaker: string;
	image: {
		url: string
	};
}) => {
	return (
		<Link href={`/item/${id}`}>
			<div className={styles.card}>
				<img src={image.url} alt={title} />
				<h2>{title}</h2>
				<h4>Main Author: {principalOrFirstMaker}</h4>
			</div>
		</Link>
	);
};

export default Card;
