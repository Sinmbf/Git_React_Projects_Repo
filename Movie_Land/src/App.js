import { useEffect, useState } from "react";
import "./styles.css";
import MovieCard from "./MovieCard.jsx";
import searchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com?apikey=45ba8dc";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch movies
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Superman");
  }, []);
  return (
    <div className="container">
      <div className="text-center text-warning my-5">
        <h1>Movie Land</h1>
      </div>
      {/* Row 1 */}
      <div className="row justify-content-center">
        <div className="col-md-6 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search your favorite movies"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <img
            src={searchIcon}
            onClick={() => {
              searchMovies(searchTerm);
            }}
            className="search-icon"
            alt="Search Icon"
          />
        </div>
        {/* Row 2 */}
        {movies?.length > 0 ? (
          <div className="row justify-content-center my-5">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
        ) : (
          <div className="alert alert-danger mt-4" role="alert">
            <strong>No movies available!</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
