import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";



const Loader = ()=>{
  return (
    <div className="loader" style={{ color: "white", height: 200, }}>
  </div>
  )
}
const base_url = "https://image.tmdb.org/t/p/original";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isImgLoaded, setImgLoaded] = useState(false)

  // A snippet of code wich runs on a specific condition/ variable

  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      try {
        setIsLoading(true)  
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
      } catch (error) {
        console.log("error", error?.data, error?.response)
      }finally{
        setIsLoading(false)
      }
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleVideo = (movie) => {
    // console.log(movie.n);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title
         || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  //   console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className={`row__posters ${isLargeRow && "row__posterLarge"}`}>
        {isLoading ? (
          Array(10).fill(5).map((el, index) => <Loader key={index}/>)
        ) : (
          movies.map((movie, index) => {
            console.log(movie)
            return ( 
              <div 
              onClick={() => handleVideo(movie)}
              
              key={movie.id}
              className="row_poster">
                {!isImgLoaded ? (
                  <Loader/>
                ): (
                  <img
                  className="row__poster_img"
                  src={`${base_url}/${
                    isLargeRow ? movie?.poster_path : movie?.backdrop_path
                  }`}
                  alt={movies.name}
                  />
                )}
              <img
              className="row__poster_img"
              src={`${base_url}/${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              style={{
                display: "none"
              }}
              onLoad={()=> setImgLoaded(true)}
              alt={movies.name}
              />
              </div>
              
              )
              

            }
            ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
