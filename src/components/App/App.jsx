import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/Loader';
import Searchbar from '../Searchbar';
import { Ap, HelloMessage } from './App.styled';
import ImageGallery from 'components/ImageGallery/ImageGallery';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!value) {
      return;
    }

    setLoading(true);

    const KEY = '34864361-70a0af8bc93c899dccf6f4508';
    const perPage = 12;
    const URL = `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
    fetch(URL)
      .then(data => {
        if (data.ok) {
          return data.json();
        }
      })
      .then(images => {
        setImages(prevstate => [...(prevstate || []), ...images.hits]);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, [page, value]);

  // == Searchbar method ==
  const handleFormSubmit = value => {
    setValue(value);
    setImages(null);
    setPage(1);
  };

  // == Button Load More ==
  const onLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  //== Return ==
  return (
    <Ap>
      <Searchbar onSubmit={handleFormSubmit} />
      {!value && <HelloMessage>Hello! Find what you like</HelloMessage>}
      {loading && <Loader />}
      {images && (
        <ImageGallery
          value={value}
          images={images}
          page={page}
          loading={loading}
          onLoadMoreClick={onLoadMoreClick}
        />
      )}
      <ToastContainer autoClose={3000} />
    </Ap>
  );
}
