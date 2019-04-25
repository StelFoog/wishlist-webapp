import React from "react";

import { CardContainer, CardContent, CardMedia } from "../../components/card";

import "./guide.css";

const Guide = () => (
  <div className="guide-container">
    <div className="guide-row">
      <div className="guide-col">
        <div className="guide-step">
          <div className="circle card-2">
            <span>1</span>
          </div>
        </div>
        <CardContainer elevation={2}>
          <CardMedia />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              et ex luctus, condimentum nisi id,
            </p>
          </CardContent>
        </CardContainer>
      </div>
      <div className="guide-col">
        <div className="guide-step">
          <div className="circle card-2">
            <span>2</span>
          </div>
        </div>
        <CardContainer elevation={2}>
          <CardMedia />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              et ex luctus, condimentum nisi id,
            </p>
          </CardContent>
        </CardContainer>
      </div>
      <div className="guide-col">
        <div className="guide-step">
          <div className="circle card-2">
            <span>3</span>
          </div>
        </div>
        <CardContainer elevation={2}>
          <CardMedia />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              et ex luctus, condimentum nisi id,
            </p>
          </CardContent>
        </CardContainer>
      </div>
      <div className="guide-col">
        <div className="guide-step">
          <div className="circle card-2">
            <span>4</span>
          </div>
        </div>
        <CardContainer elevation={2}>
          <CardMedia />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              et ex luctus, condimentum nisi id,
            </p>
          </CardContent>
        </CardContainer>
      </div>
    </div>
  </div>
);

export default Guide;
