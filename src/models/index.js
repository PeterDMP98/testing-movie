/*PIVOTE */

const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

/*Movies N-N Genres*/

Movie.belongsToMany(Genre, {through: 'MoviesGenres'})
Genre.belongsToMany(Movie, {through: 'MoviesGenres'})

/*Movies N-N Actores*/

Movie.belongsToMany(Actor, {through: 'MoviesActors'})
Actor.belongsToMany(Movie, {through: 'MoviesActors'})

/*Movies N-N Directors*/

Movie.belongsToMany(Director, {through: 'MoviesDirectors'})
Director.belongsToMany(Movie, {through: 'MoviesDirectors'})