import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import { shallow, configure } from 'enzyme';
import SignUp from '../SignUp';
configure({ adapter: new Adapter() });

test('renders login button', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><SignUp /></Router>, div)
  const button = div.querySelector('button');
  expect(button).toBeDisabled();
});


it('calls stopSubmission function when form is submitted', () => {
  const stopSubmission = jest.fn();
  const wrapper = mount(<Router><SignUp onSubmit={stopSubmission} /></Router>);
  const form = wrapper.find('form');
  form.simulate('submit');
  expect(stopSubmission).toHaveBeenCalledTimes(0);
});

it('renders text input with label (default type)', () => {
  const wrapper = mount(<Router><SignUp name="full_name" label="Full Name:" /></Router>);
  const label = wrapper.find('label');
  expect(label).toHaveLength(4);
  const input = wrapper.find('input');
  expect(input).toHaveLength(3);

});

it('renders buttons', () => {
  const wrapper = mount(<Router><SignUp >Submit</SignUp></Router>);
  const button = wrapper.find('button');
  expect(button).toHaveLength(2);

});
it('renders select with custom text', () => {
  const wrapper = mount(<Router><SignUp >Submit</SignUp></Router>);
  const select = wrapper.find('select');
  expect(select).toHaveLength(1);
  expect(select.prop('name')).toEqual('group');
  expect(select.prop('className')).toEqual('custom-select');
  expect(select.text()).toEqual('Developer');

});
