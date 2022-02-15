import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

	const router = useRouter()

	const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
    if (search !== '') {
      router.push(`/search/${search}`);
    }
	};

	const handleChange = (e: { target: { value: string; }; }) => {
		setSearch(e.target.value);
	};

  useEffect(() => {
    axios
      .get(`https://www.rijksmuseum.nl/api/en/collection?key=${process.env.NEXT_PUBLIC_API_KEY}`)
      .then(resp => {
        const random = Math.floor((Math.random() * 10))
        const { url } = resp.data.artObjects[random].webImage;
        setBackgroundImage(url);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    loading
      ? (
        <div className={styles.loadingContainer}>
          <ReactLoading type="bubbles" color="#6E7E85" height={667} width={375} />
        </div>
      ):(
        <div className={styles.container} style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'

        }}>
          <Head>
            <title>My Museum</title>
            <meta name="description" content="My Museum - App test" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={styles.searchArea}>
            <h1>Search whatever you want!</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" name="search" id="search" onChange={handleChange} value={search} />
              <button type='button' onClick={handleSubmit}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
          </div>
        </div>
      )
  )
}

export default Home;
