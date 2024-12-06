import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transaction from './components/Transaction';
import Statistics from './components/Statistics';
import { RecoilRoot } from 'recoil';
import Navigation from './components/Navigation';
import BarChart from './components/BarChart';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className='grid place-items-center min-h-screen'>
          <Routes>
            <Route path="/" element={<Transaction />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/visualize" element={<BarChart />} />

          </Routes>
          <Navigation />
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;