import React from "react";
import { connect } from "react-redux";
import { CardHeader, CardContent, CardActions } from "../../card";

const HelpPage = () => {
  return (
    <React.Fragment>
      <div className="helpPage">
        <CardContent>
          <h1>Help page</h1>
          <p>
            Wishlists is a simple application to help you coordinate gift giving
            between your friends and family. Create a wishlist by going to
            "Wishlists" in the navigation bar to the left, then click the plus
            sign in the bottom right corner and enter information about your
            wishlist. Once your wishlist is created you can invite your friends
            and family with the "Share"-button. They can now see the items you
            add to your wishlist. You will not be able to see what they say and
            they will be able to discuss and claim the items in your wishlist
            without you knowing.
          </p>
          <div
            style={{
              backgroundImage: "url(https://via.placeholder.com/600x300)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "300px",
              backgroundPosition: "center"
            }}
          />
          <p>
            You can also create groups. Groups is a fantastic way of always
            knowing what to buy your family members for christmas. Create a
            group and invite others. In the group every invited person gets a
            wishlist which they can add items to. The others in the group can
            now see what that persons wishes for, and coordinate who will buy
            what.
          </p>
          <div
            style={{
              backgroundImage: "url(https://via.placeholder.com/600x300)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "300px",
              backgroundPosition: "center"
            }}
          />
        </CardContent>
      </div>
    </React.Fragment>
  );
};

export default HelpPage;
