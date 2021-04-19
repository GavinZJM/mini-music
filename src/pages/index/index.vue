<template>
	<view class="content">
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
    <u-popup v-model="showSongList" mode="left" :accordion="false" :width="600" :custom-style="{'padding-left':'10px','padding-right':'5px'}">
			<view v-for="(item, index) in searchSongList" :key="item.id" type="success">
	      <u-collapse ref="popup" :arrow="false">
	      	<u-collapse-item class="collapse-item" :title="`专辑：${item.album}`" :disabled="true" :open="true" @click="playMusic">
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
	      	</u-collapse-item>
	      </u-collapse>
        <div class="line"></div>
      </view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'mini音乐',
        searchSongName: '',
        searchSongList: [],
        listPlayStatus: [],
        showSongList: false,
        bgMusicObj: null
			}
		},
		onShow() {
		},
		methods: {
      playBgMusic(item,index){
        this.stopMusic(this.bgMusicObj, index)
        this.listPlayStatus[index].status = false
        this.bgMusicObj = uni.getBackgroundAudioManager()
        this.bgMusicObj.title = item.album
        this.bgMusicObj.epname = item.name
        this.bgMusicObj.singer = item.artist.join()
        this.bgMusicObj.coverImgUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.uzzf.com%2Fup%2F2017-4%2F2017461348573471.png&refer=http%3A%2F%2Fpic.uzzf.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619254877&t=458c9f82f1589400ffb3d0235784c191'
        // 设置了 src 之后会自动播放
        this.bgMusicObj.src = `http://music.163.com/song/media/outer/url?id=${item.id}.mp3`

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
				this.bgMusicObj.onEnded(() => {
					//初始化 需要的参数
					console.log('自然播放结束事件');
				});
      },
      async searchSong(){
        if(!this.searchSongName){
          uni.showToast({
            title: '请输入歌名',
            icon: 'none'
          })
          return
        }
        let res = await this.$api.searchSong({
          search: this.searchSongName
        })
        if(res.statusCode === 200){
          this.searchSongList = res.data
          this.listPlayStatus = this.searchSongList.map((item)=>{
            return {
              status: true
            }
          })
          this.$nextTick(()=>{
            this.$refs.popup.forEach(item => {
              item.init()
            })           
          })   
          this.showSongList = true
        } else {
          uni.showToast({
            title: '搜索失败',
            icon: 'none'
          })
        }
      },
      playMusic(e){
        console.log(e)
      },
      stopMusic(musicObj, index){
        if(musicObj) musicObj.stop()
        this.bgMusicObj = null
        //排他
        this.listPlayStatus.forEach(i => {
          i.status = true
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
  /deep/.u-collapse-title {
    padding-left: 5px;
  }
  /deep/.u-collapse-item {
    position: relative;
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
		justify-content: center;
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
