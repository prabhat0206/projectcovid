import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useColorScheme,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {whoData, blurImage} from '../components/Data';

interface Props {
  route: any;
}

export const Information = ({route}: Props) => {
  const [first, setFirst] = React.useState<string[]>([]);
  const [second, setSecond] = React.useState<any>({});
  const [third, setThird] = React.useState([]);
  const [forth, setForth] = React.useState('');
  const [fifth, setFifth] = React.useState<any>({});
  const [sixth, setSixth] = React.useState<any>({});
  const [lastText, setLastText] = React.useState('');
  const [images, setImages] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(whoData)
      .then(response => response.json())
      .then(data => {
        setFirst(data.first);
        setSecond(data.second);
        setThird(data.third);
        setForth(data.forth);
        setFifth(data.fifth);
        setSixth(data.sixth);
        setLastText(data.last_text);
        setImages(data.images);
        setLoading(false);
      });
  }, []);

  const darkMode = useColorScheme() === 'dark';
  const backColor = darkMode ? '#121212' : 'rgba(255,255,255,0.87)';
  const overlayColor = darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
  const textColor = darkMode ? 'rgba(255,255,255,0.8)' : '#000';
  const {width, height} = Dimensions.get('window');
  let mostId = 0;
  let lessId = 0;
  let seriousid = 0;
  const {headTitle}: any = route.params;
  return (
    <ScrollView style={{flex: 1, width: width, backgroundColor: backColor}}>
      {loading ? (
        <View
          style={{
            flex: 1,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
          }}>
          <ActivityIndicator size="large" color={textColor} />
        </View>
      ) : (
        <ImageBackground
          source={blurImage}
          blurRadius={80}
          style={[styles.mainContainer, {backgroundColor: backColor}]}>
          <View style={[styles.fullOverlay, {backgroundColor: backColor}]}>
            <>
              <ImageBackground
                blurRadius={10}
                source={{uri: images.banner}}
                style={styles.topImageContainer}>
                <View style={[styles.overlay, {backgroundColor: overlayColor}]}>
                  <Text style={[styles.HeadText, {color: textColor}]}>
                    {headTitle}
                  </Text>
                </View>
              </ImageBackground>
              <View style={[styles.topText]}>
                {/* // first */}
                {first === null || first === undefined ? null : (
                  <>
                    {first.map(text => (
                      <Text
                        style={[styles.text, {color: textColor}]}
                        key={text}>
                        {text}
                      </Text>
                    ))}
                  </>
                )}
                {images.image_1 === null ? null : (
                  <Image
                    source={{uri: images.image_1}}
                    style={styles.componentImage}
                  />
                )}
                {/* // second */}
                {second === null ? null : (
                  <>
                    <Text style={[styles.text, {color: textColor}]}>
                      {second.head}
                    </Text>
                    {second.data.map((data: any) => (
                      <Text
                        style={[styles.listText, {color: textColor}]}
                        key={data}>
                        {data}
                      </Text>
                    ))}
                  </>
                )}

                {images.image_2 === null ? null : (
                  <Image
                    source={{uri: images.image_2}}
                    style={styles.componentImage}
                  />
                )}
                {third === null ? null : (
                  <>
                    {third.map(text => (
                      <Text
                        key={text}
                        style={[styles.text, {color: textColor}]}>
                        {text}
                      </Text>
                    ))}
                  </>
                )}
                {forth === null ? null : (
                  <>
                    {forth.split(',').map(text => {
                      mostId += 1;
                      return (
                        <Text
                          key={text}
                          style={[styles.listText, {color: textColor}]}>
                          {mostId}. {text}
                        </Text>
                      );
                    })}
                  </>
                )}

                {images.image_3 === null ? null : (
                  <Image
                    source={{uri: images.image_3}}
                    style={styles.componentImage}
                  />
                )}

                {fifth === null ? null : (
                  <>
                    <Text style={[styles.text, {color: textColor}]}>
                      {fifth.fifth_head}
                    </Text>
                    {fifth.data.split(',').map((text: string) => {
                      lessId += 1;
                      return (
                        <Text
                          key={text}
                          style={[styles.listText, {color: textColor}]}>
                          {lessId}. {text}
                        </Text>
                      );
                    })}
                  </>
                )}

                {images.image_4 === null ? null : (
                  <Image
                    source={{uri: images.image_4}}
                    style={styles.componentImage}
                  />
                )}
                {sixth === null ? null : (
                  <>
                    <Text style={[styles.text, {color: textColor}]}>
                      {sixth.sixth_head}
                    </Text>
                    {sixth.data.split(',').map((text: string) => {
                      seriousid += 1;
                      return (
                        <Text
                          key={text}
                          style={[styles.listText, {color: textColor}]}>
                          {seriousid}. {text}
                        </Text>
                      );
                    })}
                  </>
                )}
                {images.image_5 === null ? null : (
                  <Image
                    source={{uri: images.image_5}}
                    style={styles.componentImage}
                  />
                )}
                {lastText === null ? null : (
                  <>
                    {lastText.split('.').map((text: string) => (
                      <Text
                        key={text}
                        style={[styles.text, {color: textColor}]}>
                        {text}
                      </Text>
                    ))}
                  </>
                )}
                {images.image_6 === null ? null : (
                  <Image
                    source={{uri: images.image_6}}
                    style={styles.componentImage}
                  />
                )}
              </View>
            </>
          </View>
        </ImageBackground>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  topImageContainer: {
    height: 200,
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    zIndex: 1,
  },
  HeadText: {
    marginLeft: 60,
    marginBottom: 60,
    fontSize: RFPercentage(5),
  },
  topText: {
    width: '100%',
    overflow: 'hidden',
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  fullOverlay: {
    flex: 1,
    width: '100%',
  },
  componentImage: {
    width: '100%',
    height: 250,
    borderRadius: 25,
    marginTop: 20,
  },
  text: {
    fontSize: RFPercentage(2.2),
    marginTop: 10,
    textAlign: 'justify',
  },
  listText: {
    fontSize: RFPercentage(1.9),
    marginTop: 5,
    textAlign: 'justify',
  },
});
