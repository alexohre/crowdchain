'use client'
import React from 'react'
import HeroSection from './components/Hero'
import HowItWorks from './components/HowItWorks'
import FeaturedProjects from './components/FeaturedCampaign'
import ExploreCategories from './components/ExploreCatergories'
import CampaignDetails from './campaign-details/page'

function Home() {
  return (
    <div>
        <HeroSection/>
        <HowItWorks/>
        <FeaturedProjects/>
        <ExploreCategories/>
        <CampaignDetails/>

    </div>
  )
}

export default Home