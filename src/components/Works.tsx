import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Works.css'

gsap.registerPlugin(ScrollTrigger)

const allBlogs = [
  // Page 1
  {
    title: 'モダンWebデザインのトレンド2024',
    category: 'Design',
    date: '2024.03.15',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop',
  },
  {
    title: 'TypeScriptで始めるフロントエンド開発',
    category: 'Development',
    date: '2024.03.12',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
  },
  {
    title: 'UIデザインの基本原則とベストプラクティス',
    category: 'Design',
    date: '2024.03.10',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop',
  },
  {
    title: 'React 19の新機能を徹底解説',
    category: 'Development',
    date: '2024.03.08',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=800&h=600&fit=crop',
  },
  {
    title: 'アクセシビリティを考慮したデザイン',
    category: 'Design',
    date: '2024.03.05',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
  },
  {
    title: 'パフォーマンス最適化の実践テクニック',
    category: 'Development',
    date: '2024.03.01',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=600&fit=crop',
  },
  // Page 2
  {
    title: 'レスポンシブデザインの最新手法',
    category: 'Design',
    date: '2024.02.28',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=600&fit=crop',
  },
  {
    title: 'Next.js 14で構築するフルスタックアプリ',
    category: 'Development',
    date: '2024.02.25',
    image: 'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=800&h=600&fit=crop',
  },
  {
    title: 'カラーパレットの選び方と活用法',
    category: 'Design',
    date: '2024.02.22',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop',
  },
  {
    title: 'GraphQLとREST APIの比較',
    category: 'Development',
    date: '2024.02.20',
    image: 'https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?w=800&h=600&fit=crop',
  },
  {
    title: 'ミニマリストデザインの魅力',
    category: 'Design',
    date: '2024.02.18',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop',
  },
  {
    title: 'テスト駆動開発(TDD)の実践',
    category: 'Development',
    date: '2024.02.15',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  },
  // Page 3
  {
    title: 'タイポグラフィの基礎知識',
    category: 'Design',
    date: '2024.02.12',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop',
  },
  {
    title: 'DockerとKubernetesの入門',
    category: 'Development',
    date: '2024.02.10',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=600&fit=crop',
  },
  {
    title: 'アニメーションで魅せるWebデザイン',
    category: 'Design',
    date: '2024.02.08',
    image: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=800&h=600&fit=crop',
  },
  {
    title: 'CI/CDパイプラインの構築',
    category: 'Development',
    date: '2024.02.05',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop',
  },
  {
    title: 'デザインシステムの作り方',
    category: 'Design',
    date: '2024.02.01',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop',
  },
  {
    title: 'マイクロフロントエンドアーキテクチャ',
    category: 'Development',
    date: '2024.01.28',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop',
  },
]

const Works = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const blogsPerPage = 6

  const currentBlogs = allBlogs.slice(
    currentPage * blogsPerPage,
    (currentPage + 1) * blogsPerPage
  )

  const totalPages = Math.ceil(allBlogs.length / blogsPerPage)

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handleBack = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

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

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.work-card')

      gsap.fromTo(cards, {
        opacity: 0,
        y: 80,
        scale: 0.95,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      })
    }
  }, [])

  // ページ変更時のアニメーション
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.work-card')

      gsap.fromTo(cards, {
        opacity: 0,
        y: 30,
        scale: 0.95,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }
  }, [currentPage])

  return (
    <section ref={sectionRef} id="works" className="works">
      <div className="section-header">
        <h2 ref={titleRef} className="section-title">BLOG</h2>
        <div className="gallery-nav-buttons">
          <button className="view-all-btn" onClick={handleBack}>
            <span className="arrow">←</span>
            Back
          </button>
          <div className="page-indicators">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-dot ${i === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(i)}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button className="view-all-btn" onClick={handleNext}>
            Next
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <div ref={gridRef} className="blog-grid">
        {currentBlogs.map((blog, index) => (
          <div key={`${currentPage}-${index}`} className="work-card">
            <div className="work-image-wrapper">
              <img src={blog.image} alt={blog.title} loading="lazy" />
              <div className="work-overlay">
                <span className="view-text">READ MORE</span>
              </div>
            </div>
            <div className="work-info">
              <div className="blog-meta">
                <span className="work-category">{blog.category}</span>
                <span className="blog-date">{blog.date}</span>
              </div>
              <h3 className="work-title">{blog.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Works
