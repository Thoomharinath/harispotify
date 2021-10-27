// import {Link} from 'react-router-dom'

import './index.css'

const Category = props => {
  const {list} = props

  const {id, songName, Image} = list
  return (
    <li key={id} className="album-list">
      <img src={Image} alt={songName} className="album-image-category" />
      <p>{songName}</p>
    </li>
  )
}

export default Category
