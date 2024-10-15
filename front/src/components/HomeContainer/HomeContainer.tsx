import React from "react";
import CardList from "../CardList/CardList";
import Banner from "../Banner/Banner";
import Characteristics from "../Characteristics/Characteristics";

const HomeContainer = () => {
  return (
    <div>
      <Banner />
      <CardList />
      <Characteristics />
    </div>
  );
};

export default HomeContainer;
