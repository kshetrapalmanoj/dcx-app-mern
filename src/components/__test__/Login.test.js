import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';



test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Login /></Router>, div)
  ReactDOM.unmountComponentAtNode(div);
});


test('should render login component', () => {
  render(<Router><Login /></Router>);
  // screen.debug()
  const login = screen.getByTestId('login');
  expect(login).toBeInTheDocument();
  expect(login).toHaveTextContent('Login to Continue')
  expect(login.querySelector('label').textContent).toBe('Email Address')
  expect(login.querySelector('button').textContent).toBe('Login')
})

//Test if a button is disabled
test('renders disabled login button', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Login /></Router>, div)
  const button = div.querySelector('button');
  expect(button).toBeDisabled();
});


