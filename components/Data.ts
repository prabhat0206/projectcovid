const OptionsData = [
  {
    id: 1,
    title: 'DIET',
    url:
      'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_720.jpg',
    title2: 'FACTS',
    url2:
      'https://cdn.pixabay.com/photo/2016/08/20/09/46/magnifying-glass-1607160_960_720.jpg',
  },
  {
    id: 2,
    title: 'WHO',
    url:
      'https://cdn.pixabay.com/photo/2020/03/30/16/40/who-4984801_960_720.jpg',
    title2: 'GUIDELINES',
    url2:
      'https://cdn.pixabay.com/photo/2018/07/28/14/52/mission-3568221_960_720.jpg',
  },
  {
    id: 3,
    title: 'HOSPITALS',
    url:
      'https://cdn.pixabay.com/photo/2020/03/07/04/32/covid-19-4908692_960_720.jpg',
    title2: 'FAQs',
    url2:
      'https://cdn.pixabay.com/photo/2016/11/30/12/16/question-mark-1872665_960_720.jpg',
  },
];

export const drawerItem = [
  {
    id: 1,
    name: 'home',
    icon: 'home',
  },
  {
    id: 2,
    name: 'advisory videos',
    icon: 'play',
  },
  {
    id: 3,
    name: 'relief fund',
    icon: 'hand-holding-usd',
  },
  {
    id: 4,
    name: 'GRAPH REPORTS',
    icon: 'chart-line',
  },
  {
    id: 5,
    name: 'about',
    icon: 'info-circle',
  },
];

export const blurImage = require('../assets/back.jpg');

export const advisoryVideo = [
  {
    id: 1,
    url:
      'https://cdn.pixabay.com/photo/2020/07/06/01/33/sky-5375005_960_720.jpg',
    name: 'Hello World',
    video: '',
  },
];

let address: string;
export const apiAddress = (caseIn: string) => {
  caseIn = caseIn.split(' ')[0];
  switch (caseIn) {
    case 'WHO':
      address = 'https://dl.dropboxusercontent.com/s/8yglsl30j4pbw5e/who.json';
      break;
    case 'FACTS':
      address =
        'https://dl.dropboxusercontent.com/s/r5bpi4bi6ulai4o/facts.json';
      break;
    case 'GRAPH':
      address =
        'https://dl.dropboxusercontent.com/s/2xe915edfx3eyue/report.json?dl=0';
      break;
    case 'FAQs':
      address = 'https://dl.dropboxusercontent.com/s/rdrgdbvsc0avgdt/faq.json';
      break;
    case 'DIET':
      address = 'https://dl.dropboxusercontent.com/s/j8ls4hzpgarsrkj/diet.json';
      break;
    case 'RELIEF':
      address =
        'https://dl.dropboxusercontent.com/s/7lnn9hhjl4gd2lu/links.json';
      break;
    case 'GUIDELINES':
      address =
        'https://dl.dropboxusercontent.com/s/6g5pss8knsjw98b/guidlines.json';
      break;
    case 'ABOUT':
      address =
        'https://dl.dropboxusercontent.com/s/mlyloeaxvf05h4n/aboutCovid.json';
      break;
    case 'about':
      address =
        'https://dl.dropboxusercontent.com/s/vp978um4agpixv8/about.json';
      break;
  }
  return address;
};

export default OptionsData;
