

export default {
  get: function(url, data){
    return new Promise((resolve, reject)=>{
      uni.request({
        url,
        data,
        method: 'get',
        success: (res)=>{
          resolve(res)
        },
        fail: (res)=>{
          reject(res)
        }
      })
    })
  },
  post: function(url, data){
    return new Promise((resolve, reject)=>{
      uni.request({
        url,
        data,
        method: 'post'
      }).then(res=>{
        resolve(res)
      }).catch(e=>{
        reject(e)
      })
    })
  },
  put: function(url, data){
    return new Promise((resolve, reject)=>{
      uni.request({
        url,
        data,
        method: 'put'
      }).then(res=>{
        resolve(res)
      }).catch(e=>{
        reject(e)
      })
    })
  },
  delete: function(url, data){
    return new Promise((resolve, reject)=>{
      uni.request({
        url,
        data,
        method: 'delete'
      }).then(res=>{
        resolve(res)
      }).catch(e=>{
        reject(e)
      })
    })
  },
}