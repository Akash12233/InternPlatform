
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { ProgramContextProvider } from './context/porgramContext';
import { TaskContextProvider } from './context/taskContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <ProgramContextProvider>
  <TaskContextProvider>
      <Router>
        <App />
      </Router>
    </TaskContextProvider>
    </ProgramContextProvider>
);
