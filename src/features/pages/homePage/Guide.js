import React from "react";

import Card, { CardContent, CardMedia } from "../../components/card";
import Paper from "../../components/paper";

import "./guide.css";

const Guide = () => (
  <div className="guide-container">
    <div className="guide-row">
      <div className="guide-col">
        <div className="guide-step">
          <Paper elevation={2} className="circle">
            <span>1</span>
          </Paper>
        </div>
        <Card elevation={2}>
          <CardMedia
            media={"static/CreateWishlist.png"}
            mediaHeight={"300px"}
          />
          <CardContent>
            <p>
              Create a new Wishlist, give it a name and, if you want to, give it
              a description and set a time for when the gift-giving event will
              happen.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="guide-col">
        <div className="guide-step">
          <Paper elevation={2} className="circle">
            <span>2</span>
          </Paper>
        </div>
        <Card elevation={2}>
          <CardMedia
            media={"static/CreateWishlistItem.png"}
            mediaHeight={"300px"}
          />
          <CardContent>
            <p>Add items you want to the wishlist...</p>
          </CardContent>
        </Card>
      </div>
      <div className="guide-col">
        <div className="guide-step">
          <Paper elevation={2} className="circle">
            <span>3</span>
          </Paper>
        </div>
        <Card elevation={2}>
          <CardMedia media={"static/ShareWishlist.png"} mediaHeight={"300px"} />
          <CardContent>
            <p>
              And then share it with your friends and family or anyone else who
              might need to know what you wish for.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="guide-col">
        <div className="guide-step">
          <Paper elevation={2} className="circle">
            <span>4</span>
          </Paper>
        </div>
        <Card elevation={2}>
          <CardMedia media={"static/SeeWishlist.png"} mediaHeight={"300px"} />
          <CardContent>
            <p>Other people can see what you want...</p>
          </CardContent>
        </Card>
      </div>
      <div className="guide-col">
        <div className="guide-step">
          <Paper elevation={2} className="circle">
            <span>5</span>
          </Paper>
        </div>
        <Card elevation={2}>
          <CardMedia media={"static/Chat.png"} mediaHeight={"300px"} />
          <CardContent>
            <p>Discuss who should get what...</p>
          </CardContent>
        </Card>
      </div>
      <div className="guide-col">
        <div className="guide-step">
          <Paper elevation={2} className="circle">
            <span>6</span>
          </Paper>
        </div>
        <Card elevation={2}>
          <CardMedia media={"static/Claim.png"} mediaHeight={"300px"} />
          <CardContent>
            <p>
              And claim items from your wishlist, so everyone you've invited can
              see what someone is already getting you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default Guide;
