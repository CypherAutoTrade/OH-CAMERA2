import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Works from './components/Works'
import News from './components/News'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <News />
        <Gallery />
        <Works />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
