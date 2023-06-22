import { useRef, useCallback } from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Sharing from 'expo-sharing'
import ViewShot from 'react-native-view-shot'

export default function App() {
  const shareImage = useRef()

  const handleShareOnInstagram = useCallback(async () => {
    try {
      const uri = await shareImage.current.capture()
      const isAvailable = await Sharing.isAvailableAsync()

      if (isAvailable) {
        await Sharing.shareAsync(`file://${uri}`)
      } else {
        Alert.alert('Unavailable')
      }
    } catch (error) {
      Alert.alert('Unavailable')
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ViewShot ref={shareImage}>
        <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
      </ViewShot>

      <Text style={{ marginVertical: 30 }}>Instagram Share Example</Text>

      <TouchableOpacity
        onPress={handleShareOnInstagram}
      >
        <Text style={{
          fontWeight: 700,
          fontSize: 20,
        }}>
          Share
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
