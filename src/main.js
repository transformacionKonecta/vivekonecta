import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDX1vrBjSyw1iumEpBmvtEZ0gIzQcuu8_I',
    libraries: 'places',
  },
  installComponents: true
})

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase';
import moment from 'moment';

Vue.prototype.moment = moment
Vue.config.productionTip = false

// Initialize Firebase
const firebaseConfig = {

  apiKey: "AIzaSyDX1vrBjSyw1iumEpBmvtEZ0gIzQcuu8_I",
  authDomain: "seleccion-digital.firebaseapp.com",
  databaseURL: "https://seleccion-digital.firebaseio.com",
  projectId: "seleccion-digital",
  storageBucket: "seleccion-digital.appspot.com",
  messagingSenderId: "165269710063",
  appId: "1:165269710063:web:20a6c5611b6f587f5da71a",
  measurementId: "G-MMDEVB0DW0"

  // apiKey: "AIzaSyDliUPIFrnpmQuBGn-tvAtXwlu0MgEMNT40rs",
  // authDomain: "seleccion-qa.firebaseapp.com",
  // databaseURL: "https://seleccion-qa.firebaseio.com",
  // projectId: "seleccion-qa",
  // storageBucket: "seleccion-qa.appspot.com",
  // messagingSenderId: "818313697801",
  // appId: "1:818313697801:web:bd5bce6e2dcb2acde1f6d8",

  // apiKey: "AIzaSyB5Ap0VYAT3-rkIxVGu9eBp6oEf9VJZyas",
  // authDomain: "konectase-desa.firebaseapp.com",
  // databaseURL: "https://konectase-desa.firebaseio.com",
  // projectId: "konectase-desa",
  // storageBucket: "konectase-desa.appspot.com",
  // messagingSenderId: "962491687547",
  // appId: "1:962491687547:web:a0fcbee16feb4ad0a9b8de",
  // measurementId: "G-ZWE6D4HTXB"
  
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
