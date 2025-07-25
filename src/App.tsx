import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ButtonPage from './pages/ButtonPage';
import InputPage from './pages/InputPage';
import TypographyPage from './pages/TypographyPage';
import GridPage from './pages/GridPage';
import StatusPage from './pages/StatusPage';
import AvatarPage from './pages/AvatarPage';
import NavigationPage from './pages/NavigationPage';
import ColorsPage from './pages/ColorsPage';
import PopupModalPage from './pages/PopupModalPage';
import Overview from './pages/Overview';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/buttons" element={<ButtonPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/grid" element={<GridPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="/modal" element={<PopupModalPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;