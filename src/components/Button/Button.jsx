import PropTypes from 'prop-types';
import { BiPlus } from 'react-icons/bi';
import css from 'components/Button/Button.module.css';

const Button = ({ onNextFetch }) => {
  return (
    <button className={css.button} type="button" onClick={onNextFetch}>
      Load more <BiPlus className={css.icon} />
    </button>
  );
};

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
