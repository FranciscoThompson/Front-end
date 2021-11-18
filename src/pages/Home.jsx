import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Home = () => {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const onSearchHandler = (search) => {
    setSearchKeyWord(search);
  };
  return (
    <div>
      <Announcement />
      <Navbar onSearch={onSearchHandler} />
      <Products searchKeyWord={searchKeyWord} />
    </div>
  );
};

export default Home;
