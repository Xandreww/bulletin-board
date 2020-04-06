import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

const mockProps = {
  post: {
    id: 1,
    title: 'Sofa for sale!',
    price: 30,
    text: 'Hello, I am selling my old sofa',
    email: 'sellsofa@example.com',
    telephone: 123456789,
    image: 'C:/testImage.jpg',
    date: '01.01.2020',
    updateDate: '01.04.2020',
    status: 'published',
  },
};

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
