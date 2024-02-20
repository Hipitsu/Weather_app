import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Weather from './Weather';
import React, { useEffect, useState } from 'react';


export default function Postion() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Retrieving location...')
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        (async() => {
            let {status} = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMessage("Location not permitted.")

                } else {
                    const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved')
                }
            } catch (error) {
                setMessage("Error retrieving location.")
                console.log(error)
            }
            setIsloading(false)
        })()
    }, [])

    return (
        <View>
            <Text style={styles.coords}>{latitude.toFixed(3)},{longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false &&
             <Weather latitude={latitude} longitude={longitude} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coords: {
        fontSize: 20,
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    loading: {
        marginTop: 20,
    },
});

