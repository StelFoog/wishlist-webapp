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
          <CardMedia />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              et ex luctus, condimentum nisi id,
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
          <CardMedia />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              et ex luctus, condimentum nisi id,
            </p>
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
          <CardMedia />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              et ex luctus, condimentum nisi id,
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
          <CardMedia />
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              et ex luctus, condimentum nisi id,
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default Guide;
