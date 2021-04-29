<template>
	<view class="content">
    <u-loading v-if="isLoading" class="search-loading" color="green" :show="isLoading"></u-loading>
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
    <div class="search">
      <div class="search-input">
        <input v-model="searchSongName" placeholder="请输入音乐名" type="text">       
      </div>
      <u-button size="mini" class="search-btn" type="success" @click="searchSong">搜索</u-button>
    </div>
    <div class="rand_music">
        <view @click="searchRandMusic('热歌榜', true)" hover-class="hover-class" class="rand_music_item">热歌榜</view>
        <view @click="searchRandMusic('新歌榜', true)" hover-class="hover-class" class="rand_music_item">新歌榜</view>
        <view @click="searchRandMusic('飙升榜', true)" hover-class="hover-class" class="rand_music_item">飙升榜</view>
        <view @click="searchRandMusic('抖音榜', true)" hover-class="hover-class" class="rand_music_item">抖音榜</view>
        <view @click="searchRandMusic('电音榜', true)" hover-class="hover-class" class="rand_music_item">电音榜</view>
    </div>
    <!-- 正常歌曲搜索 -->
    <u-popup v-model="showSongList" mode="left" :accordion="false" :width="600" :custom-style="{'padding-left':'10px','padding-right':'5px'}">
			<view v-for="(item, index) in searchSongList" :key="item.id" type="success">
	      <u-collapse ref="popup" :arrow="false">
	      	<u-collapse-item class="collapse-item" :title="`专辑：${item.album}`" :disabled="true" :open="true" @click="playMusic">
            <!-- <view v-if="item.rand_picurl" class="mb5">
              <view><img class="mb5-cover" :src="item.rand_picurl" /></view>
            </view> -->
	      		<view class="mb5">
              <view>专辑：</view><view class="mb5-content">{{item.album}}</view>
            </view>
            
	      		<view class="mb5">
              <view>歌曲：</view><view class="mb5-content">{{item.name}}</view>
            </view>
	      		<view class="mb5">
              <view>歌手：</view><view class="mb5-content">{{item.artist.join()}}</view>
            </view>
            <div class="list-play-btn">
              <i v-if="!listPlayStatus[index].status" @click="stopMusic(bgMusicObj, index)" class="iconfont icon-zanting"></i>
              <i @click="playBgMusic(item,index)" v-else class="iconfont icon-bofang"></i>
            </div>
            <div class="list-btn">
              <Button type="primary" class="btn" @click="addToList(item)">添加至歌单</Button>
              <!-- <Button type="primary" class="btn" @click="minusToList(item)">从歌单去除</Button> -->
            </div>
	      	</u-collapse-item>
	      </u-collapse>
        <div class="line"></div>
      </view>
      <div class="add_all_box">
        <Button class="add_all" type="primary" @click="addAllList">全部添加至歌单</Button>        
      </div>
		</u-popup>
	</view>
</template>

<script>
  import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
        isLoading: false,
				title: 'mini音乐',
        searchSongName: '',
        searchSongList: [],
        searchRandMusicList: [],
        searchRandMusicLimit: 10,
        listPlayStatus: [],
        showSongList: false,
        showRandSongList: false,
        bgMusicObj: null,
        currentM: null,
			}
		},
    computed: {
      listStatus(){
        return this.$store.state.searchListPlayStatus
      },
      currentMusic(){
        return this.$store.state.currentMusic
      },
    },
    watch: {
      listStatus: {
        handler(newVal){
          this.listPlayStatus = newVal
        },
        immediate: true
      },
      bgMusicObj: {
        handler(newVal){
          if(newVal)this.updateCurrentPlayer(newVal) 
        },
        immediate: true        
      },
      currentMusic: {
        handler(newVal){
          if(newVal){
            this.updateSearchListPlayStatus({
              playStatus: 'blank'
            })
            // let list = this.searchSongList.map((item)=>{
            //   return {
            //     status: true
            //   }
            // })
            // this.updateSearchListPlayStatus({
            //   playStatus: 'cover',
            //   arr: list
            // })
            this.searchSongList.forEach((item, index) => {
              if(item.id === this.$store.state.currentMusic.id){
                this.updateSearchListPlayStatus({
                  playStatus: 'change',
                  value: false,
                  index
                })
              } else {
                this.updateSearchListPlayStatus({
                  playStatus: 'change',
                  value: true,
                  index
                })
              }
            })
          }
          this.currentM = newVal
        },
        immediate: true
      },
    },
		onShow() {

		},
		methods: {
      ...mapMutations(['addList', 'minusList','updateCurrentIndex', 'updateCurrentMusic', 'updateSearchListPlayStatus', 'updateCurrentPlayer']),
      addAllList(){
        this.searchSongList.forEach(item => {
          this.addList(item)
        })
      },
      addToList(item){
        this.addList(item)
        console.log(this)
      },
      minusToList(item){
        this.minusList(item)
        console.log(this)
      },
      async searchSong(){
        if(!this.searchSongName){
          uni.showToast({
            title: '请输入歌名',
            icon: 'none'
          })
          return
        }
        this.isLoading = true
        let res = await this.$api.searchSong({
          search: this.searchSongName
        })
        if(res.statusCode === 200){
          this.searchSongList = res.data
          let list = this.searchSongList.map((item)=>{
            return {
              status: true
            }
          })
          this.updateSearchListPlayStatus({
            playStatus: 'cover',
            arr: list
          })
          this.$nextTick(()=>{
            this.showSongList = true
            this.$refs.popup.forEach(item => {
              item.init()
            })           
          })
          console.log(this.searchSongList)   
          this.showSongList = true
        } else {
          uni.showToast({
            title: '搜索失败',
            icon: 'none'
          })
        }
        this.isLoading = false
      },
      async searchRandMusic(sort, isInit){
        if(isInit){
          this.searchSongList = []
        }
        this.isLoading = true
        let res = await this.$api.searchRandMusic({
          sort,
          format: 'json'
        })
        if(res.statusCode === 200){
          //如果返回重复的歌曲则重新搜索
          let isPush = true
          this.searchSongList.forEach(item => {
            if(item.id === res.data.data.url.match(/id=(\d)+/)[1]){
              isPush= false
            }
          })
          if(isPush){
            this.searchSongList.push({
              type1: 'rand_music',
              album: sort,
              id: +res.data.data.url.match(/id=(\d+)/)[1],
              artist: [ res.data.data.artistsname ],
              name: res.data.data.name,
              lyric_id: +res.data.data.url.match(/id=(\d+)/)[1],
              rand_picurl: res.data.data.picurl,
              rand_url: res.data.data.url
            })            
          }

          if(this.searchSongList.length >9) {
            this.isLoading = false
            let list = this.searchSongList.map((item)=>{
              return {
                status: true
              }
            })
            this.updateSearchListPlayStatus({
              playStatus: 'cover',
              arr: list
            })
            this.$nextTick(()=>{
              this.$refs.popup.forEach(item => {
                item.init()
              })           
            })
            this.showSongList=true
            return
          }
          this.searchRandMusic(sort)
        }
        
      },
      playBgMusic(item,index,isFromList = false){
        // 这里要更新当前音乐把他记录下来 然后每次搜索打开结果后要索引相同的歌曲 如果正在播放 则显示播放按钮
        this.updateCurrentMusic({
          ...item,
          type: 'add'
        })
        this.stopMusic(this.bgMusicObj, index, isFromList)
        !isFromList && this.addToList(item)
        let itemId = item.id
        //index 为 undefined 会走 歌单播放逻辑  就是下面的递归
        !isFromList && (this.updateSearchListPlayStatus({
          playStatus: 'change',
          index,
          value: false
        }))
        this.bgMusicObj = uni.getBackgroundAudioManager()
        this.bgMusicObj.title = item.album
        this.bgMusicObj.epname = item.name
        this.bgMusicObj.singer = item.artist.join()
        this.bgMusicObj.coverImgUrl = item.type1 === 'rand_music'? item.rand_picurl :'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.uzzf.com%2Fup%2F2017-4%2F2017461348573471.png&refer=http%3A%2F%2Fpic.uzzf.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619254877&t=458c9f82f1589400ffb3d0235784c191'
        // 设置了 src 之后会自动播放
        this.bgMusicObj.src = item.type1 === 'rand_music' ? item.rand_url :`http://music.163.com/song/media/outer/url?id=${item.id}.mp3`

        this.bgMusicObj.play()
        this.bgMusicObj.onPlay(() => {
					console.log('开始播放');
				});				
        this.bgMusicObj.onStop(() => {
					console.log('停止播放');
				});
				
				this.bgMusicObj.onPause(() => {
					console.log('暂停播放');
				});
        this.bgMusicObj.onError(()=>{
          this.updateCurrentMusic({
            type: 'del'
          })
          this.playNext(itemId)
        })	
				this.bgMusicObj.onEnded(() => {
          this.updateCurrentMusic({
            type: 'del'
          })
          this.playNext(itemId)
				});
      },
      playNext(itemId){
          // 这里点播完进行歌单播放
          if(this.$store.state.currentIndex >= this.$store.state.musicList.length-1){
            this.updateCurrentIndex(0)
            console.log('歌单播放结束')
          } else {
            this.updateCurrentIndex()
            // 如果播放刚结束的这一条歌为 歌单正要播放的这一条
            if(itemId === this.$store.state.musicList[this.$store.state.currentIndex].id){
              this.updateCurrentIndex()
            }
            this.$store.state.musicList[this.$store.state.currentIndex] && this.playBgMusic(this.$store.state.musicList[this.$store.state.currentIndex], undefined, true)
					  console.log('自然播放结束事件');
          }
      },
      playMusic(e){
        console.log(e)
      },
      stopMusic(musicObj, index, isFromList){
        if(musicObj) {
          musicObj.stop()
          this.updateCurrentPlayer(null)          
        }
        this.bgMusicObj = null
        //排他
        if(!isFromList){
          this.updateSearchListPlayStatus({
            playStatus: 'changeAll',
            value: true
          })         
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
  .hover-class {
    color: red!important;
  }
  .add_all_box {
    height: 50px;
    .add_all {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 300px;
      transform: translate3d(0,0,0);
    }
  }

  /deep/.u-collapse-title {
    padding-left: 5px;
  }
  /deep/.u-collapse-item {
    position: relative;
    .list-btn {
      padding-top: 30px;
      padding-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        font-size: 12px;
      }
    }
  }
  .list-play-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .icon-zanting {
    color: red;
    font-size: 50px;
  }
  .icon-bofang {
    color: skyblue;
    font-size: 50px;
  }
  .mb5 {
    margin-bottom: 5px;
    padding-left: 5px;
    display: flex;
    .mb5-cover {
      width: 130px;
      height: 120px;
    }
    .mb5-content {
      width: 190px;
    }
  }
  .line {
    height: 1px;
    width: 100%;
    background-color: #999;
  }
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
    padding-bottom: 200px;
		justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .search-loading {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;  
      z-index: 9999;
      background-color: rgba(0,0,0,0.1);
      /deep/.u-loading-circle {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
	}
  .search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    .search-input {
      width: 150px;
      border: 1px #19be6b solid;
    }
    .search-btn {
      width: 60px;
      margin-left: 20px;
    }
  }
  .rand_music {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    .rand_music_item {
      margin-left: 5px;
      margin-right: 5px;
      color: skyblue;
    }
  }
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
