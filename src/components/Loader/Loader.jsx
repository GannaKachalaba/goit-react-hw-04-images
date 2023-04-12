import { MdOutlineDragIndicator } from 'react-icons/md';
import css from 'components/Loader/Loader.module.css';

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <MdOutlineDragIndicator className={css.loader} />
    </div>
  );
};

export default Loader;
