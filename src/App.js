import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './style.css';

const App = () => (
  <BrowserRouter>
    <div className="navi">
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/friends'>Friends</Link></li>
      </ul>

      <hr />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/friends' component={Friends} />
    </div>
  </BrowserRouter>
)

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>このサンプルは、以下のページを真似して作られています。</p>
    <ul>
    <li><a href="https://qiita.com/m4iyama/items/b4ca1773580317e7112e" target="_blank">react-router@v4を使ってみよう：シンプルなtutorial</a></li>
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
    <p>飼いたい猫に投票するページです。</p>
  </div>
)

class Friends extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleVote = this.handleVote.bind(this)
  }

  componentWillMount() {
    FRIENDS.forEach(friend => {
      this.setState({
        ...this.state,
        [friend.id]: 0
      })
    })
  }

  handleVote(id) {
    this.setState({
      [id]: this.state[id] + 1
    })
  }

  render() {
    return (
      <div>
        <h2>Friends</h2>
        <Route exact path='/friends' render={props => <FriendList handleVote={this.handleVote} />} />
        <Route path='/friends/:id' render={props => <Friend match={props.match} votes={this.state} />} />
      </div>
    )
  }
}
const FriendList = props => (
  <div className='FriendList'>
    {FRIENDS.map(friend => (
      <li key={friend.id}>
      <h3>{friend.nameJa}</h3>
        <Link to={`/friends/${friend.id}`}>詳細(得票数)</Link>
        <img src={friend.imgUrl}  width="300px" height="300px" alt="ねこ"/>
        <div onClick={() => props.handleVote(friend.id)}>投票する！</div>
      </li>
    ))}
  </div>
)

const Friend = props => {
  const { id } = props.match.params
  const friend = friendById(id)
  const vote = props.votes[id]

  if (typeof friend === 'undefined')  {
    return (
      <div>
        <p>Friends with id '{id}' does not exist.</p>
      </div>
    )
  }

  const containerStyle = { border: '1px gray solid', display: 'block', padding: 10,width: '600px',margin: '0 auto'}
  const contentsStyle = { margin: '0 auto'}
  const barStyle = { width: calWidth(vote),height: '1em'}
  function calWidth(vote){
    if (vote == 0){
      const wth='2px';
     return wth;
    }
    else{
     const wth = (vote*2)+'em';
     return wth;
}};

  return (
    <div>
      <div style={containerStyle}>
        <p style={contentsStyle}>{friend.family}</p>
       <p><img src={`../${friend.imgUrl}`}  width="300px" height="300px" alt="ねこ"/></p>
        <h1 style={contentsStyle}>{friend.nameJa}</h1>
        <p style={contentsStyle}>{friend.nameEn}</p>
        <div className="voteBar" style={barStyle} width={calWidth(vote)}></div>
        <p className="gokei">合計得票数: <span>{vote} 票</span></p>
      </div>
    </div>
  )
}

const FRIENDS = [
  {
    id: 'taro',
    nameJa: 'たろう',
    nameEn: 'Tarou',
    family: 'Tabby',
    imgUrl: 'images/taro.png',
    sex: 'male'
  },
  {
    id: 'hanako',
    nameJa: 'はなこ',
    nameEn: 'Hanako',
    family: 'Calico',
    imgUrl: 'images/hanako.png',
    sex: 'female'
  },
  {
    id: 'monsieur',
    nameJa: 'ムッシュー',
    nameEn: 'monsieur',
    family: 'Longhair',
    imgUrl: 'images/monsieur.png',
    sex: 'male'
  }
]

const friendById = id => FRIENDS.find(friend => friend.id === id)

export default App