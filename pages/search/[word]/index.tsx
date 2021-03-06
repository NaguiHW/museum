import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import Card from "../../../component/Card";
import styles from '../../../styles/Search.module.scss';

const SearchWord = () => {
	const router = useRouter();
  const word = typeof router.query.word === 'string' && router.query.word;
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		axios
			.get(`https://www.rijksmuseum.nl/api/en/collection?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${word}&imgonly=true`)
			.then(resp => {
				setResults(resp.data.artObjects);
				setLoading(false);
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	return (
		loading
      ? (
        <div className={styles.loadingContainer}>
          <ReactLoading type="bubbles" color="#6E7E85" height={667} width={375} />
        </div>
      ):(
				<div className={styles.container}>
					<div className={styles.banner}>
						<h1>Searched: {word}</h1>
					</div>
					<div className={styles.resultsArea}>
						{
							results.length > 0
								? (
									results.map(({ title, objectNumber, principalOrFirstMaker, headerImage }) => (
										<Card title={title} id={objectNumber} principalOrFirstMaker={principalOrFirstMaker} image={headerImage} key={objectNumber} />
									))
								) : (
									<h1>The search found anything</h1>
								)
						}
					</div>
				</div>
			)
	);
};

export default SearchWord;
