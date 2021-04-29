import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentPlayer: {}, //当前的播放器对象
    musicList:[],
    currentIndex: 0,
    currentMusic: {},
    listPlayStatus: [], // 歌单播放状态
    searchListPlayStatus: [], // 搜索列表播放状态
  },
  mutations: {
    updateCurrentPlayer(state, obj){
      state.currentPlayer = obj
    },
    updateListPlayStatus(state, item){
      // 清空
      if(item.playStatus === 'blank'){
        state.listPlayStatus = []
      }
      // 追加
      if(item.playStatus === 'push'){
        state.listPlayStatus = [...state.listPlayStatus, { status: item.value }]
      }
      // change
      if(item.playStatus === 'change'){
        if(state.listPlayStatus[item.index]){
          state.listPlayStatus[item.index].status = item.value          
        } else {
          state.listPlayStatus[item.index] = {
            status: item.value
          }
        }
      }
      // cover
      if(item.playStatus === 'cover'){
        state.listPlayStatus = item.arr
      }
      // changeAll
      if(item.playStatus === 'changeAll'){
        state.listPlayStatus.forEach(i => {
          i.status = item.value 
        })
      }
    },
    updateSearchListPlayStatus(state, item){
      // 清空
      if(item.playStatus === 'blank'){
        state.searchListPlayStatus = []
      }
      // 追加
      if(item.playStatus === 'push'){
        state.searchListPlayStatus = [...state.searchListPlayStatus, { status: item.value }]
      }
      // change
      if(item.playStatus === 'change'){
        if(state.searchListPlayStatus[item.index]){
          state.searchListPlayStatus[item.index].status = item.value          
        } else {
          state.searchListPlayStatus[item.index] = {
            status: item.value
          }
        }
      }
      // cover
      if(item.playStatus === 'cover'){
        state.searchListPlayStatus = item.arr
      }
      // changeAll
      if(item.playStatus === 'changeAll'){
        state.searchListPlayStatus.forEach(i => {
          i.status = item.value 
        })
      }
    },
    updateCurrentMusic(state, item){
      if(item.type === 'add'){
        state.currentMusic = item
      } else {
        state.currentMusic = {}
      }
    },
    updateCurrentIndex(state, num){
      if(num !== undefined){
        state.currentIndex = num
      }else{
        state.currentIndex++        
      }
    },
    addList(state,music){
      if(state.musicList.length > 500) {
        uni.showToast({
          title: '歌单空间已经溢满',
          icon: 'none'
        })       
        return
      }
      let isAdd = true
      state.musicList.forEach(item=>{
        if(item.id === music.id){
          isAdd = false
        }
      })
      if(!isAdd){
        uni.showToast({
          title: '歌曲已经存在',
          icon: 'none'
        })
      } else {
        state.musicList.push(music)
        uni.showToast({
          title: '添加成功',
          icon: 'none'
        })   
      }
    },
    minusList(state,music){
      state.musicList.forEach((item, index)=>{
        if(item.id === music.id){
          state.musicList.splice(index,1)
          if(state.currentIndex >= index){
            let curIndex = state.currentIndex
            state.currentIndex = curIndex ? curIndex-- : 0
            state.listPlayStatus.shift()
          }
          uni.showToast({
            title: '移除成功',
            icon: 'none'
          })
          // 如果删除小于当前播放下标 重新开始播放
          if(index+1 <= state.currentIndex){
            state.currentIndex = index
          }
          return
        }
      })
      return
    },
    updateList(state, music){
      state.musicList = music
    },
    delAllList(state){
      state.musicList = []
      state.currentIndex = 0
    }
  },
  getters: {
    getterMusicListLen(state){
      let musicList = this.$store.state.musicList
      uni.setStorage({
        key:"music_list",
        data: musicList,
      })
      return state.musicList
    }
  },
})

export default store
