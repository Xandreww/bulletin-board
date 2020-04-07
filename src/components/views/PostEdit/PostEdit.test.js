import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  post: {
    id: 1,
    title: 'Sofa for sale!',
    price: 30,
    content: 'Hello, I am selling my old sofa',
    email: 'sellsofa@example.com',
    telephone: 123456789,
    image: 'C:/images/oldSofa',
    date: '01.01.2020',
    updateDate: '01.04.2020',
    status: 'published',
    userId: 1,
  },
  user: {
    id: 1,
    authenticated: true,
  },
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
