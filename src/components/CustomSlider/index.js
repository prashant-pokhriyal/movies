import Slider from "react-slick";
import MovieCard from '../MovieCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CustomSlider(props) {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        beforeChange: (current, next) => props.onChange({ current, next }),
    };
    return (
        <Slider {...settings}>
            {
                props.movies?.map((movie, index) => (
                    <div
                        key={index}
                        className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/5"
                        onClick={(e) => props.onClick(movie)}
                    >
                        <MovieCard details={movie}></MovieCard>
                    </div>
                ))
            }
        </Slider>
    );
}