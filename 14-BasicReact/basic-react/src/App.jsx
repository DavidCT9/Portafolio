import React, { useState } from 'react';
import './App.css';
import sw from "./data/data";

function App() {
  let allMovies = {};
  sw.forEach(movie => {
    let episode = movie.episode;
    let title = movie.title;
    let year = movie.year;
    let poster = movie.poster;
    let best_character = movie.best_character
    allMovies[episode] = { episode, title, year, poster, best_character, likes: 0, dislikes: 0, comments: [] };

  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [movies, setMovies] = useState(allMovies)
  const [commentFormData, setcommentFormData] = useState({ name: "", comment: "" });

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleLike = (movie) => {
    const updatedMovies = { ...movies };
    updatedMovies[movie.episode].likes = updatedMovies[movie.episode].likes + 1;
    setMovies(updatedMovies);
  };
  const handleDislike = (movie) => {
    const updatedMovies = { ...movies };
    updatedMovies[movie.episode].dislikes = updatedMovies[movie.episode].dislikes + 1;
    setMovies(updatedMovies);
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setcommentFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (selectedMovie) {
      const updatedMovies = { ...movies };
      const updatedComments = [...updatedMovies[selectedMovie.episode].comments, commentFormData];
      updatedMovies[selectedMovie.episode].comments = updatedComments;
      setMovies(updatedMovies);
      setcommentFormData({ name: "", comment: "" });
    }
  }

  return (
    <div>

      <div className="row">

        {Object.values(movies).map((movie, index) => (
          <div className="col-6 col-md-4" key={index}>
            <div className="card"
              style={{ margin: "1dvw", backgroundColor: hoveredIndex === index ? (movie.best_character.affiliation == "Jedi" || movie.best_character.affiliation == "Rebellion" ? "lightblue" : "red") : "white" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)} >

              <img src={hoveredIndex === index ? (movie.best_character.affiliation == "Jedi" ? "/images/jedi.png" : (movie.best_character.affiliation == "Rebellion" ? "/images/rebel.png" : (movie.best_character.affiliation == "Empire" ? "/images/empire.png" : (movie.best_character.affiliation == "Rebellion" ? "/images/rebel.png" : "/images/sith.png")))) : ("/images/" + movie.poster)} className="card-img-top" alt="SW movie poster" />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{movie.year}</h6>

                <button type="button" class="btn btn-link" onClick={() => handleClick(movie)}>More... </button><br></br>

                <a href="#" className="card-link" onClick={(e) => { e.preventDefault(); handleLike(movie); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                    <path
                      d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                  </svg>
                  {movie.likes}
                </a>
                <a href="#" className="card-link" onClick={(e) => { e.preventDefault(); handleDislike(movie); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                    <path
                      d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z" />
                  </svg>
                  {movie.dislikes}
                </a>

              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="card mb-3" style={{ maxWidth: "auto" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={"/images/" + selectedMovie.best_character.image} className="img-fluid rounded-start" alt="Character Image" />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Name: {selectedMovie.best_character.name}</h5>
                <p className="card-text"><small className="text-body-secondary"><i>Affiliation: {selectedMovie.best_character.affiliation}</i></small></p>
                <p className="card-text">Bio: {selectedMovie.best_character.bio}</p>

                <form onSubmit={handleCommentSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={commentFormData.name}
                      onChange={handleCommentChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Comment:</label>
                    <textarea
                      className="form-control"
                      id="comment"
                      name="comment"
                      value={commentFormData.comment}
                      onChange={handleCommentChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Add Comment</button>
                </form>

                <hr></hr><br></br>
                <div>
                  <h5 className="card-title">Comments</h5>
                  {selectedMovie.comments.length > 0 ? (
                    <ul>
                      {selectedMovie.comments.map((comment, index) => (
                        <li key={index}>
                          <strong>{comment.name}:</strong> {comment.comment}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}

export default App;
