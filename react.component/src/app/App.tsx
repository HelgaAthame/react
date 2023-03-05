import cards from './cards.js'
import './App.scss'
import SearchBar from './SearchBar.js'

function App() {
  //const [count, setCount] = useState(0)

  history.replaceState(null, '', "main")
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <SearchBar />
    </header>
  )
}

function Main() {
  return (
    <div className="main">
      {cards.map( (card, i) =>
        <section className='card' key={i}>
          <div className='image'><img src={card.picture} /></div>
          <div className='name'>{card.name}</div>
          <div className='author'>{card.author}</div>
          <div className='genre'>Genre: {card.genre}</div>
          <div className='category'>Category: {card.category}</div>
          <div className='likes'>🤍 {card.likes}</div>
        </section>
      )}
    </div>
  )
}

export default App
