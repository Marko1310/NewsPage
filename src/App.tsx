// react
import React, { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

// css
import './App.scss';

// context
import { GlobalContext } from './context/GlobalContext';

// fetch calls
import newsApiServices from './services/newsApiServices.js';
import localStorageServices from './services/localStorageServices.js';

// components
import FeaturedLatest from './components/FeaturedLatest/FeaturedLatest';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Search from './components/Search/Search';
import Sidebar from './components/Sidebar/Sidebar';
import Article from './components/News/Article';

export interface Articles {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
}

export interface Sources {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

function App() {
  //context
  const context = useContext(GlobalContext);
  if (context === null) return null;
  const { notSmallViewport } = context;

  // genereal state
  const [loading, setLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // news state
  const [category, setCategory] = useState<string>('Home');

  const [articles, setArticles]: [Articles[], React.Dispatch<React.SetStateAction<Articles[]>>] = useState<Articles[]>(
    [],
  );
  const [sources, setSources]: [Sources[], React.Dispatch<React.SetStateAction<Sources[]>>] = useState<Sources[]>([]);

  const [query, setQuery]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('');
  const [input, setInput]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('');

  // latest news state
  const [latestNews, setLatestNews]: [Articles[], React.Dispatch<React.SetStateAction<Articles[]>>] = useState<
    Articles[]
  >([]);
  const pageSize: number = 20;
  const [page, setPage]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(1);
  const [error, setError]: [Error | null, React.Dispatch<React.SetStateAction<Error | null>>] = useState<Error | null>(
    null,
  );

  // state for featured/latest button
  const [featuredLatest, setFeaturedLatest]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState<string>('featured');

  // functions//

  // get sources
  useEffect(() => {
    newsApiServices.getSources().then((sources) => setSources(sources));
  }, []);

  // get articles
  useEffect(() => {
    if (category !== 'Favorites') {
      setLoading(true);
      newsApiServices.getArticles(category, query).then((articles) => {
        setArticles(articles);
        setLoading(false);
      });
    } else if (category === 'Favorites') {
      const favoriteArticles = localStorage.getItem('favoriteArticles');
      const parsedArticles = favoriteArticles ? JSON.parse(favoriteArticles) : [];
      setArticles(parsedArticles);
    }
  }, [category, query]);

  // get latest articles
  useEffect(() => {
    newsApiServices.getLatestNews(pageSize, page).then((latestArticles) => setLatestNews(latestArticles));
    setPage(2);
  }, []);

  // change states depending on window size
  useEffect(() => {
    if (notSmallViewport) setIsMenuOpen(false);
  }, [notSmallViewport]);

  // load more articles
  const fetchMoreData = () => {
    setTimeout(() => {
      newsApiServices
        .getLatestNews(pageSize, page)
        .then((latestArticles: Articles[]) => {
          setLatestNews((prevState: Articles[]) => [...prevState, ...latestArticles]);
        })
        .catch((err) => setError(err));
    }, 1500);
    setPage((prevState) => prevState + 1);
  };

  // handle favorite articles
  const handleFavorite = function (article: Articles) {
    const storedArticles = localStorageServices.getFavorites();

    if (storedArticles.length === 0) {
      localStorageServices.setFavorite(article);
    } else {
      const articleExist = localStorageServices.isFavorite(storedArticles, article);
      if (!articleExist) {
        storedArticles.push(article);
        localStorageServices.setFavorite(storedArticles);
      } else {
        const newArticleArray = localStorageServices.removeFavorite(storedArticles, articleExist);
        localStorageServices.setFavorite(newArticleArray);
      }
    }
  };

  return (
    <div className="App">
      {isMenuOpen && (
        <Menu
          category={category}
          isMenuOpen={isMenuOpen}
          handleChangeCategory={(c: string) => {
            setCategory(c);
            setQuery('');
            setIsMenuOpen(false);
            setFeaturedLatest('featured');
          }}
          openCloseMenu={(prevState: boolean) => setIsMenuOpen(!prevState)}
          input={input}
          changeInput={(i: string) => {
            setInput(i);
          }}
          queryUpdate={(q: string) => {
            setQuery(q);
            setInput('');
          }}
        />
      )}
      {notSmallViewport && <Navbar />}
      <div className="main-container">
        {!isMenuOpen && (
          <Search
            isMenuOpen={isMenuOpen}
            input={input}
            changeInput={(i: string) => {
              setInput(i);
            }}
            openCloseMenu={(prevState: boolean) => setIsMenuOpen(!prevState)}
            queryUpdate={(q: string) => {
              setQuery(q);
              setInput('');
            }}
          />
        )}
        {!isMenuOpen && !notSmallViewport && (
          <FeaturedLatest
            featuredLatest={featuredLatest}
            toggleFeaturedLatest={(selectedNews: string) => {
              console.log(selectedNews);
              setQuery('');
              setFeaturedLatest(selectedNews);
            }}
          />
        )}
        <div className="grid-container">
          {notSmallViewport && (
            <Sidebar
              category={category}
              handleChangeCategory={(c: string) => {
                setQuery('');
                setCategory(c);
              }}
            />
          )}
          {loading ? (
            <div className="loading">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#1d1d1b"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              <h2 className="loading-title">Loading</h2>
            </div>
          ) : (
            !isMenuOpen && (
              <News
                articles={articles}
                sources={sources}
                category={category}
                fetchMoreData={fetchMoreData}
                latestNews={latestNews}
                error={error}
                handleFavorite={handleFavorite}
                featuredLatest={featuredLatest}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
