
import './App.css';
import Header from './components/Header';
import WeeklyAgenda from './components/WeeklyAgenda'
import dayjs from 'dayjs';

function App() {
  return (
    <div className="App">
      <Header />
      <WeeklyAgenda date={dayjs()}/>
    </div>
  );
}

export default App;
