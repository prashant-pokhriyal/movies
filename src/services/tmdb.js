export default function TMDB(apikey) {
    const BASE_URL = 'https://api.themoviedb.org/3';
    const _request = (endPoint, qs = {}) => {
        qs.api_key = apikey;
        return fetch(`${BASE_URL}/${endPoint}?${new URLSearchParams(qs)}`).then(res => res.json());
    }
    return {
        discoverMovies: (params) => _request('discover/movie', params),
        getGenres: () => _request('genre/movie/list'),
        getCredits: (id) => _request(`movie/${id}/credits`),
        getMovieDetails: (id) => _request(`/movie/${id}`),
    };

};