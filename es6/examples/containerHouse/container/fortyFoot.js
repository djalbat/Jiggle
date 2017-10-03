'use strict';

const Container = require('../container');

const FortyFootContainer = (properties) => {
  const { offset } = properties;

  return (

    <Container offset={offset} width={40} />
      
  );
};

module.exports = FortyFootContainer;
