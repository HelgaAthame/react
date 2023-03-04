import './App.scss'
import SearchBar from './SearchBar.js'

function App() {
  //const [count, setCount] = useState(0)

  history.replaceState(null, '', "main")
  return (
    <div className="App">
      <SearchBar />
    </div>
  )
}

export default App
