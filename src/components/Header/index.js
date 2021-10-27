import {
  BsHeadphones,
  BsSearch,
  BsFillHeartFill,
  BsFillPlayCircleFill,
} from 'react-icons/bs'
import {RiBarChartHorizontalLine} from 'react-icons/ri'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="profile-container">
      <img
        src="https://res.cloudinary.com/dydlvwdqp/image/upload/v1635264118/Screenshot_2055_hh1vkj.png"
        alt="profile"
        className="profile-pic"
      />
      <p className="name">Bob Smith</p>
    </div>
    <ul className="header-names">
      <li className="head-list">
        <BsHeadphones className="icon" />
        <p className="name">Discover</p>
      </li>
      <li className="head-list">
        <BsSearch className="icon" />
        <p className="name">Search</p>
      </li>
      <li className="head-list">
        <BsFillHeartFill className="icon" />
        <p className="name">Favourites</p>
      </li>
      <li className="head-list">
        <BsFillPlayCircleFill className="icon" />
        <p className="name">Playlists</p>
      </li>
      <li className="head-list">
        <RiBarChartHorizontalLine className="icon" />
        <p className="name">Charts</p>
      </li>
    </ul>
  </nav>
)
export default Header
