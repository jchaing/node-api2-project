import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const Post = ({ title, contents }) => {
  return (
    <Card className="mb-3" color="warning">
      <CardBody>
        <CardTitle>Title: {title}</CardTitle>
        <CardText>Contents: {contents}</CardText>
      </CardBody>
    </Card>
  );
};

export default Post;
