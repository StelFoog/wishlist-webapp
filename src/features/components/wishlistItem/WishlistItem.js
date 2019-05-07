import React from "react";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card";
import Button from "../button";

const wishListItem = ({ item, index, isOwner = true }) => (
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
        {isOwner && (
          <Button
            variant={"filled"}
            label={"Edit"}
            color={"var(--color-primary"}
            handleClick={showEditDialog}
          />
        )}
      </div>
    </div>
  </CardContainer>
);

function showEditDialog() {
  console.log("Edit dialog");
}

export default wishListItem;
