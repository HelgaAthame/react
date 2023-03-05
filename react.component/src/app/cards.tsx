export type CardT = {
  name: string
  price: number
  category: string
  author: string
  genre: string
  year: number
  likes: number
  picture: string
}

const cards: CardT[] = [
  {
    name: 'The Angel of the West Window',
    price: 1000,
    category: 'supernatural fiction',
    author: 'Gustav Meyrink',
    genre: 'novel',
    year: 1927,
    likes: 3,
    picture: 'https://m.media-amazon.com/images/I/51ZVRx4DPEL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    name: 'The Modern JavaScript Tutorial',
    price: 59,
    category: 'computer literature',
    author: 'Ilya Kantor',
    genre: 'tutorial',
    year: 2007,
    likes: 2,
    picture: 'https://i.livelib.ru/workpic/1001593289/200/a57d/Ilya_Kantor__Sovremennyj_uchebnik_JavaScript.jpg'
  },
  {
    name: 'The Castle',
    price: 1200,
    category: 'allegorical novels',
    author: 'Franz Kafka',
    genre: 'novel',
    year: 1926,
    likes: 3,
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Franz_Kafka_Das_Schloss.jpg/220px-Franz_Kafka_Das_Schloss.jpg'
  },
  /*{
    name: 'The Angel of the West Window',
    price: 1000,
    category: 'supernatural fiction',
    author: 'Gustav Meyrink',
    genre: 'novel',
    year: 1927,
    likes: 3,
    picture: 'https://m.media-amazon.com/images/I/51ZVRx4DPEL._AC_UF1000,1000_QL80_.jpg'
  },
  */
]

export default cards
