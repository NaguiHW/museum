import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import styles from '../../../styles/Item.module.scss';

const Item = () => {
	const router = useRouter();
  const id = typeof router.query.id === 'string' && router.query.id;
	const [result, setResult] = useState<{
		webImage: {
			url: string
		};
		titles: string[];
		principalMakers: [{
			name: string;
			placeOfBirth: string;
		}];
		plaqueDescriptionEnglish: string;
		colors: [{
			hex: string;
		}];
	}>({
		webImage: {
			url: '',
		},
		titles: [],
		principalMakers: [{
			name: '',
			placeOfBirth: '',
		}],
		plaqueDescriptionEnglish: '',
		colors: [{
			hex: '',
		}]
	});
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		console.log(id);
		axios
			.get(`https://www.rijksmuseum.nl/api/en/collection/${id}?key=${process.env.NEXT_PUBLIC_API_KEY}`)
			.then(resp => {
				console.log(resp.data);
				setResult(resp.data.artObject);
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
					<div className={styles.banner} style={{
						backgroundImage: `url("${result.webImage?.url}")`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundAttachment: 'fixed'
					}} />
					<div className={styles.itemArea}>
						<h3>Known as:</h3>
						<ul>
							{
								result.titles.map(title => (
									<li key={title}>{title}</li>
								))
							}
						</ul>
						<h3>Author(s):</h3>
						<ul>
							{
								result.principalMakers.map(maker => (
									<li key={maker.name}><b>{maker.name}</b> / {maker.placeOfBirth}</li>
								))
							}
						</ul>
						<h3>Description:</h3>
						<p>{result.plaqueDescriptionEnglish}</p>
						<h3>Colors:</h3>
						<div className={styles.colors}>
							{
								result.colors.map(color => (
									<div className={styles.color} style={{backgroundColor: color.hex}} key={color.hex}>
										<h5>{color.hex}</h5>
									</div>
								))
							}
						</div>
					</div>
				</div>
			)
	);
};

export default Item;