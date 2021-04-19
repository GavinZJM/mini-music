<template>
  <div>
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
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .u-collapse-title {
    padding-left: 5px;
  }
  .u-collapse-item {
    position: relative;
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
</style>