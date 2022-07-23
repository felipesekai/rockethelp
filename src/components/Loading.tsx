import React from 'react';
import { View } from 'react-native';

import { Center, Spinner } from 'native-base';

const Loading: React.FC = () => {
    return (
        <Center flex={1} bg='gray.700'>
            <Spinner color={'secondary.700'} />
        </Center>
    );
}

export default Loading;