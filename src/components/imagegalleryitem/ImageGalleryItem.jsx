import PropTypes from 'prop-types';
import { GalleryItem, ImgItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ onClick, src, alt }) => {
  return (
    <GalleryItem onClick={onClick}>
      <ImgItem src={src} alt={alt} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
