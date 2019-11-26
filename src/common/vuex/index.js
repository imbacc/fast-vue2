import Vue from 'vue'
import Vuex from 'vuex'

import api_config from '../config/api'	//导入API
import http_request from '../request/api_request'	//导入API方法

Vue.use(Vuex)

//vuex 模块
import user_module from './module/user_vuex.js'
import lc_module from './module/lc_vuex.js'
import dzf_module from './module/dzf_vuex.js'

//共享参数
const state = {

}

//同步方法
const mutations = {

}

//异步方法
const actions = {
  /**
     * 统一API info[0,1,2,3,4]
     * 0是api名称 例 => 'app_login'
     * 1是api param参数 => {t:1} url?t=1 携带参数 json格式
     * 2是api body参数 => {t:1} json对象参数 json格式
     * 3是api分页参数 格式[1,10]
     * 4是api缓存时间 默认0
     * 5是api请求方式 默认post 或 get
     */
    async api_action({}, info = ['',{},{}, false, 0, 'post']) {
      const api_json = info[3] === false || info[3] === undefined ? info[1] : api_config.get_args_page(info[1], info[3])
      // const load = info[0].indexOf('wait') === -1
      // if(load) uni.showLoading({mask:true})
      const request = await http_request(api_config[info[0]],api_json,info[2], info[5], info[4])
      // if(load) uni.hideLoading()
      return Promise.resolve(request)
    },
}

const getters = {

}

const modules = {
	user_module,
  lc_module,
  dzf_module,
}

const vuex = new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
  modules,
})

export default vuex