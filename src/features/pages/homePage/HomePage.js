import React from "react";
import { connect } from "react-redux";
/* Components */
import Button from "../../components/button";
import Card, {
  CardContent,
  CardMedia,
  CardHeader
} from "../../components/card";
import { actions as dialogActions } from "../../components/dialog";

const { openDialog } = dialogActions;

const Hej = () => <Button label="hej" variant="filled" color="black" />;

class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button
          label="Filled"
          variant="filled"
          color="#73359B"
          fontSize="1rem"
          handleClick={this.props.openDialog}
        />
        <Button
          label="Outline"
          variant="outlined"
          color="#73359B"
          padding="1rem 1rem"
        />
        <Button label="Text" variant="text" color="#73359B" />
        <Card>
          <CardMedia media="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          <CardHeader>Test</CardHeader>
          <CardContent>
            Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
            Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
            boksättare tog att antal bokstäver och blandade dem för att göra ett
            provexemplar av en bok. Lorem ipsum har inte bara överlevt fem
            århundraden, utan även övergången till elektronisk typografi utan
            större förändringar. Det blev allmänt känt på 1960-talet i samband
            med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och
            senare med mjukvaror som Aldus PageMaker.
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openDialog: () =>
    dispatch(openDialog({ body: <div>hej</div>, header: "hej" }))
});

export default connect(
  null,
  mapDispatchToProps
)(HomePage);
