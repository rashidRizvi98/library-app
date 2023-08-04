import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { IAuthor } from '../models/author';

function AuthorsList(props: any) {
  return (
    <Card style={{ width: '15rem' }}>
      <Card.Header>Authors</Card.Header>
      <ListGroup variant="flush">
        {
            props.authors?.map((author: IAuthor) => <ListGroup.Item key={ author._id }>{ `${author.firstName} ${author.lastName}` }</ListGroup.Item>)
        }
      </ListGroup>
    </Card>
  );
}

export default AuthorsList;