import { Link } from "react-router-dom";
import './imagePreview.css'

function ImagePreview({image}) {
    const {id, urls, user, likes, promoted_at} = image;
    const publicDateString = new Date(promoted_at).toLocaleDateString()
    const openImagePage = () => window.location.href = `/${id}`;
    const backgroundStyles = {backgroundImage: `url(${urls.small})`}
    return(
      <div className="image-preview" style={backgroundStyles}>
        <Link to={`/${id}`} onClick={openImagePage} className="image-preview__details">
          <p className="image-preview__details--author" href={user.links.html}>{user.username}</p>
          <time className="image-preview__details--date" dateTime={publicDateString}>{publicDateString}</time>
          <p className="image-preview__details--likes">{likes}</p>
        </Link>
      </div>
    )
}

export default ImagePreview;