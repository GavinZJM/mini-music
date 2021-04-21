<template>
  <div>
    <div v-if="currentM.name" class="title">{{ `--${currentM.name}--` }}</div>
    <div v-if="!lyric.length">
      <p class="lyric_p">搜索无歌词</p>
    </div>
    <div v-else  v-for="(item, index) in lyric" :key="index">
      <p class="lyric_p" :class="[Number(item.time) < Number(currentT) ?'sing':'no-sing']">{{ item.value }}</p>      
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data(){
    return {
      lyric: '',
      currentM: {},
      currentT: 0,
      st: {},
      dayjs
    }
  },
  computed: {
    currentMusic(){
      return this.$store.state.currentMusic
    },
    currentTime(){
      if(this.$store.state.currentPlayer){
        return this.$store.state.currentPlayer.currentTime        
      } else {
        return 0
      }
    }
  },
  watch: {
    currentMusic: {
      handler(newVal){
        this.currentM = newVal
        this.getLyric()
      },
      immediate: true
    },
    currentTime: {
      handler(newVal){
        this.currentT = newVal* 1000
      },
      immediate: true
    }
  },
  onShow(){
    clearInterval(this.st)
    if(this.$store.state.currentPlayer){
      this.st = setInterval(()=>{
        this.currentT = this.$store.state.currentPlayer.currentTime* 1000
      },100)
    }

  },
  onHide(){
    clearInterval(this.st)
  },
  methods: {
    async getLyric(){
      this.lyric = ''
      let res = await this.$api.searchLyric({
        lyric: this.$store.state.currentMusic.lyric_id        
      })
      if(res.data.lyric){
        let result = res.data.lyric.replace(/\n/g, '^')
        result = result.split('^')
        result = result.map(item=>{
          return {
            value: item.split(']')[1],
            time: this.secondToMill(item.split(']')[0].split('[')[1])
          }
        })
        this.lyric = result        
      } else {
        this.lyric = []
      }
    },
    isRed(index){
      if(this.lyric[index] > this.currentT){
        return false
      }
      if(this.lyric[index] <= this.currentT && this.lyric[index-1] >this.currentT){
        return true
      }
      return false
    },
    secondToMill(time){
      let arr = (time+ '').split(':')
      let min = arr[0]
      let sec = arr [1]
      return min*60*1000 + sec*1000
    }
  }
}
</script>

<style lang="scss" scoped>
.sing {
  color: red;
}
.no-sing {
  color: black;
}
.title {
  text-align: center;
  font-size: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.lyric_p {
  &:first-child {
    margin-top: 10px
  }
  margin-bottom: 5px;
  text-align: center;
}
</style>