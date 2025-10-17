import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Gallery.css'

gsap.registerPlugin(ScrollTrigger)

const allGalleryImages = [
  // Page 1
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?w=600&h=600&fit=crop',
  // Page 2
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=600&h=600&fit=crop',
  // Page 3
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=600&h=600&fit=crop',
]

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const imagesPerPage = 9

  const currentImages = allGalleryImages.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  )

  const totalPages = Math.ceil(allGalleryImages.length / imagesPerPage)

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handleBack = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal()
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  useEffect(() => {
    // タイトルのスクロールアニメーション
    gsap.fromTo(titleRef.current, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    })

    // グリッドアイテムのアニメーション
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item')

      gsap.fromTo(items, {
        opacity: 0,
        y: 60,
        scale: 0.9,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: {
          amount: 0.6,
          from: 'start',
          grid: 'auto',
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          end: 'top 40%',
        },
      })
    }
  }, [])

  // ページ変更時のアニメーション
  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item')

      gsap.fromTo(items, {
        opacity: 0,
        y: 30,
        scale: 0.95,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: {
          amount: 0.3,
          from: 'start',
        },
        ease: 'power2.out',
      })
    }
  }, [currentPage])

  return (
    <section ref={sectionRef} id="gallery" className="gallery">
      <div className="section-header">
        <h2 ref={titleRef} className="section-title">GALLERY</h2>
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

      <div ref={gridRef} className="gallery-grid">
        {currentImages.map((image, index) => (
          <div key={`${currentPage}-${index}`} className="gallery-item" onClick={() => handleImageClick(image)}>
            <div className="gallery-item-inner">
              <img src={image} alt={`Gallery ${currentPage * imagesPerPage + index + 1}`} loading="lazy" />
              <div className="gallery-overlay">
                <span className="view-icon">+</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={handleCloseModal}>
          <button className="modal-close" onClick={handleCloseModal}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.replace('w=600&h=600', 'w=1200&h=1200')} alt="Enlarged view" />
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
