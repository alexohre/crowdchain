'use client'
import React from 'react'
import HeroSection from './components/Hero'
import HowItWorks from './components/HowItWorks'
import FeaturedProjects from './components/FeaturedCampaign'

function Home() {
  return (
    <div>
        <HeroSection/>
        <HowItWorks/>
        <FeaturedProjects/>

    </div>
  )
}

export default Home