import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../Dashboard';

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Dashboard /></Router>, div)
  ReactDOM.unmountComponentAtNode(div);
});

