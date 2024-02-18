import {
  Form,
  Button,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useState } from "react";

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <Row >
        <InputGroup >
          <Col xs={10}>
            <FormControl
              type="user"
              placeholder="message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </Col>
          <Col>
            <Button variant="primary" type="submit" disabled={!message}>
              Send
            </Button>
          </Col>
        </InputGroup>
      </Row>
    </Form>
  );
};

export default SendMessageForm;
