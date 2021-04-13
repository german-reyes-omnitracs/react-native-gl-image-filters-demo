import { Surface } from 'gl-react-native';
import { Text } from 'native-base';
import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import ImageFilters from 'react-native-gl-image-filters';
import Filter from './Filter';
import { Presets } from 'react-native-gl-image-filters';

/* const settings = [
  {
    name: 'hue',
    minValue: 0,
    maxValue: 6.3,
  },
  {
    name: 'blur',
    minValue: 0,
    maxValue: 30,
  },
  {
    name: 'sepia',
    minValue: -5,
    maxValue: 5,
  },
  {
    name: 'sharpen',
    minValue: 0,
    maxValue: 15,
  },
  {
    name: 'negative',
    minValue: -2.0,
    maxValue: 2.0,
  },
  {
    name: 'contrast',
    minValue: -10.0,
    maxValue: 10.0,
  },
  {
    name: 'saturation',
    minValue: 0.0,
    maxValue: 2,
  },
  {
    name: 'brightness',
    minValue: 0,
    maxValue: 5,
  },
  {
    name: 'temperature',
    minValue: 0.0,
    maxValue: 40000.0,
  },
]; */

const AppFunc = () => {
  const [image, setImage] = useState(null);
  const [newImgUri, setNewImgUri] = useState(null);

  //const imageUri ='https://i0.wp.com/www.eu-esf.org/images/COVID-19/example_shenzhen_BEL.jpg';
  // This img link will expire in 27/Mar/2021
  const imageUri =
    'https://media.cheggcdn.com/study/224/2241f340-6d5a-42fb-b50a-d0487763bb7e/image.png';
  const width = 450;
  const height = (width * 300) / 250;

  const settings = [
    {
      name: 'contrast',
      minValue: 1,
      maxValue: 2,
    },
    {
      name: 'brightness',
      minValue: 1,
      maxValue: 2,
    },
    {
      name: 'saturation',
      minValue: 0,
      maxValue: 2,
    },
  ];

  const [photoSettings, setPhotoSettings] = useState({
    ...settings,
    contrast: 1,
    brightness: 1,
    saturation: 1,
  });

  const presets = {
    contrast: 1.75,
    brightness: 1.5,
    saturation: 0,
  };

  const saveImage = async () => {
    if (!image) {
      console.log("Img doesn't work");
      return;
    }

    const result = await image.glView.capture();
    setNewImgUri(result.uri);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Original image</Text>
        <Image
          style={{ width, height }}
          source={{
            uri: imageUri,
          }}
        />
        <Text style={styles.title}>Image with defined presets</Text>
        <Text>Contrast: 1.75, Brightness: 1.5, Saturation: 0</Text>
        <Surface style={{ width, height }}>
          <ImageFilters {...presets} width={width} height={height}>
            {{
              uri: imageUri,
            }}
          </ImageFilters>
        </Surface>
        <Text style={styles.title}>Playing with image filters</Text>
        <Surface style={{ width, height }} ref={ref => setImage(ref)}>
          <ImageFilters {...photoSettings} width={width} height={height}>
            {{
              uri: imageUri,
            }}
          </ImageFilters>
        </Surface>
        {settings.map(filter => (
          <Filter
            value={filter.initialValue}
            key={filter.name}
            name={filter.name}
            minimum={filter.minValue}
            maximum={filter.maxValue}
            onChange={value =>
              setPhotoSettings({ ...photoSettings, [filter.name]: value })
            }
          />
        ))}
        <Button
          title={'Save image'}
          rounded={false}
          style={styles.button}
          block
          onPress={saveImage}
        />
        {newImgUri && (
          <>
            <Text style={styles.title}>Image after filters</Text>
            <Image
              style={{ width, height }}
              source={{
                uri: newImgUri,
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  button: { marginVertical: 60, borderRadius: 0 },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AppFunc;
