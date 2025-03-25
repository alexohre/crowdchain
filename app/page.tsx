'use client'
import React from 'react'
import HeroSection from './components/Hero'
import HowItWorks from './components/HowItWorks'
import FeaturedProjects from './components/FeaturedCampaign'
import ExploreCategories from './components/ExploreCatergories'

function Home() {
  return (
    <div>
        <HeroSection/>
        <HowItWorks/>
        <FeaturedProjects/>
        <ExploreCategories/>

    </div>
  )
}

export default Home