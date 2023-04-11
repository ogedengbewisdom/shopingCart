import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const DUMMY_DATA = [

    {
       id: "p1", 
       price: 5, 
       title: "My first book", 
       description: "This is a first product - amazing"
    }, 

    {
      id: "p2",
      price: 10,
      title: "Second book",
      description: "This is awesome"
    }
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>

        {DUMMY_DATA.map(item => 
        <ProductItem
          key = {item.id}
          id = {item.id}
          title = {item.title}
          price = {item.price}
          description = {item.description}
        />
        
        )}
      </ul>
    </section>
  );
};

export default Products;
