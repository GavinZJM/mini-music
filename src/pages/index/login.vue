<template>
  <div class="login">
    <div class="login-btn">
      <u-button type="success" @click="login">微信授权登陆</u-button>
    </div>
  </div>

</template>

<script>
export default {
methods: {
  login(){
    this.$wx.login({
      success(res){
        if(res.code){
          uni.showToast({
            title: '登录成功'
          })
          uni.switchTab({
            url:'index',
            success:(res)=>{
              console.log('suc', res)
            },
            fail:(res)=>{
              console.log('err', res)
            }
          })
        } else {
          uni.showToast({
            title: '登录失败',
            icon: 'error'
          })
        }
      }
    })
  }
}
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-btn {
    width: 300px;
  }
}
</style>