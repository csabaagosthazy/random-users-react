import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

/**
 * User card component
 * @returns React-Bootstrap Card component
 */
const UserCard = ({ name, location, email, picture }) => {
  return (
  <Card variant='Light' style={style.card}>
    <Card.Img variant="top" src={picture.large} />
    <Card.Body>
      <Card.Title>{name.first} {name.last}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{location.city}, {location.country}</Card.Subtitle>
      <Card.Text>
        {location.street.name} {location.street.number}, {location.city} {location.postcode}
      </Card.Text>
      <Card.Text >{email}</Card.Text>
    </Card.Body>
  </Card>
  );
};

export default UserCard;


const style = {
    card : {
        width: "16rem",

    }
}

UserCard.propTypes = {
    name: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.object.isRequired
  };