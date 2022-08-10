import React from 'react'

import UserCard from './UserCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PropTypes from "prop-types";



const ItemList = ({data}) => {
    return (
        <Container>
        <Row xs={2} md={5} lg={5}>
        {data.map((item, index) => (
            <UserCard
              key={index}
              name={item.name}
              location={item.location}
              email={item.email}
              picture={item.picture}
            />
          ))}
        </Row>
      </Container>
       
     );
}
 
export default ItemList;

ItemList.propTypes = {
    data: PropTypes.array.isRequired
  };