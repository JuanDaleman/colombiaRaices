import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './utils/constants';

// Components
import Navigation from './components/common/Navigation';

// Pages
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
