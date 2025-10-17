import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agree: false,
  })

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

    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('.form-group, .submit-btn')

      gsap.fromTo(formElements, {
        opacity: 0,
        y: 40,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // フォーム送信のアニメーション
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    })
  }

  return (
    <section ref={sectionRef} id="contact" className="contact">
      <div className="contact-content">
        <h2 ref={titleRef} className="section-title">CONTACT</h2>

        <p className="contact-description">
          撮影のご相談、ご依頼はこちらからお問い合わせください。<br />
          確認の上、ご返信いたします。
        </p>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              お名前/ Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              メールアドレス / Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              お問い合わせ内容 / Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder=""
            />
          </div>

          <div className="privacy-policy">
            <a href="#" className="privacy-link">
              プライバシーポリシーはこちらからご覧ください
            </a>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">プライバシーポリシーに同意する</span>
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={!formData.agree}>
            送信する
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
