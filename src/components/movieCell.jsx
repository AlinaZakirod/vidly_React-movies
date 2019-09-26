import React, { Component } from "react";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }];
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log(genre);
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <p> Showing {count} movies in the database. </p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>

                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

// import React, { Component } from "react";
// import { getMovies } from "../services/fakeMovieService";
// import { getGenres } from "../services/fakeGenreService";
// import { paginate } from "../utils/paginate";
// import _ from "lodash";
// import Pagination from "./common/pagination";
// import ListGroup from "./common/listGroup";
// // import MoviesTabe from "./moviesTable";

// class Movies extends Component {
//   state = {
//     movies: [],
//     genres: [],
//     pageSize: 4,
//     currentPage: 1,
//     selectedGenre: "",
//     sortColumn: { path: "title", order: "asc" }
//   };

//   componentDidMount() {
//     const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
//     this.setState({
//       movies: getMovies(),
//       genres
//     });
//   }

//   handleDelete = movie => {
//     const movies = this.state.movies.filter(m => m._id !== movie._id);
//     this.setState({ movies });
//   };

//   handleLike = movie => {
//     const movies = [...this.state.movies];
//     const index = movies.indexOf(movie);
//     movies[index] = { ...movies[index] };
//     movies[index].liked = !movies[index].liked;
//     this.setState({
//       movies
//     });
//   };

//   handlePageChange = page => {
//     this.setState({
//       currentPage: page
//     });
//   };

//   handleItemSelect = genre => {
//     this.setState({
//       selectedGenre: genre,
//       currentPage: 1
//     });
//   };

//   handleSort = sortColumn => {
//     this.setState({
//       sortColumn
//     });
//   };

//   getPagedData = () => {
//     const {
//       pageSize,
//       currentPage,
//       movies: allMovies,
//       selectedGenre,
//       sortColumn
//     } = this.state;

//     const filtered =
//       selectedGenre && selectedGenre._id
//         ? allMovies.filter(m => m.genre._id === selectedGenre._id)
//         : allMovies;
//     const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

//     const movies = paginate(sorted, currentPage, pageSize);
//     return { totalCount: filtered.length, data: movies };
//   };
//   render() {
//     const { length: count } = this.state.movies;
//     const { pageSize, currentPage, sortColumn } = this.state;

//     if (count === 0) return <p>There are no movies in the database.</p>;
//     const { totalCount, data: movies } = this.getPagedData();

//     return (
//       <div>
//         <p>Showing {totalCount} movies in the database.</p>

//         <div className="row">
//           <div className="col-3">
//             <ListGroup
//               items={this.state.genres}
//               onItemSelect={this.handleItemSelect}
//               textProperty="name"
//               valueProperty="_id"
//               selectedItem={this.state.selectedGenre}
//             />
//           </div>

//           <div className="col">
//             {/* <MoviesTabe
//               onSort={this.handleSort}
//               sortColumn={sortColumn}
//               movies={movies}
//               onLike={this.handleLike}
//               onDelete={this.handleDelete}
//             /> */}

//             <Pagination
//               itemsCount={totalCount}
//               pageSize={pageSize}
//               onPageChange={this.handlePageChange}
//               currentPage={currentPage}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default Movies;
