import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact Component={MovieList}/>
          <Route path="/movie/:movieId" Component={MovieDetails} />
        </Routes>
      </Router>

    </div>
   
  );
}

export default App;
