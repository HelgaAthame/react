export type CardT = {
  name: string
  price: number
  country: string
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
    country: 'Austria',
    author: 'Gustav Meyrink',
    genre: 'novel',
    year: 1927,
    likes: 3,
    picture: 'https://m.media-amazon.com/images/I/51ZVRx4DPEL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    name: 'The Modern JavaScript Tutorial',
    price: 59,
    country: 'Russia',
    author: 'Ilya Kantor',
    genre: 'tutorial',
    year: 2007,
    likes: 2,
    picture: 'https://i.livelib.ru/workpic/1001593289/200/a57d/Ilya_Kantor__Sovremennyj_uchebnik_JavaScript.jpg'
  },
  {
    name: 'The Castle',
    price: 1200,
    country: 'Czech',
    author: 'Franz Kafka',
    genre: 'novel',
    year: 1926,
    likes: 3,
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Franz_Kafka_Das_Schloss.jpg/220px-Franz_Kafka_Das_Schloss.jpg'
  },
  {
    name: 'The Reader',
    price: 1300,
    country: 'Germany',
    author: 'Bernhard Schlink',
    genre: 'novel',
    year: 1995,
    likes: 4,
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/The_Reader_cover.jpg/220px-The_Reader_cover.jpg'
  },
  {
    name: 'King Stakh\'s Wild Hunt',
    price: 1400,
    country: 'Belarus',
    author: 'Uladzimir Karatkievich',
    genre: 'novel',
    year: 1964,
    likes: 5,
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/King_Stakh%27s_Wild_Hunt_modern_cover.jpg/220px-King_Stakh%27s_Wild_Hunt_modern_cover.jpg'
  },
  {
    name: 'Nineteen Eighty-Four',
    price: 1500,
    country: 'United Kingdom',
    author: 'George Orwell',
    genre: 'novel',
    year: 1949,
    likes: 6,
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/1984first.jpg/220px-1984first.jpg'
  },
  {
    name: 'The Great Gatsby',
    price: 1510,
    country: 'United States',
    author: 'Francis Cugat',
    genre: 'novel',
    year: 1925,
    likes: 7,
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/220px-The_Great_Gatsby_Cover_1925_Retouched.jpg'
  },
  {
    name: 'Text',
    price: 850,
    country: 'Russia',
    author: 'Dmitry Glukhovsky',
    genre: 'novel',
    year: 2017,
    likes: 2,
    picture: 'https://upload.wikimedia.org/wikipedia/ru/thumb/6/6b/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D1%80%D0%BE%D0%BC%D0%B0%D0%BD%D0%B0_%C2%AB%D0%A2%D0%B5%D0%BA%D1%81%D1%82%C2%BB_-_1_%D0%B8%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5.jpg/274px-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D1%80%D0%BE%D0%BC%D0%B0%D0%BD%D0%B0_%C2%AB%D0%A2%D0%B5%D0%BA%D1%81%D1%82%C2%BB_-_1_%D0%B8%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5.jpg'
  },
  {
    name: 'Collection of tasks in mathematics for applicants to universities',
    price: 550,
    country: 'Russia',
    author: 'Mark Scanavi',
    genre: 'textbook',
    year: 1977,
    likes: 3,
    picture: 'https://img4.labirint.ru/rc/4d816d765d176325879c19e986faa195/363x561q80/books4/32370/cover.jpg?1280394613'
  },
  {
    name: 'The Knights of the Cross',
    price: 1320,
    country: 'Poland',
    author: 'Henryk Sienkiewicz',
    genre: 'novel',
    year: 1900,
    likes: 4,
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/PL_Henryk_Sienkiewicz-Krzy%C5%BCacy_0005.jpeg/220px-PL_Henryk_Sienkiewicz-Krzy%C5%BCacy_0005.jpeg'
  },
  {
    name: 'The Lord of the Rings',
    price: 1620,
    country: 'United Kingdom',
    author: 'J. R. R. Tolkien',
    genre: 'novel',
    year: 1968,
    likes: 5,
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif/220px-First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif'
  },
  {
    name: 'Harry Potter',
    price: 1240,
    country: 'United Kingdom',
    author: '	J. K. Rowling',
    genre: 'series of novels',
    year: 1997-2007,
    likes: 6,
    picture: 'https://s2-goods.ozstatic.by/2000/373/71/101/101071373_0.jpg'
  },
  {
    name: 'Belarusian folk costume',
    price: 1680,
    country: 'Belarus',
    author: 'Lobachevskaya, Zimina',
    genre: 'monograph',
    year: 2022,
    likes: 6,
    picture: 'https://belkniga.by/upload/resize_cache/iblock/bc1/350_350_17626458c13eabe00cfe36870533c95c9/belorusskiy-narodnyy-kostyum-kroy-vyshivka-i-dekorativnye-shvy-4-e-izdanie.jpg'
  },
  {
    name: 'Belarusian bagpipe in the context of Eastern European tradition',
    price: 1240,
    country: 'Belarus',
    author: 'Alexander Surba',
    genre: 'monograph',
    year: 2019,
    likes: 2,
    picture: 'https://kniganosha.by/public/images/books/mDnOVBb9NMgKZpwJfFS5.jpg'
  },{
    name: 'The Gold-Bug',
    price: 590,
    country: 'United States',
    author: 'Edgar Allan Poe',
    genre: 'story',
    year: 1843,
    likes: 4,
    picture: 'https://kbimages1-a.akamaihd.net/75fe89c4-ef63-4f1e-abc4-f12ef46029ee/1200/1200/False/the-gold-bug-12.jpg'
  },
  {
    name: 'The Whisperer in Darkness',
    price: 1830,
    country: 'United States',
    author: 'H. P. Lovecraft',
    genre: 'novel',
    year: 1931,
    likes: 7,
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/The_Whisperer_in_Darkness_by_Alexander_Moore.jpg/150px-The_Whisperer_in_Darkness_by_Alexander_Moore.jpg'
  },
  /*{
    name: '',
    price: 0,
    country: '',
    author: '',
    genre: '',
    year: 0,
    likes: 0,
    picture: ''
  },*/
]

export default cards
