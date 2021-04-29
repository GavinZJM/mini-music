import http from './index'

export const searchSong = params=>http.get('http://api.sunyj.xyz?site=netease', params)
export const searchLyric = params=>http.get('http://api.sunyj.xyz?site=netease', params)
export const searchRandMusic = params=>http.get('https://api.uomg.com/api/rand.music', params)