import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ProductCard.module.scss';
import images from '../../assets/imgs';

const cx = classNames.bind(styles);

function ProductCard({ product, handleAddCart, isInCartList = false }) {
  return (
    <div className={cx('product')}>
      <div className={cx('product-img')} style={{ backgroundColor: product.color }}>
        <img src={product.image} alt={product.name} className={cx('product-img-ele')} />
      </div>
      <div className={cx('product-content')}>
        <div className={cx('product-name')}>{product.name}</div>
        <div className={cx('product-description')}>{product.description}</div>
      </div>
      <div className={cx('product-payment')}>
        <div className={cx('product-price')}>${product.price}</div>
        <div
          className={cx(isInCartList ? 'product-cart-icon' : 'product-cart-text', 'product-cart-btn')}
          onClick={() => handleAddCart(product)}
        >
          {isInCartList ? <img src={images.checkIcon} alt='check-icon' /> : 'ADD TO CART'}
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleAddCart: PropTypes.func.isRequired,
  isInCartList: PropTypes.bool,
};

export default ProductCard;
