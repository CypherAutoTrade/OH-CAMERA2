import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // タイトルとサブタイトルのアニメーション
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(titleRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
    })
    .fromTo(subtitleRef.current, {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.6')

    // スクロールインジケーターのアニメーション
    gsap.to('.scroll-indicator', {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery')
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-image-container">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1600&h=900&fit=crop"
          alt="Hero"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">OH-CAMERA</h1>
        <p ref={subtitleRef} className="hero-subtitle">PHOTOGRAPHER</p>
      </div>

      <div className="scroll-indicator" onClick={scrollToGallery}>
        <div className="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>
  )
}

export default Hero
