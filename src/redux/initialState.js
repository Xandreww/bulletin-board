import oldSofa from '../assets/images/oldSofa.jpg';
import gameboy from '../assets/images/gameboy.jpg';
import iPhone from '../assets/images/iPhone.jpg';
import laptop from '../assets/images/laptop.jpg';
import tablet from '../assets/images/tablet.jpg';

export const initialState = {
  posts: {
    data: [
      {
        id: 1,
        title: 'Sofa for sale!',
        price: 30,
        text: 'Hello, I am selling my old sofa',
        email: 'sellsofa@example.com',
        telephone: 123456789,
        image: oldSofa,
        date: '01.01.2020',
        updateDate: '01.04.2020',
        status: 'published',
      },
      {
        id: 2,
        title: 'Old school GameBoy for you!',
        price: 10,
        text: 'Hello, I have old school GameBoy for sell. Classic!',
        email: 'sellgameboy@example.com',
        telephone: 123456789,
        image: gameboy,
        date: '02.02.2020',
        updateDate: '01.04.2020',
        status: 'published',
      },
      {
        id: 3,
        title: 'iPhone 600 mega!',
        price: 500,
        text: 'iPhone 600 mega for sale. Right away.',
        email: 'selliPhone@example.com',
        telephone: 123456789,
        image: iPhone,
        date: '28.03.2020',
        updateDate: '',
        status: 'published',
      },
      {
        id: 4,
        title: 'Unused laptop',
        price: 900,
        text:
          'Good morning, I have unused laptop Dell 500 Ultra for sale. You can buy on lower price than in market. Contact me for details!',
        email: 'sellLaptop@example.com',
        telephone: 123456789,
        image: laptop,
        date: '03.02.2020',
        updateDate: '28.03.2020',
        status: 'published',
      },
      {
        id: 5,
        title: 'Tablet for sale!',
        price: 400,
        text: 'Hello, I am willing to sell the tablet SuperTurboMega. I was using it for half a year.',
        email: 'sellTablet@example.com',
        telephone: 123456789,
        image: tablet,
        date: '03.03.2020',
        updateDate: '28.03.2020',
        status: 'published',
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
};
