import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useColorScheme} from 'react-native';
import {StackScreens} from './Stack';
import {DrawerContent} from '../components/DrawerContent';

const Drawer = () => {
  const drawer = createDrawerNavigator();
  const backColor = useColorScheme() === 'dark' ? '#242424' : '#fff';
  const textColor = useColorScheme() === 'dark' ? '#fff' : '#000';
  const componentColor =
    useColorScheme() === 'dark' ? '#121212' : 'rgba(255,255,255,0.87)';
  return (
    <NavigationContainer>
      <drawer.Navigator
        drawerStyle={{width: '80%', backgroundColor: backColor, padding: 5}}
        drawerContent={porps => (
          <DrawerContent
            {...porps}
            textColor={textColor}
            componentColor={componentColor}
          />
        )}>
        <drawer.Screen name="mainhome" component={StackScreens} />
      </drawer.Navigator>
    </NavigationContainer>
  );
};

export default Drawer;
