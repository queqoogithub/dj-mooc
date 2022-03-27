import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Tun',
      email: 'user1@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'Que',
      email: 'user2@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  courses: [
    {
      courseName: 'solidity101',
      category: 'blockchain',
      section: 'smart_contract',
      description: 'lean solidity',
      approveStatus: false,
      playlist: ['vdo_link_1', 'vdo_link_2'],
      assignment: ['assign_link_1', 'assign_link_1'],
    },
    {
      courseName: 'next101',
      category: 'webapp',
      section: 'webdev',
      description: 'lean react with next.js',
      approveStatus: false,
      playlist: ['vdo_link_1', 'vdo_link_2'],
      assignment: ['assign_link_1', 'assign_link_1'],
    },
    {
      courseName: 'flashloan101',
      category: 'blockchain',
      section: 'defi',
      description: 'lean how to flashloan work',
      approveStatus: false,
      playlist: ['vdo_link_1', 'vdo_link_2'],
      assignment: ['assign_link_1', 'assign_link_1'],
    },
    {
      courseName: 'uniswap101',
      category: 'blockchain',
      section: 'defi',
      description: 'lean how to use uniswap',
      approveStatus: false,
      playlist: ['vdo_link_1', 'vdo_link_2'],
      assignment: ['assign_link_1', 'assign_link_1'],
    },
  ],
};
export default data;