// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import { ContentFrame, ProductCard, ProductCart } from '../../components';
import { productList } from '../../_mock';

const cx = classNames.bind(styles);

function Home() {
  const [cartList, setCartList] = useState([]);
  const [totalCartListPrice, setTotalCartListPrice] = useState(0);

  const handleMinusCart = (product) => {
    let newCartList = [];
    if (product.amount > 1) {
      newCartList = cartList.map((cartItem) => {
        if (product.id === cartItem.id) {
          cartItem.amount--;
        }
        return cartItem;
      });
    } else {
      handelRemoveCart(product);
      return;
    }
    // Update the cart list
    localStorage.setItem('cartList', JSON.stringify(newCartList));
    setCartList(newCartList);
  };

  const handleAddCart = (product) => {
    let isExistStorageProduct = false;
    let newCartList = [];

    if (!cartList.length) {
      // Add new product into the cart list if the cart list is empty
      newCartList.push({ ...product, amount: 1 });

      // Update the cart list
      localStorage.setItem('cartList', JSON.stringify(newCartList));
      setCartList(newCartList);
      return;
    } else {
      // Increase amount of product if it is already exist
      newCartList = cartList.map((productItem) => {
        if (productItem.id === product.id) {
          productItem.amount++;
          isExistStorageProduct = true;
        }
        return productItem;
      });
    }

    // Check the product is already exist yet
    if (isExistStorageProduct) {
      // Update the cart list
      localStorage.setItem('cartList', JSON.stringify(newCartList));
      setCartList(newCartList);
    } else {
      // Add new product into cart list if it's not exist yet
      newCartList.push({ ...product, amount: 1 });

      // Update the cart list
      localStorage.setItem('cartList', JSON.stringify(newCartList));
      setCartList(newCartList);
    }
  };

  const handelRemoveCart = (product) => {
    let newCartList = [];
    if (cartList.length === 1) {
      newCartList = [];
    } else {
      newCartList = cartList.filter((cartItem) => {
        return cartItem.id !== product.id;
      });
    }

    // Update the cart list
    localStorage.setItem('cartList', JSON.stringify(newCartList));
    setCartList(newCartList);
  };

  useEffect(() => {
    if (!cartList.length) {
      setTotalCartListPrice(0);
      return;
    }

    const totalPrice = cartList.reduce((accumulator, cartProductItem) => {
      return accumulator + cartProductItem.amount * cartProductItem.price;
    }, 0);
    setTotalCartListPrice(totalPrice);
  }, [cartList]);

  useEffect(() => {
    const rawStorageData = localStorage.getItem('cartList');
    const storageData = rawStorageData !== 'undefined' && JSON.parse(rawStorageData);

    if (storageData?.length) {
      setCartList(storageData);
    }
  }, []);

  return (
    <div className={cx('ocean-animation')}>
      <div className={cx('wrapper')}>
        <ContentFrame title='Our Products'>
          {productList?.length &&
            productList?.map((productItem) => {
              let isInCartList = false;

              cartList.length &&
                cartList.forEach((cartItem) => {
                  if (cartItem.id === productItem.id) {
                    isInCartList = true;
                  }
                });

              return (
                <ProductCard
                  key={productItem.id}
                  product={productItem}
                  isInCartList={isInCartList}
                  handleAddCart={handleAddCart}
                />
              );
            })}
        </ContentFrame>
        <ContentFrame title='Your cart' totalPrice={totalCartListPrice}>
          {cartList.length > 0 ? (
            cartList.map((cartItem) => {
              return (
                <ProductCart
                  key={cartItem.id}
                  productCart={cartItem}
                  handleAddCart={handleAddCart}
                  handleMinusCart={handleMinusCart}
                  handelRemoveCart={handelRemoveCart}
                />
              );
            })
          ) : (
            <span className={cx('empty-cart')}>Your cart is empty</span>
          )}
        </ContentFrame>
      </div>
    </div>
  );
}

export default Home;
