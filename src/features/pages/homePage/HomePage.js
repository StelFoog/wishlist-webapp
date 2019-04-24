import React from "react";

import Button from "../../components/button";
import Card from "../../components/card";

const HomePage = () => (
  <React.Fragment>
    <Button label="Filled" variant="filled" color="#73359B" fontSize="1rem" />
    <Button
      label="Outline 0"
      variant="outlined"
      color="#73359B"
      colorOutline={false}
      padding="1rem 1rem"
    />
    <Button
      label="Outline 1"
      variant="outlined"
      color="#73359B"
      padding="1rem 1rem"
    />
    <Button label="Text" variant="text" color="#73359B" />
    <Card>
      Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem
      ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare
      tog att antal bokstäver och blandade dem för att göra ett provexemplar av
      en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även
      övergången till elektronisk typografi utan större förändringar. Det blev
      allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med
      avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.
    </Card>
  </React.Fragment>
);

export default HomePage;
