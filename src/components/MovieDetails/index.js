import React from 'react';

export default function MovieDetails(props) {
    const directors = props.details?.credits?.crew
        ?.filter(person => person.job === 'Director');
    return (
        <>
            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        onClick={() => props.setShowModal(false)}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-4xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                {/* <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {props.details.title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                      </span>
                                    </button>
                                </div> */}
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="flex">
                                        <div className="flex-none w-64 h-96 relative">
                                            <img src={`https://image.tmdb.org/t/p/w185/${props.details.poster_path}`} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                        </div>
                                        <form className="flex-auto pl-6">
                                            <div className="flex flex-wrap pb-2">
                                                <h1 className="flex-auto text-xl font-semibold">
                                                    {props.details.title}
                                                </h1>
                                                <div className="text-xl font-semibold text-gray-500">
                                                    {props.details.vote_average}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap border-b border-solid border-gray-300">
                                                <p className="flex items-center p-1 text-sm text-gray-500">{props.details.release_date.split('-')[0]} | {props.details.runtime} min |</p>
                                                {
                                                    directors?.map((actor, index) => (
                                                        <p key={index} className="flex items-center p-1">
                                                            <img alt="profile" className="block rounded-full h-8 w-8 object-cover" src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} />
                                                            <span className="ml-2 text-xs">{actor.name}</span>
                                                        </p>
                                                    ))
                                                }
                                            </div>
                                            <div className="flex flex-wrap pt-2">
                                                <p className="text-sm text-gray-500">{props.details.overview}</p>
                                            </div>
                                            <div className="flex flex-wrap pt-2 items-center">
                                                {/* <p className="text-sm text-gray-500">{props.details?.credits?.cast?.map(actor => actor.name)?.join(',')}</p> */}
                                                <label>Cast</label>
                                                {
                                                    props.details?.credits?.cast?.sort((actor1, actor2) => actor2.popularity - actor1.popularity)?.slice(0, 2)?.map((actor, index) => (
                                                        <p key={index} className="flex items-center p-1">
                                                            <img alt="profile" className="block rounded-full h-8 w-8 object-cover" src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} />
                                                            <p className="ml-2 text-xs">{actor.name}</p>
                                                        </p>
                                                    ))
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}