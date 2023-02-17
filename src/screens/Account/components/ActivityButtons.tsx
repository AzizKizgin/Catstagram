import React from 'react';
import {HStack, Button} from 'native-base';

const ActivityButtons = () => {
  return (
    <HStack justifyContent={'space-evenly'} marginTop={'sm'}>
      <Button width={'45%'} color={'cyan'}>
        Fallow
      </Button>
      <Button width={'45%'} color={'cyan'}>
        Message
      </Button>
    </HStack>
  );
};

export default ActivityButtons;
