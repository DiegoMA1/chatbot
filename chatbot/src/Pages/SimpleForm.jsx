
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { Card, Carousel } from 'react-bootstrap';
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
<Carousel>
  <Carousel.Item>
    <Card bg="dark" style={{ width: '10rem' }}>
        <Card.Body>
        <Card.Title>Summary</Card.Title>
        <Card.Text>
            Name: {name.value} <br></br>
            Gender: {gender.value} <br></br>
            Age: {age.value}<br></br>
        </Card.Text>
        <img
        className="d-block w-100"
        src="https://picsum.photos/seed/picsum/250"
        alt="First slide"
        />
        </Card.Body>
    </Card>
  </Carousel.Item>
  <Carousel.Item>
    <Card bg="dark" style={{ width: '10rem' }}>
        <Card.Body>
        <Card.Title>Summary</Card.Title>
        <Card.Text>
            Name: {name.value} <br></br>
            Gender: {gender.value} <br></br>
            Age: {age.value}<br></br>
        </Card.Text>
        <img
        className="d-block w-100"
        src="https://picsum.photos/250/250/?blur"
        alt="Second slide"
        />
        </Card.Body>
    </Card>
  </Carousel.Item>
  <Carousel.Item>
    <Card bg="dark" style={{ width: '10rem' }}>
        <Card.Body>
        <Card.Title>Summary</Card.Title>
        <Card.Text>
            Name: {name.value} <br></br>
            Gender: {gender.value} <br></br>
            Age: {age.value}<br></br>
        </Card.Text>
        <img
        className="d-block w-100"
        src="https://picsum.photos/250/250?grayscale"
        alt="First slide"
        />
        </Card.Body>
    </Card>
  </Carousel.Item>
</Carousel>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: '5' },
              { value: 'female', label: 'Female', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'How old are you?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },
          {
            id: '7',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7',
          },
          {
            id: 'update-age',
            update: 'age',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
      />
    );
  }
}

export default SimpleForm;