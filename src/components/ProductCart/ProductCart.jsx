import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ProductCart.module.scss';
import images from '../../assets/imgs';

const cx = classNames.bind(styles);

function ProductCart({ productCart, handleAddCart, handleMinusCart, handelRemoveCart }) {
  return (
    <div className={cx('cart')}>
      <div className={cx('cart-img')} style={{ backgroundColor: productCart.color }}>
        <img src={productCart.image} alt={productCart.name} className={cx('cart-img-ele')} />
      </div>
      <div className={cx('cart-content')}>
        <div className={cx('cart-name')}>{productCart.name}</div>
        <div className={cx('cart-price')}>${productCart.price}</div>
        <div className={cx('cart-amount')}>
          <div className={cx('cart-amount-content')}>
            <div className={cx('cart-amount-icon')} onClick={() => handleMinusCart(productCart)}>
              <img src={images.minusIcon} alt='minus' className={cx('cart-amount-minus')} />
            </div>
            <div className={cx('cart-amount-quantity')}>{productCart.amount}</div>
            <div className={cx('cart-amount-icon')} onClick={() => handleAddCart(productCart)}>
              <img src={images.plusIcon} alt='add' className={cx('cart-amount-add')} />
            </div>
          </div>
          <div className={cx('cart-amount-icon')} onClick={() => handelRemoveCart(productCart)}>
            <img src={images.trashIcon} alt='trash' className={cx('cart-delete')} />
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCart.proptTypes = {
  productCart: PropTypes.object.isRequired,
  handleAddCart: PropTypes.func.isRequired,
  handleMinusCart: PropTypes.func.isRequired,
  handelRemoveCart: PropTypes.func.isRequired,
};

export default ProductCart;
