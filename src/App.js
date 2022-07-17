import Home from './Home';
import * as Sentry from '@sentry/react'
import { Login } from './Login';
function App() {
  
  return (
    <div className="App" >
   
     <Login />
     
    </div>
  );
}

export default Sentry.withProfiler(App);
