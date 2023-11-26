import React from 'react';
import LatestMoviesSlide from '../components/common/LatestMoviesSlide';
import tmdbConfigs from "../api/configs/tmdb.configs";

const HomePage = () => {
  return (
    <>
      <LatestMoviesSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
    </>
  );
};

export default HomePage;