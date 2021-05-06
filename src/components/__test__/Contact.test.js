import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Contact from '../Contact';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });


describe("Register", () => {
  let wrapper;
  let stopSubmission;
  beforeEach(() => {
    stopSubmission = jest.fn();
    wrapper = shallow(<Contact submit={stopSubmission} />);
  });

  //Snapshot Test
  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  //Test if a button is disabled
  test('renders disabled contact button', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router><Contact /></Router>, div)
    const button = div.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('renders submit button', () => {
    const wrapper = mount(<Router><Contact>Submit</Contact></Router>);
    const button = wrapper.find('button');
    expect(button).toHaveLength(2);
  });
})
