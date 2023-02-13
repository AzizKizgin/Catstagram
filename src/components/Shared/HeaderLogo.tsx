import {Image} from 'native-base';
import React from 'react';

const HeaderLogo = () => {
  return (
    <Image
      source={require('../../assets/logo.png')}
      alt={'logo'}
      resizeMode={'contain'}
      tintColor={'cyan'}
      size={'xl'}
      height={50}
    />
  );
};

export default HeaderLogo;
