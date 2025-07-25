import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ThemeProvider } from './context/ThemeContext';
import ButtonPage from './pages/ButtonPage';
import InputPage from './pages/InputPage';
import TypographyPage from './pages/TypographyPage';
import GridPage from './pages/GridPage';
import StatusPage from './pages/StatusPage';
import AvatarPage from './pages/AvatarPage';
import NavigationPage from './pages/NavigationPage';
import ColorsPage from './pages/ColorsPage';
import PopupModalPage from './pages/PopupModalPage';
import ModuleListingPage from './pages/ModuleListingPage';
import AccordionPage from './pages/AccordionPage';
import CheckboxPage from './pages/CheckboxPage';
import RadioPage from './pages/RadioPage';
import FileUploadPage from './pages/FileUploadPage';
import SelectDropdownPage from './pages/SelectDropdownPage';
import Overview from './pages/Overview';
import DesignSystemPage from './pages/DesignSystemPage';
import TablePage from './pages/TablePage';
import NotificationPage from './pages/NotificationPage';
import RemixAIPage from './pages/RemixAIPage';

function App() {
  return (
    <ThemeProvider>
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
          <Route path="/module-listing" element={<ModuleListingPage />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/checkbox" element={<CheckboxPage />} />
          <Route path="/radio" element={<RadioPage />} />
          <Route path="/file-upload" element={<FileUploadPage />} />
          <Route path="/select-dropdown" element={<SelectDropdownPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/remix-ai" element={<RemixAIPage />} />
        </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;