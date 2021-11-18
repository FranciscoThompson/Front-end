import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h2`
  font-weight: 100;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 15px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.colors};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

// const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const ListDetails = styled.div``;
const ProductDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState(null);
  const [colors, setColor] = useState("");
  const [storage, setStorage] = useState("");
  const storageSelectHandler = (e) => {
    setStorage(e.target.value);
  };
  useEffect(() => {
    fetch("https://front-test-api.herokuapp.com/api/product/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setStorage(data.options.storages[0].code);
        setColor(data.options.colors[0].code);
      });
  }, [id]);
  const selectedProduct = {
    id: id,
    colors: colors,
    storage: storage,
  };
  const [allProductsArray, setAllProductArry] = useState([selectedProduct]);
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("Products"));
    if (storedProducts) setAllProductArry(storedProducts);
  }, []);
  const addingToCart = async () => {
    const res = await fetch("api/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(selectedProduct),
    });
    setAllProductArry([selectedProduct, ...allProductsArray]);
    localStorage.setItem("Products", JSON.stringify(allProductsArray));
    const expiryTime = new Date().getTime();
    localStorage.setItem("Expiration", JSON.stringify({ date: expiryTime }));
    console.log(expiryTime);
  };
  return (
    <Container>
      <Navbar productsArray={allProductsArray} />
      <Announcement />
      {product && (
        <Wrapper>
          <ImgContainer>
            <Image src={product.imgUrl} />
          </ImgContainer>
          <InfoContainer>
            <Title>
              <b>{product.brand}</b>
            </Title>
            <b>{product.model}</b>
            <Desc>
              <ListDetails>
                <b>CPU</b>: {product.cpu}
              </ListDetails>
              <ListDetails>
                <b>RAM</b>: {product.ram}
              </ListDetails>
              <ListDetails>
                <b>Sistema Operativo</b>:{product.os}
              </ListDetails>
              <ListDetails>
                <b>Resolución de Pantalla:</b> {product.displayResolution}
              </ListDetails>
              <ListDetails>
                <b>Batería</b> {product.battery}
              </ListDetails>
              <ListDetails>
                <b>Cámaras</b>: {product.primaryCamera} {product.secondaryCmera}
              </ListDetails>
              <ListDetails>
                <b>Dimensiones</b>: {product.dimentions}
              </ListDetails>
              <ListDetails>
                <b>Peso</b>: {product.weight}gr.
              </ListDetails>
            </Desc>
            <Price>{product.price}€</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Escoger color</FilterTitle>
                {product.options.colors?.map((c) => (
                  <FilterColor
                    colors={c.name}
                    key={c.name}
                    onClick={() => setColor(c.code)}
                  />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Escoger almacenamiento</FilterTitle>
                <FilterSize value={storage} onChange={storageSelectHandler}>
                  {product.options.storages.map((item) => {
                    return (
                      <option key={item.name} value={item.code}>
                        {item.name}
                      </option>
                    );
                  })}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <Button><Link to="/"> VOLVER</Link></Button>
              <Button onClick={addingToCart}>AÑADIR</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default ProductDetail;
