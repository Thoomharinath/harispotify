/* eslint-disable react/jsx-props-no-spreading */

import Popup from 'reactjs-popup'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import SpotifyPlayer from 'react-spotify-player'

import {BsCircleFill, BsMoonFill} from 'react-icons/bs'
import {IoFlower} from 'react-icons/io5'

import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import Playlist from '../Playlist'
import Category from '../Category'

import './index.css'

const activeStatus = {
  Initial: 'Initial',
  progress: 'progress',
  success: 'success',
}

const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
}

class Discover extends Component {
  state = {
    status: activeStatus.Initial,
    audioList: [],
    playList: [],
    categoryList: [],
  }

  componentDidMount() {
    this.getList()
  }

  updateList = (albums, Playlists, category) => {
    // console.log(albums.items)
    const data1 = albums.items.map(each => ({
      songName: each.name,
      audio: each.uri,
      id: each.id,
      Image: each.images[1].url,
    }))
    // console.log(data1)

    const data2 = Playlists.items.map(each => ({
      songName: each.name,
      audio: each.uri,
      id: each.id,
      Image: each.images[0].url,
    }))

    const data3 = category.items.map(each => ({
      songName: each.name,
      id: each.id,
      Image: each.icons[0].url,
    }))
    // console.log(data2)
    this.setState({
      audioList: data1,
      playList: data2,
      categoryList: data3,
      status: activeStatus.success,
    })
  }

  getEmpty = () => {
    const {history} = this.props
    history.replace('/')
  }

  getList = async () => {
    this.setState({status: activeStatus.progress})

    // const token = Cookies.get('jwt_token')
    const url1 = 'https://api.spotify.com/v1/browse/new-releases'
    const url2 = 'https://api.spotify.com/v1/browse/featured-playlists'
    const url3 = 'https://api.spotify.com/v1/browse/categories'

    const Path = this.props
    //  console.log(Path)
    const {history} = Path
    const {location} = history
    const {hash} = location
    //  console.log(location)
    let JwtToken = ''
    if (hash === '') {
      JwtToken = Cookies.get('jwt_token')
      JwtToken = JwtToken.split(',')
    } else {
      const token = hash.split('=')
      // console.log(token[1])
      JwtToken = token[1].split('&')
      // console.log(JwtToken)

      Cookies.set('jwt_token', JwtToken, {
        expires: 30,
      })
    }

    //  console.log(JwtToken[0])

    const options = {
      headers: {
        Authorization: `Bearer ${JwtToken[0]}`,
      },
      method: 'GET',
    }

    const response = await fetch(url1, options)
    const responsePlaylist = await fetch(url2, options)
    const dataPlaylist = await responsePlaylist.json()
    const responseCategory = await fetch(url3, options)
    const dataCategory = await responseCategory.json()
    // console.log(dataPlaylist)
    console.log(dataCategory)
    const data = await response.json()
    // console.log(data, 'okkk')
    if (response.ok === true) {
      this.updateList(
        data.albums,
        dataPlaylist.playlists,
        dataCategory.categories,
      )
    } else {
      this.getEmpty()
    }
  }

  onProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  onSuccess = () => {
    const {audioList, playList, categoryList} = this.state
    return (
      <div className="play-songs">
        <div>
          <p>RELEASED THIS WEEK</p>
          <ul className="album-fulllist">
            <Slider {...settings} className="carousel-container">
              {audioList.map(each => this.getWeekly(each))}
            </Slider>
            <Slider className="medium-device-container">
              {audioList.map(each => this.getWeekly(each))}
            </Slider>
          </ul>
        </div>
        <div>
          <p>FEATURED PLAYLISTS</p>
          <ul className="album-fulllist">
            <Slider {...settings} className="carousel-container">
              {playList.map(each => (
                <Playlist key={each.id} list={each} />
              ))}
            </Slider>
            <Slider className="medium-device-container">
              {playList.map(each => (
                <Playlist key={each.id} list={each} />
              ))}
            </Slider>
          </ul>
        </div>
        <div>
          <p>BROWSE</p>
          <ul className="album-fulllist">
            <Slider {...settings} className="carousel-container">
              {categoryList.map(each => (
                <Category key={each.id} list={each} />
              ))}
            </Slider>
            <Slider className="medium-device-container">
              {categoryList.map(each => (
                <Category key={each.id} list={each} />
              ))}
            </Slider>
          </ul>
        </div>
      </div>
    )
  }

  loadingStatus = () => {
    const {status} = this.state

    switch (status) {
      case 'success':
        return this.onSuccess()
      case 'progress':
        return this.onProgress()
      default:
        return null
    }
  }

  getWeekly = audioList => {
    const {audio, songName, Image, id} = audioList
    // const {JwtToken} = this.state
    // console.log(audio)
    const size = {
      width: '600',
      height: '600',
    }
    const view = 'list'
    const theme = 'black' // or 'white'

    return (
      <Popup
        modal
        // overlayStyle={overlayStyles}
        trigger={
          <button type="button" className="trigger-button">
            <li key={id} className="album-list">
              <img src={Image} alt={songName} className="album-image" />
              <p>{songName}</p>
            </li>
          </button>
        }
      >
        <SpotifyPlayer uri={audio} size={size} view={view} theme={theme} />
      </Popup>
    )
  }

  render() {
    //  const {audioList, playList, categoryList} = this.state

    return (
      <div>
        <div className="page-bar">
          <BsCircleFill className="circle-red" />
          <BsCircleFill className="circle-yellow" />
          <BsCircleFill className="circle-green" />
        </div>
        <div className="music-page">
          <div className="header-music-container">
            <Header />
            <div className="header-right-container">
              <div className="poster">
                <img
                  src="https://res.cloudinary.com/dydlvwdqp/image/upload/v1635268347/Screenshot_2056_d8wjrh.png"
                  alt="poster"
                  className="poster-image"
                />
                <div className="poster-name">
                  <h1>
                    Your favourite tunes
                    <span className="span-name">
                      All <IoFlower className="flower" />
                      and all <BsMoonFill className="moon" />
                    </span>
                  </h1>
                </div>
              </div>
              {this.loadingStatus()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Discover
