import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';

export const VideoPlayer = ({backColor, textColor, route}: any) => {
  const [isPaused, setisPaused] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [position, setPosition] = React.useState(0);
  const [overlay, setOverlay] = React.useState(false);
  const [activity, setActivity] = React.useState(true);
  let player: any;
  function onBuffer() {}
  function videoError() {}
  const playPause = () => {
    if (isPaused) {
      setisPaused(false);
    } else {
      setisPaused(true);
    }
  };
  const forward = () => {
    player.seek(position + 10);
  };
  const backward = () => {
    player.seek(position - 10);
  };
  const touchseekLeft = () => {
    handleDoubleTop(
      () => {
        player.seek(position - 10);
      },
      () => {
        setOverlay(true);
        setTimeout(() => setOverlay(false), 3000);
      },
    );
  };
  const touchseekRight = () => {
    handleDoubleTop(
      () => {
        player.seek(position + 10);
      },
      () => {
        setOverlay(true);
        setTimeout(() => setOverlay(false), 3000);
      },
    );
  };
  let lastTap: any = null;
  let timer: any;
  const handleDoubleTop = (doubleTap: any, singleTap: any) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      clearTimeout(timer);
      doubleTap();
    } else {
      lastTap = now;
      timer = setTimeout(() => {
        singleTap();
      }, DOUBLE_PRESS_DELAY);
    }
  };
  return (
    <View style={styles.VideoLayout}>
      <View style={[styles.videoContainer, {backgroundColor: backColor}]}>
        <View style={[styles.Video]}>
          <Video
            source={{uri: route.params.url}}
            ref={ref => (player = ref)}
            onBuffer={() => {
              setActivity(true);
            }}
            onError={videoError}
            style={styles.backgroundVideo}
            paused={isPaused}
            resizeMode="contain"
            onSeek={res => console.log(res)}
            onLoad={res => {
              setDuration(res.duration), setActivity(false);
            }}
            onProgress={res => {
              setPosition(res.currentTime);
              setActivity(false);
            }}
          />
          {activity ? (
            <>
              <View
                style={[
                  styles.controlContainer,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <ActivityIndicator color="#fff" size="large" />
              </View>
            </>
          ) : null}
          {overlay ? (
            <Animated.View style={styles.controlContainer}>
              <View style={styles.buttonContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity style={[styles.button]} onPress={backward}>
                    <Icon name="chevron-left" color={'#fff'} size={18} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity style={[styles.button]} onPress={playPause}>
                    <Icon
                      name={isPaused ? 'play' : 'pause'}
                      color={'#fff'}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity style={[styles.button]} onPress={forward}>
                    <Icon name="chevron-right" color={'#fff'} size={18} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.track}>
                <Slider
                  maximumValue={duration}
                  value={position}
                  minimumValue={0}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor={'rgba(255,255,255,0.7)'}
                  thumbTintColor="red"
                  onValueChange={value => player.seek(value)}
                />
              </View>
              <View style={styles.timer}>
                <Text style={{color: '#fff'}}>
                  {moment
                    .utc(moment.duration(position, 'seconds').asMilliseconds())
                    .format('mm:ss')}
                </Text>
                <Text style={{color: '#fff'}}>
                  {moment
                    .utc(moment.duration(duration, 'seconds').asMilliseconds())
                    .format('mm:ss')}
                </Text>
              </View>
              <View style={{flex: 2}} />
            </Animated.View>
          ) : null}
          <View style={styles.controlContainerSeek}>
            <View style={styles.touchnative}>
              <TouchableNativeFeedback onPress={touchseekLeft}>
                <View style={{flex: 1}}></View>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.touchnative]}>
              <TouchableNativeFeedback onPress={touchseekRight}>
                <View style={{flex: 1}}></View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  VideoLayout: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  controlContainer: {
    top: 0,
    position: 'absolute',
    flex: 1,
    zIndex: 2,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controlContainerSeek: {
    top: 0,
    position: 'absolute',
    flex: 1,
    width: '100%',
    zIndex: 1,
    height: '100%',
    flexDirection: 'row',
  },
  touchnative: {
    width: '50%',
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  buttonContainer: {
    top: 0,
    position: 'absolute',
    flex: 1,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },

  backgroundVideo: {
    width: '100%',
    overflow: 'hidden',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  Video: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },

  track: {
    position: 'absolute',
    width: '100%',
    paddingLeft: 20,
    bottom: 30,
    paddingRight: 20,
    height: 30,
    zIndex: 5,
    // bottom: 10,
    justifyContent: 'center',
  },
  timer: {
    position: 'absolute',
    paddingLeft: 35,
    height: 20,
    paddingRight: 35,
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 5,
    elevation: 5,
  },
});
