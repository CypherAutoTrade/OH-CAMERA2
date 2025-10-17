import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './News.css'

gsap.registerPlugin(ScrollTrigger)

const newsItems = [
  {
    date: '2023/3/17',
    title: '「natural」 2023 Summer Look Book',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
  },
  {
    date: '2023/3/17',
    title: 'ファッションブランドSTのカタログ',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
  },
  {
    date: '2023/3/17',
    title: '「fashion」6月号雨の日特集',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop',
  },
  {
    date: '2023/3/17',
    title: '「interior」の「話題のクリエイターの部屋特集」に自身の部屋が掲載されました',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
  },
]

const News = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })

    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.news-item')

      gsap.fromTo(items, {
        opacity: 0,
        x: -50,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="news" className="news">
      <div className="section-header">
        <h2 ref={titleRef} className="section-title">NEWS</h2>
        <button className="view-all-btn">
          View all
          <span className="arrow">→</span>
        </button>
      </div>

      <div ref={listRef} className="news-list">
        {newsItems.map((item, index) => (
          <div key={index} className="news-item">
            <div className="news-image-wrapper">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="news-image-overlay"></div>
            </div>
            <div className="news-content">
              <span className="news-date">{item.date}</span>
              <h3 className="news-title">{item.title}</h3>
            </div>
            <div className="news-arrow">
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default News
