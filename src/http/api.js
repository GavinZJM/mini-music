import http from './index'

export const searchSong = params=>http.get('http://api.sunyj.xyz?site=netease', params)