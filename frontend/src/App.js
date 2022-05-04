import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import ReactionListPage from './pages/ReactionListPage'
import ReactionPage from './pages/ReactionPage'
import StructureListPage from './pages/StructureListPage';
import Footer from './components/Footer'
import SearchPage from './pages/SearchPage';
import GeneralSearch from './pages/GeneralSearchResults';
import AdvSearchPage from './pages/AdvSearchPage';
import ContributePage from './pages/ContributePage';
import LoginPage from './pages/LoginPage';
import NewUserPage from './pages/NewUserPage';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <br></br>
            <Routes>
              <Route path="/" exact element={<SearchPage />} />
              <Route path="/sign-in" exact element={<LoginPage />} />
              <Route path="/create-account" exact element={<NewUserPage />} />
              <Route path="/all-reactions" exact element={<ReactionListPage />} />
              <Route path="/structures" exact element={<StructureListPage />} />
              <Route path="/reaction/:id" exact element={<ReactionPage />} />
              <Route path="/search/:searchTerm" exact element={<GeneralSearch />} />
              <Route path="/advanced" exact element={<AdvSearchPage />} />
              <Route exact path='/contribute' element={
                <PrivateRoute>
                  <ContributePage />
                </PrivateRoute>
              }/>

            </Routes>
          
          <br></br>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
