import React from 'react';
import { StyleSheet, Image } from 'react-native';

class CustomMarker extends React.Component {
    render() {
        return (
            <Image
                style={styles.image}
                source={
                    require('../../assets/images/filter/blackDot.png')
                }
                resizeMode="contain"
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 20,
        width: 20,
    },
});

export default CustomMarker;