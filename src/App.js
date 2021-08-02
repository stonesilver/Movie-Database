import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './components/Navbar/Navbar';
import Homepage from './pages/homepage/homepage.component';
import MoviePage from './pages/moviePage/moviePage.component';
import TvShowPage from './pages/tvShowPage/tvShowPage.component';
import PeoplePage from './pages/peoplePage/peoplePage.component';
import PageNotFound from './components/404Page/404Page.component';
import Footer from './components/Footer/Footer';
import collectionDetails from './components/collection-page/collection-page.component';
import MyComponent from './components/lazy-load/lazy-load.component';
// import MovieImagesCarousel from './components/movieImagesCarousel/movieImagesCarousel.component';
import SearchPage from './components/searchPage/searchPage.component';
import YoutubeIframe from './components/youtube/youtube.component';
import { useLocation } from 'react-router-dom';
import './App.scss';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    // bg-dark bg-colour
    <div className='App'>
      {/* <MovieImagesCarousel /> */}
      <NavigationBar />
      <Switch location={background || location}>
      {/* <Switch> */}
        <Route exact path='/' component={Homepage} />

         <Route path='/movies' component={MoviePage} />
        <Route path='/tv' component={TvShowPage} />
        <Route path='/people' component={PeoplePage} />
        *<Route
          exact
          path='/collection/:collectionID'
          component={collectionDetails}
        />
        <Route exact path={`/search`} component={SearchPage} />
        <Route exact path='/lazy' component={MyComponent} />
        <Route component={PageNotFound} /> 
      </Switch>
      {background && (
        <Route path={'/play/:youtubeID'} component={YoutubeIframe} />
      )}
      <Footer />
    </div>
  );
};

export default App;
