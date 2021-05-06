import React from 'react';
import {abbreviate} from '@pqt/abbreviate';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default function (porps: any) {
  return <Report {...porps} />;
}

interface Props {
  backColor: string;
  textColor: string;
}

class Report extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
  }
  render() {
    const {backColor, textColor} = this.props;
    const gradientColor =
      backColor === '#fff' ? ['#fff', '#fff'] : ['#FF512F', '#DD2476'];
    return (
      <View style={styles.ReportLayout}>
        <TouchableOpacity
          style={[styles.ReportCard, {backgroundColor: backColor}]}>
          <View style={styles.container}>
            <View style={styles.head}>
              <Text
                style={{fontSize: 17, fontWeight: 'bold', color: textColor}}>
                Daily Updates
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.head}>
              <Text style={[styles.headText, {color: textColor}]}>
                Location
              </Text>
            </View>
            <View style={styles.head}>
              <Text style={[styles.headText, {color: textColor}]}>Cases</Text>
            </View>
            <View style={styles.head}>
              <Text style={[styles.headText, {color: textColor}]}>
                Recovered
              </Text>
            </View>
            <View style={styles.head}>
              <Text style={[styles.headText, {color: textColor}]}>Deaths</Text>
            </View>
          </View>
          <View style={styles.containerText}>
            <View style={styles.ComponentText}>
              <Text style={[styles.headText, {color: textColor}]}>India</Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(1080000, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>+108000</Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(900000, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>+100000</Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(3000, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>+800</Text>
            </View>
          </View>
          <View style={styles.containerText}>
            <View style={styles.ComponentText}>
              <Text style={[styles.headText, {color: textColor}]}>World</Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(100000000, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>+108000</Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(60000000, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>+10000</Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(5000000, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>+800</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ReportLayout: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  ReportCard: {
    flex: 1,
    width: '93%',
    borderRadius: 17,
    overflow: 'hidden',
    padding: 7,
    paddingRight: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
  },
  containerText: {
    width: '100%',
    flexDirection: 'row',
    flex: 1.3,
  },
  head: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  ComponentText: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headText: {
    fontWeight: '500',
    fontSize: RFPercentage(2),
  },
  numberValue: {
    fontSize: 16,
    color: '#fff',
  },
  newValue: {
    fontSize: 11,
    fontWeight: '100',
  },
});
