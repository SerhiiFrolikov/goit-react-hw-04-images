import PropTypes from 'prop-types';
import { useState } from 'react';
import { Gallery } from './ImageGallery.styled';
import { Modal } from '../modal/Modal';
import ImageGalleryItem from '../imagegalleryitem/ImageGalleryItem';

export const ImageGallery = ({ cards }) => {
  const [url, setUrl] = useState(null);
  // const [openModal, setOpenModal] = useState(false);

  const addModalUrl = url => setUrl(url);

  const handleCloseModal = () => setUrl(null);

  return (
    <>
      <Gallery>
        {cards.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              onClick={() => addModalUrl(largeImageURL)}
              src={webformatURL}
              alt={tags}
            />
          );
        })}
      </Gallery>
      {url && <Modal url={url} handleCloseModal={handleCloseModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};
