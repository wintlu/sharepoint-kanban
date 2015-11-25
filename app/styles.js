import config from './config';

//https://www.google.com/design/spec/style/color.html#color-color-palette
var red = {
  50: '#FFEBEE',
  100: '#FFCDD2',
  200: '#EF9A9A',
  300: '#E57373',
  400: '#EF5350',
  500: '#F44336',
  600: '#E53935',
  700: '#D32F2F',
  800: '#C62828',
  900: '#B71C1C'
}

var blue= {
  50: '#E3F2FD',
  100: '#BBDEFB',
  200: '#90CAF9',
  300: '#64B5F6',
  400: '#42A5F5',
  500: '#2196F3',
  600: '#1E88E5',
  700: '#1976D2',
  800: '#1565C0',
  900: '#0D47A1',
};

var green = {
  50: '#E8F5E9',
  100: '#C8E6C9',
  200: '#A5D6A7',
  300: '#81C784',
  400: '#66BB6A',
  500: '#4CAF50',
  600: '#43A047',
  700: '#388E3C',
  800: '#2E7D32',
  900: '#1B5E20',
};

var blueGray = {
  50: '#ECEFF1',
  100: '#CFD8DC',
  200: '#B0BEC5',
  300: '#90A4AE',
  400: '#78909C',
  500: '#607D8B',
  600: '#546E7A',
  700: '#455A64',
  800: '#37474F',
  900: '#263238',
};

var taskColors = [blue, green, blueGray, blueGray];
var taskStyles = {};
for (var i = 0; i < 4; i++) {
  var color = taskColors[i];
  taskStyles[config.statusList[i]] = {
    list: color[50],
    listTitle: color[700],
    item: color[100],
    itemHover: color[100]
  };
};

export default Object.assign(
  taskStyles,{
  grid: (percent)=>{
    return {
      float: 'left',
      width: percent + '%'
    };
  },
  getNextStageColor: (status)=>{
    var nextStatus = config.nextStatus(status);
    return taskStyles[nextStatus].listTitle;
  }
});


