// schema.js

export default {
    name: 'user',
    title:'User',
    type: 'document',
    fields: [
      {
        name: 'username',
        title:'Username',
        type: 'string',
      },
      {
        name: 'isAdmin',
        title:'isAdmin',
        type: 'string',
      },
      {
        name: 'isSeller',
        title:'isSeller',
        type: 'string',
      },
      {
        name: 'isActive',
        title:'isActive',
        type: 'string',
      },
      {
        name: 'isLoggedin',
        title:'isLoggedIn',
        type: 'string',
      },
      {
        name: 'password',
        title:'Password',
        type: 'string',
      },
      {
        name: 'email',
        title:'Email',
        type: 'string',
      },
      {
        name: 'phone',
        title:'Phone number',
        type: 'string',
      },
      {
        name: 'fullname',
        title:'Full Name',
        type: 'string',
      },
      {
        name: 'address',
        title:'Address',
        type: 'string',
      },
      {
        name: 'zipcode',
        title:'Zipcode',
        type: 'string',
      },
    ],
  };
  