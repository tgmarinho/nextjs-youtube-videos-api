
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: `https://content-youtube.googleapis.com/youtube/v3/playlistItems?playlistId=UUSfwM5u0Kce6Cce8_S72olg&maxResults=50&part=snippet&key=${API_KEY}`
});



// https://www.youtube.com/watch?v=${url}&ab_channel=Rocketseat


export async function getVideos() {
  console.log("teste")
  const videos = await api.get('')
  // const vid: Data = videos.items(video => ({
  //   id: video.id,
  //   title: video.snippet.title,
  //   description: video.snippet.description,
  //   publishedAt: video.snippet.publishedAt,
  //   thumb: video.snippet.thumbnails.default,
  //   url: video.resourceId.videoId 
  // }))

  return videos;
}


  
  // https://content-youtube.googleapis.com/youtube/v3/playlistItems?playlistId=UUSfwM5u0Kce6Cce8_S72olg&maxResults=50&part=snippet&key=AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM
