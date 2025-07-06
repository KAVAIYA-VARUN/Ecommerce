import React from 'react'
import Hero from '../Components/Hero.jsx'
import LatestCollection from '../Components/LatestCollection.jsx'
import BestSeller from '../Components/BestSeller.jsx'
import OurPolicy from '../Components/OurPolicy.jsx'
import NewsLetter from '../Components/NewsLetter.jsx'

const Home = () => {
  return (
   <>
   <div>
    <Hero />
    <LatestCollection />
    <BestSeller />
    <OurPolicy />
    <NewsLetter />
   </div>
   </>
  )
}

export default Home