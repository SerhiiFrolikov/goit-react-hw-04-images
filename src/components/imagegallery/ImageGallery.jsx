import PropTypes from 'prop-types';
import { useState } from 'react';
import { Gallery } from './ImageGallery.styled';
import { Modal } from '../modal/Modal';
import ImageGalleryItem from '../imagegalleryitem/ImageGalleryItem';

export const ImageGallery = ({ cards }) => {
  const [url, setUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const addModalUrl = e => {
    const modalUrl = cards.filter(card => {
      return Number(card.id) === Number(e.currentTarget.id);
    });
    setUrl(modalUrl[0].largeImageURL);
    setOpenModal(true);
  };

  const handleOpenModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Gallery>
        {cards.map(({ id, webformatURL, tags }) => {
          return (
            <ImageGalleryItem
              id={id}
              key={id}
              onClick={addModalUrl}
              src={webformatURL}
              alt={tags}
            />
          );
        })}
      </Gallery>
      {openModal && <Modal url={url} openModal={handleOpenModal} />}
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
