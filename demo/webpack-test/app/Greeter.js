// var config = require('./config.json');
// 
// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// };

import React, {Component} from 'react'
import config from './config.json';
import styles from './Greeter.scss';//导入

class Greeter extends Component{
  render() {
    return (
      // 添加类名
      <div className={styles.root}>
        <div className={styles.text}>
          {config.greetText}
        </div>
      </div>
    );
  }
}

export default Greeter