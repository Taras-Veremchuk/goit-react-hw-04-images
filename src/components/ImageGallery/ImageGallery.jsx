import PropTypes from 'prop-types';
import { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal';
import Button from 'components/Button/Button';
import { OopsMessage } from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export default function ImageGallery({ images, loading, onLoadMoreClick }) {
  const [text, setText] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  // == Modal ==
  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };
  // == Image ==
  const onClickImg = (url, text) => {
    toggleModal();
    setLargeImageURL(url);
    setText(text);
  };
  // == Return ==
  return (
    <>
      <ImageGalleryItem array={images} onClickImg={onClickImg} />
      {images.length > 0 ? (
        loading ? (
          <Loader />
        ) : (
          <Button onClick={onLoadMoreClick} />
        )
      ) : (
        <OopsMessage>
          OOPS...There is no valid answer for your query. Try again
        </OopsMessage>
      )}
      {showModal && (
        <Modal onClose={toggleModal} url={largeImageURL} text={text} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  onLoadMoreClick: PropTypes.func,
  loading: PropTypes.bool,
};
