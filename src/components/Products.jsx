import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useState, useEffect } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://front-test-api.herokuapp.com/api/product/"
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        const searchName = `${product.brand} ${product.model}`;
        return searchName
          .toLowerCase()
          .includes(props.searchKeyWord.toLowerCase());
      })
    );
  }, [props.searchKeyWord]);
  return (
    <Container>
      {FilteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
