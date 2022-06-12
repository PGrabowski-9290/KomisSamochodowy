import { useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

const ImageSlider = (images) => {
  const [imagesArr,setImagesArr] = useState(images.images)
  const [current,setCurrent] = useState(0)
  
  const handleControlBack = () => {
    if(current>0)
      setCurrent(current - 1)
  }

  const handleControlForward = () => {
    console.log(current)
    if((imagesArr.length - 1) > current)
      setCurrent( current + 1)
  }

  return (
    <div className='slider'>
      <div className='slider-control left'>
        <button className='btn btn-control' onClick={handleControlBack}><BiLeftArrow/></button>
      </div>
      <div className='slider-control right'> 
        <button className='btn btn-control' onClick={handleControlForward}><BiRightArrow/></button>
      </div>
      <div className='image'>
        <img src={imagesArr[current].path} alt='zdjecie podgladowe'/>
      </div>
    </div>
  )
}

export default ImageSlider