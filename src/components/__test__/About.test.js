import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../About';

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><About /></Router>, div)
  ReactDOM.unmountComponentAtNode(div);
});


test('should render about component', () => {
  render(<Router><About /></Router>);
  const about = screen.getByTestId('about');
  expect(about).toBeInTheDocument();
  expect(about).toHaveTextContent('XHTML Templates')

})
