import './searchbar.scss';

function SearchBar() {

  return (
    <form action="">
      <input type="search" required />
      <i className="fa fa-search"></i>
      <a id="clear-btn" >Clear</a>
    </form>
  )
}

export default SearchBar
