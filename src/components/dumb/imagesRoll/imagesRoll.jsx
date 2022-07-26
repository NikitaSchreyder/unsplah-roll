import InfiniteScroll from 'react-infinite-scroller';

import ImagePreview from '../imagePreview/imagePreview';

import './imagesRoll.css'

function ImagesRoll({imagesData, loadImages}) {
  const images = imagesData.slice(0, imagesData.length).map(item => <ImagePreview key={item.id + Math.random()} image={item}/>)
  return (
    <section className="images-roll">
      <InfiniteScroll 
        dataLength={images.length}
        loadMore={loadImages}
        hasMore={true}
        className="images-roll__content"
      >
        {
          images
        }
      </InfiniteScroll>
    </section>
  )
}

export default ImagesRoll;