<template>
  <div>
    <Button @click="delAll">清空所有歌单</Button>
		<view v-for="(item, index) in list" :key="item.id" type="success">
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
          <div class="list-btn">
              <Button type="primary" class="btn" @click="minusToList(item)">从歌单去除</Button>              
          </div>
	    	</u-collapse-item>
	    </u-collapse>
      <div class="line"></div>
    </view>    
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
        list: [],
        listPlayStatus: [],
        showSongList: false,
        bgMusicObj: null
			}
		},
    computed: {
      musicList(){
        return this.$store.state.musicList
      },
      listStatus(){
        return this.$store.state.listPlayStatus
      },
      currentMusic(){
        return this.$store.state.currentMusic
      }
    },
    watch: {
      currentMusic: {
        handler(newVal){
          if(newVal){
            this.updateListPlayStatus({
              playStatus: 'blank'
            })
            this.list.forEach((item) => {
              if(item.id === this.$store.state.currentMusic.id){
                this.updateListPlayStatus({
                  playStatus: 'push',
                  value: false
                })
              } else {
                this.updateListPlayStatus({
                  playStatus: 'push',
                  value: true
                })      
              }
            })            
          }
        },
        immediate: true,
      },
      musicList: {
        handler(newVal){
          this.list = newVal
        },
        immediate: true
      },
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
      }
    },
    onShow() {
        this.updateListPlayStatus({
          playStatus: 'blank'
        })
        this.list.forEach((item) => {
          if(item.id === this.$store.state.currentMusic.id){
            this.updateListPlayStatus({
              playStatus: 'push',
              value: false
            })
          } else {
            this.updateListPlayStatus({
              playStatus: 'push',
              value: true
            })      
          }
        })
    },

		methods: {
      ...mapMutations(['addList', 'minusList','updateCurrentIndex', 'updateCurrentMusic', 'updateListPlayStatus', 'delAllList', 'updateCurrentPlayer']),
      addToList(item){
        this.addList(item)
        console.log(this)
      },
      minusToList(item){
        this.minusList(item)
        console.log(this)
      },
      delAll(){
        this.delAllList()
      },
      playBgMusic(item,index){
        // 这里要更新当前音乐把他记录下来 然后每次搜索打开结果后要索引相同的歌曲 如果正在播放 则显示播放按钮
        this.updateCurrentMusic({
          ...item,
          type: 'add'
        })
        this.stopMusic(this.bgMusicObj, index)
        // this.addToList(item)
        let itemId = item.id
        //index 为 undefined 会走 歌单播放逻辑  就是下面的递归
        // index !== undefined && (this.updateListPlayStatus({
        //   playStatus: 'change',
        //   index,
        //   value: false
        // }))
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
            // if(itemId === this.$store.state.musicList[this.$store.state.currentIndex - 1].id){
            //   this.updateCurrentIndex()
            // }
            this.$store.state.musicList[this.$store.state.currentIndex - 1] && this.playBgMusic(this.$store.state.musicList[this.$store.state.currentIndex - 1])
					  console.log('自然播放结束事件');
          }
      },
      playMusic(e){
        console.log(e)
      },
      stopMusic(musicObj, index){
        if(musicObj){
          musicObj.stop()   
          this.updateCurrentPlayer(null) 
        }
        this.bgMusicObj = null
        //排他
        // if(index !== undefined){
        //   this.updateListPlayStatus({
        //     playStatus: 'changeAll',
        //     value: true
        //   })          
        // }

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
