export default function MovieCard(props) {
    return (

        <article className="overflow-hidden rounded-lg shadow-lg">
            <img alt="Placeholder" className="object-fill h-64 w-full" src={`https://image.tmdb.org/t/p/w185/${props.details.poster_path}`} />
            <header className="flex justify-between leading-tight p-1 md:p-2">
                <h1 className="text-lg">
                    <p className="text-sm">
                        {props.details.title}
                    </p>
                </h1>
                <p className="flex items-center justify-center text-white text-xs bg-green-500 rounded-full h-6 w-6">{props.details.vote_average}</p>
            </header>

            <footer className="flex flex-wrap p-1 md:p-2">
                {
                    props.details?.credits?.cast?.sort((actor1, actor2) => actor2.popularity - actor1.popularity)?.slice(0, 2)?.map((actor, index) => (
                        <p key={index} className="flex items-center p-1">
                            <img alt="Placeholder" className="block rounded-full h-8 w-8 object-cover" src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} />
                            <p className="ml-2 text-xs">{actor.name}</p>
                        </p>
                    ))
                }
            </footer>

        </article>
    );
}