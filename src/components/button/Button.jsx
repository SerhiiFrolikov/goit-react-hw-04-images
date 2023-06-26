import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

export const Button = ({ handleSubmit }) => {
  return (
    <LoadMoreBtn onClick={() => handleSubmit()} type="button">
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
