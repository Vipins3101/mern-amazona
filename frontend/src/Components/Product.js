import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;

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
        <Button variant="primary" className="mt-auto">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
