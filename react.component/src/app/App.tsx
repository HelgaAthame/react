import './App.scss'
import Header from './Header.js'
import Main from './Main.js'

export default function App() {
  //const [count, setCount] = useState(0)

  history.replaceState(null, '', "main")
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  )
}
