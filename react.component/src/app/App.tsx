import { Component } from 'react'
import './App.scss'
import Header from './Header.js'
import Main from './Main.js'
import cards, { CardT } from "./cards";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props)
    history.replaceState(null, '', "main")
    this.state = {cards: cards}
  }

  updateData(cards: CardT[]) {
    this.setState({ cards: cards })
  }

  render() {
    return (
      <div className="app">
        <Header updateData={this.updateData.bind(this)}/>
        <Main cards={this.state.cards}/>
      </div>
    )
  }
}

function updateData() {
  throw new Error('Function not implemented.')
}

export default App
