import Home from './Home';
import * as Sentry from '@sentry/react'

function App() {
  
  return (
    <div className="App" >   
     <Home />    
    </div>
  );
}

export default Sentry.withProfiler(App);
