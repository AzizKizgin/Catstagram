import {Image} from 'native-base';
import React from 'react';

const Logo = () => {
  return (
    <Image
      source={require('../../assets/logo.png')}
      alt={'logo'}
      resizeMode={'contain'}
      height={50}
      marginBottom={'m'}
      tintColor={'cyan'}
    />
  );
};

export default Logo;
