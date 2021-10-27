// import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import SpotifyPlayer from 'react-spotify-player'
import './index.css'

const Playlist = props => {
  const size = {
    width: '600',
    height: '600',
  }
  const view = 'list'
  const theme = 'black' // or 'white'
  const {list} = props

  const {id, songName, Image, audio} = list
  return (
    <Popup
      modal
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

export default Playlist
/* const ReactPopUp = () => (
  <div className="popup-container">
    <Popup
      trigger={
        <button type="button" className="trigger-button">
          Trigger
        </button>
      }
      position="bottom left"
    >
      <p>React is a popular and widely used programming language</p>
    </Popup>
  </div>
)
export default ReactPopUp */
