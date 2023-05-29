import { useEffect, useState } from 'react'
import './App.css'
import BlogCard from './BlogCard'

function App() {

  let [cardsArray,setCardsArray] = useState()

  useEffect(()=>{
    fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(post => setCardsArray(post.posts));
  }, [])

  return (
    <>
      <BlogCard cardsArray={cardsArray}></BlogCard>
    </>
  )
}

export default App
