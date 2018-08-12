export default class Song {
  constructor({ id, singer, name, album, image, aliaName, url }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album // 专辑
    this.aliaName = aliaName
    this.image = image
    this.url = url
  }
}

// 如果是两个歌手合唱或者更多，则通过 / 来划分
function singerName(arr) {
  let name = []
  name = arr.map(item => {
    // console.log(arr)
    return item.name
  })

  return name.join('/')
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: singerName(musicData.ar),
    name: musicData.name,
    // aliaName: filiterAliaName(music.alia),
    album: musicData.al.name,
    image: musicData.al.picUrl,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3 `
  })
}
