import { useState, useEffect } from 'react';
import CustomSlider from '../CustomSlider';
import MovieDetails from '../MovieDetails';
import tmdb from './../../services/tmdb';
import './index.scss';

export default function MoviesContainer(props) {
    let api = tmdb('2f7ae9a74799d3d34722ebd4a473c5da');
    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});

    const handleChange = (e) => {
        (async () => {
            if ((collections[e.index].movies.length - e.next) < 10) {
                //fetch second page and update collections
                let movies = await api.discoverMovies({
                    language: 'en-US',
                    sort_by: 'popularity.desc',
                    include_adult: false,
                    include_video: false,
                    with_genres: e.genre.id,
                    page: page[e.genre.name] + 1,
                }).then(movies => movies.results);

                setPage(page => ({ ...page, [e.genre.name]: page[e.genre.name] + 1 }));
                collections[e.index].movies = collections[e.index].movies.concat(movies);
                setCollections([...collections]);
            }
        })();
    };
    const handleClick = async (movie) => {
        try {
            let results = await Promise.allSettled([
                api.getCredits(movie.id),
                api.getMovieDetails(movie.id)
            ]);

            let credits = results[0].value;
            let movieDetails = results[1].value;

            setSelectedMovie({ ...movie, ...movieDetails, credits });
            window.history.pushState(null, '', `?movieId=${movie.id}`);
            setShowModal(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                let genres = (await api.getGenres()).genres;
                let promises = genres.map(genre => {
                    setPage(page => ({ ...page, [genre.name]: 1 }));

                    return api.discoverMovies({
                        language: 'en-US',
                        sort_by: 'popularity.desc',
                        include_adult: false,
                        include_video: false,
                        with_genres: genre.id,
                        page: 1
                    }).then(movies => ({ genre: genre, movies: movies.results }));
                });

                let results = await Promise.allSettled(promises);

                setCollections(results.map((result) => result.value));

                const urlParams = new URLSearchParams(window.location.search);
                const movieId = urlParams.get('movieId');
                if (movieId) {
                    handleClick({ id: movieId });
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <>
            {
                collections.map((data, index) => (
                    <div className="container my-12 mx-auto px-4 md:px-12" key={index}>
                        <p className="font-bold text-lg">{data.genre.name}</p>
                        <div className="-mx-1 lg:-mx-4">
                            <CustomSlider
                                key={index}
                                movies={data.movies}
                                onClick={handleClick}
                                onChange={(res) => handleChange({ ...res, genre: data.genre, index })}
                            />
                        </div>
                    </div>
                ))
            }
            <MovieDetails showModal={showModal} details={selectedMovie} setShowModal={setShowModal}></MovieDetails>
        </>
    );
}