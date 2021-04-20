<template>
  <div v-html="lyric"></div>
</template>

<script>
export default {
  data(){
    return {
      lyric: ''
    }
  },
  onShow(){
    this.getLyric()
  },
  methods: {
    async getLyric(){
      let res = await this.$api.searchLyric({
        lyric: this.$store.state.currentMusic.lyric_id        
      })
      this.lyric = res.data.lyric
    }
  }
}
</script>

<style>

</style>