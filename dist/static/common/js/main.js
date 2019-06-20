import Vue from 'vue'
import axios from 'axios'
// import '../../../src/main'
import router from '../../../src/router'

let domain = window.location.host;
if (domain == 'localhost:8089' || domain == '192.168.0.12:8089') {
  //测试线上地址
  Vue.prototype.ApiUrl = 'http://192.168.0.13:8089/studyassistant';
}
else if (domain == 'admin.becent.cc') {
  Vue.prototype.ApiUrl = 'https://api-admin.becent.cc';
  Vue.prototype.ApiUrlKuang = 'https://api-admin.becent.cc';
}
else {
  // 正式线上增量代码
  Vue.prototype.ApiUrl = 'studyassistant';
  Vue.prototype.ApiUrlKuang = 'studyassistant';
}

//退出登录token超时
Vue.prototype.Signout = function () {

  this.$message.error('登录超时，重新登录');
  router.push({path: '/'});

  window.sessionStorage.removeItem('isLogin');
  window.sessionStorage.removeItem('name');
  window.sessionStorage.removeItem('passwor');
  window.sessionStorage.removeItem('token');

  store.commit('deleteName');
  store.commit('deletePasswor');
  store.commit('noLogin');
  store.commit('deleteToken');

}

//视图大小
Vue.prototype.changeSize = function () {
  let pcWidth = `${document.documentElement.clientWidth}`;
  windSize()
  function windSize() {
    if (pcWidth < 1600) {
      pcWidth = '250px'
    } else {
      pcWidth = '420px'
    }
  }
  return pcWidth
}

//拦截器
axios.interceptors.response.use(response => {
  // console.log(response)
  if (response.data.success === true) {
    // console.log(111)
  }
  // else if (response.data.error.code == '405') {
  //   // router.push({path: '/error_405'});
  // }
  return response;
}, error => {
  if (error.response.status === 422) {
    // iView.Message.warning(error.response.data.msg);
  }
  if (error.response.status === 404) {
    router.push({
      name: 'error-404'
    });
  }
  if (error.response.status === 401) {
// iView.Message.warning('未获取到登录状态');

    router.push({
      name: 'login'
    });
  }
  return Promise.resolve(error.response);
});
