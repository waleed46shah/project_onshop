import React from 'react'
import FlashDeals from '../../components/HeroSection/FlashDeals/FlashDeals'
import HeroSection from '../../components/HeroSection/HeroSection'
import NewCollections from '../../components/HeroSection/NewCollections/NewCollections'


const Home = () => {
  return (
    <div className='app__home app__section'>        
        <HeroSection/>
        <NewCollections/>
        <FlashDeals/>
    </div>
  )
}

export default Home