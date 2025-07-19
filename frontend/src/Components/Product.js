import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  const addToCartHandler = async (item) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    console.log('data.countInStock', data.countInStock);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="h-100">
      <Link to={`/product/${product.slug}`}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="img-fluid"
          style={{
            height: '300px',
            objectFit: 'contain',
            padding: '10px',
          }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.slug}`}>
          <Card.Title as="h5">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text className="mb-2">${product.price}</Card.Text>
        {product.countInStock < quantity ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(product)}
            variant="primary"
            className="mt-auto"
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
