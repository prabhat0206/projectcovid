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

interface State {
  total_cases: number;
  total_confirmed: number;
  total_recovered: number;
  total_new_recovered: number;
  total_deaths: number;
  total_new_deaths: number;
  world_cases: number;
  world_recovered: number;
  world_deaths: number;
}

class Report extends React.Component<Props> {
  state: State;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      total_cases: 0,
      total_confirmed: 0,
      total_recovered: 0,
      total_new_recovered: 0,
      total_deaths: 0,
      total_new_deaths: 0,
      world_cases: 0,
      world_recovered: 0,
      world_deaths: 0,
    };
  }

  componentDidMount() {
    this.fetchCases('india');
  }

  async fetchCases(country: string) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    let dates: number[] = [];
    let cases_list: number[] = [];
    let recoverd: number[] = [];
    let deaths: number[] = [];
    await fetch(
      'https://api.covid19api.com/total/country/' +
        country +
        '/status/confirmed',
      requestOptions,
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        data.forEach((entry: any) => {
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
        });
      })
      .catch(e => console.log(e));
    const cases = cases_list[cases_list.length - 1];
    await fetch(
      'https://api.covid19api.com/total/country/' +
        country +
        '/status/recovered',
      requestOptions,
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        data.forEach((entry: any) => {
          recoverd.push(entry.Cases);
        });
      });
    const t_recovered = recoverd[recoverd.length - 1];
    await fetch(
      'https://api.covid19api.com/total/country/' + country + '/status/deaths',
      requestOptions,
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        data.forEach((entry: any) => {
          deaths.push(entry.Cases);
        });
      });
    const t_death = deaths[deaths.length - 1];
    this.setState({
      total_cases: cases,
      total_confirmed: cases - cases_list[cases_list.length - 2],
      total_recovered: t_recovered,
      total_new_recovered: t_recovered - recoverd[recoverd.length - 2],
      total_deaths: t_death,
      total_new_deaths: t_death - deaths[deaths.length - 2],
    });

    await fetch('https://corona.lmao.ninja/v2/all?yesterday')
      .then(response => response.json())
      .then(data => {
        this.setState({
          world_cases: data.cases,
          world_deaths: data.deaths,
          world_recovered: data.recovered,
        });
      })
      .catch(e => console.log(e));
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
                {abbreviate(this.state.total_cases, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>
                +{this.state.total_confirmed}
              </Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(this.state.total_recovered, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>
                +{this.state.total_new_recovered}
              </Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(this.state.total_deaths, 2)}
              </Text>
              <Text style={[styles.newValue, {color: textColor}]}>
                +{this.state.total_new_deaths}
              </Text>
            </View>
          </View>
          <View style={styles.containerText}>
            <View style={styles.ComponentText}>
              <Text style={[styles.headText, {color: textColor}]}>World</Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(this.state.world_cases, 2)}
              </Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(this.state.world_recovered, 2)}
              </Text>
            </View>
            <View style={styles.ComponentText}>
              <Text style={[styles.numberValue, {color: textColor}]}>
                {abbreviate(this.state.world_deaths, 2)}
              </Text>
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
    fontSize: RFPercentage(1.8),
  },
  numberValue: {
    fontSize: RFPercentage(2),
    color: '#fff',
  },
  newValue: {
    fontSize: RFPercentage(1.5),
    fontWeight: '100',
  },
});
