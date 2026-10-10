const express = require("express");
const cors = require("cors");
const app = express();
const { initializeDatabase } = require("./db/db.connect.js");
const Movie = require("./models/movie.models.js")

app.use(express.json());

const corsOptions = {
   origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

initializeDatabase();


async function createMovie(newMovie) {
    try {
        const movie = new Movie(newMovie)
        const saveMovie = await movie.save();
        return saveMovie;
    } catch (error) {
        throw error;
        
    }

}

app.post("/movies", async(req, res) => {
    try {

        const savedMovie = await createMovie(req.body);

        res.status(201).json({message: "Movie added successfully.", movie: savedMovie})
        
    } catch (error) {
        res.status(500).json({error: "Failed to add movie"})
    }
});

// find a movie with a particular title
async function readMovieByTitle(movieTitle) {
    try {
        const movie = await Movie.findOne({title: movieTitle});
        return movie;
        
    } catch (error) {
        throw error
        
    }

}

app.get("/movies/:title", async (req, res) => {
    try {

        const movie = await readMovieByTitle(req.params.title);
        if(movie) {
            res.json(movie);
        } else {
            res.status(404).json({error: "Movie not found."});
        }

    } catch (error) {
        res.status(500).json({message: "Failed to fetch movie."})
    }
});

// To get all the movies in the database

async function readAllMovies() {
    try {
        const allMovies = await Movie.find();
        return allMovies;
        
    } catch (error) {
        console.log(error)
    }
}

app.get("/movies", async (req, res) => {
    try {
        const movies = await readAllMovies();    
        if(movies.length != 0) {
            res.json(movies);
        } else {
            res.status(404).json({error: "No movies found."});      

        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch movies."});
    }
});

// Get movie by director name 
async function readMovieByDirector(directorName) {
    try {
        const movieByDirector = await Movie.find({director: directorName});
        return movieByDirector
        
    } catch (error) {
        throw error;
    }
}

app.get("/movies/director/:directorName", async (req, res) => {
    try {
        const movies = await readMovieByDirector(req.params.directorName);
        if(movies.length != 0) {
            res.json(movies);
        } else {
            res.status(404).json({error: "No movies found for the specified director."});

        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch movies."});
    }
});

async function readMovieByGenre(genreName) {
    try {
        const movieByGenre = await Movie.find({genre: genreName});
        return movieByGenre;
    } catch (error) {
        throw error;
    }
}

app.get("/movies/genres/:genreName", async (req, res) => {
        try {
            const movies = await readMovieByGenre(req.params.genreName);    
            if(movies.length != 0) {
                res.json(movies);
            } else {
                res.status(404).json({error: "No movies found for the specified genre."});
            }
        } catch (error) {
            res.status(500).json({message: "Failed to fetch movies."});
        }
    });

async function deleteMovie(movieId) {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        return deletedMovie;
    } catch (error) {
        console.log(error);
    }
}

app.delete("/movies/:movieId", async(req, res) => {
    try {
        const deletedMovie = await deleteMovie(req.params.movieId);
        if(deletedMovie) {

            res.status(200).json({message: "Movie deleted successfully."});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete movie."})
        
    }
});

async function updateMovie(movieId, dataToUpdate) {
    try {

        const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true});
        return updatedMovie;
        
    } catch (error) {
        console.log("Error i updating movie rating", error);
    }
}

app.post("/movies/:movieId", async(req, res) => {
    try {
        const updatedMovie = await updateMovie(req.params.movieId, req.body);

        if(updatedMovie) {
            res.status(200).json({ message: "Movie updated successfully.", updatedMovie: updatedMovie});
        } else {
            res.status(404).json({ error: "Movie not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update movie."})
    }
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});