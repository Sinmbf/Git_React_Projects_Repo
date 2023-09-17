const MovieCard = ({ movie }) => {
  return (
    <div className="col-12 col-md-4 col-lg-3 my-4 gx-4">
      <div className="card text-bg-dark h-100">
        <img
          src={movie.Poster}
          className="card-img-top text-danger movie-img"
          alt="movie-img"
        />
        <div className="card-body">
          <h1 className="text-uppercase fs-4">{movie.Type}</h1>
          <h5 className="card-title fs-4 text-info">{movie.Title}</h5>
        </div>
        <div className="card-footer">
          <small className="text-warning fs-5 ">{movie.Year}</small>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
