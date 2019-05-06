import React from "react";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card";

const wishListItem = ({ item }) => (
  <CardContainer key={item.name}>
    <div className="itemContent">
      <div className="itemText">
        <CardHeader children={item.name} />
        <CardContent>
          <p>{item.description}</p>
        </CardContent>
      </div>

      <div className="itemPrice">
        <h3>{item.price}</h3>
      </div>
    </div>
  </CardContainer>
);

export default wishListItem;
