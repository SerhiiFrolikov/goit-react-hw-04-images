import { useState, useEffect } from 'react';
import { PixabayAPI } from 'api/pixabayApi';
import Notiflix from 'notiflix';
import { Container } from './App.styled';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imagegallery/ImageGallery';
import { Button } from './button/Button';
import Loader from './loader/Loader';

const pixabayApi = new PixabayAPI();

const App = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState('1');
  const [cards, setCards] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    (async () => {
      setLoaderVisible(true);
      try {
        const { data } = await pixabayApi.fetchPhotos(query, pageNumber);
        handleSuccessFetch(data);
      } catch (error) {
        handleErrorFetch(error);
      } finally {
        setLoaderVisible(false);
      }
    })();
  }, [pageNumber, query]);

  const handleSubmitForm = currentQuery => {
    if (query !== currentQuery) {
      setQuery(currentQuery);
      setCards([]);
      setPageNumber(1);
      setLoadMoreBtn(false);
    }
  };

  const handleLoadMoreBtnClick = () => {
    setLoadMoreBtn(true);
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const handleSuccessFetch = data => {
    if (data.totalHits === 0) {
      setLoadMoreBtn(false);
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const images = data.hits.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      })
    );
    setLoaderVisible(false);
    setLoadMoreBtn(true);
    setCards(cards => [...cards, ...images]);
    if (data.hits.length < 12) {
      setLoadMoreBtn(false);
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  };

  const handleErrorFetch = error => {
    Notiflix.Notify.failure(error.message);
  };

  return (
    <Container>
      <Searchbar handleSubmit={handleSubmitForm} />
      <ImageGallery cards={cards} />
      {loaderVisible && <Loader />}
      {loadMoreBtn && <Button handleSubmit={handleLoadMoreBtnClick} />}
    </Container>
  );
};
export default App;
