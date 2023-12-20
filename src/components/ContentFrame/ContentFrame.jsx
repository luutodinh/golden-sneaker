import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ContentFrame.module.scss';
import images from '../../assets/imgs';

const cx = classNames.bind(styles);

function ContentFrame({ icon = images.brandIcon, title, totalPrice = 0, classNames, children }) {
  return (
    <div className={`${cx('card')} ${classNames}`}>
      <img src={icon} alt='' className={cx('brand-icon')} />
      <div className={cx('card-title')}>
        <div className={cx('card-title-text')}>{title}</div>
        {!!totalPrice && <div className={cx('card-title-text')}>${totalPrice.toFixed(2)}</div>}
      </div>
      <div className={cx('card-content')}>{children}</div>
    </div>
  );
}

ContentFrame.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  totalPrice: PropTypes.number,
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
};

export default ContentFrame;
