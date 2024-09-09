import './App.css';
import Swimlanes from './components/Swimlanes';

function App() {
    return (
        <>
            <div style={{ padding: '20px' }}>
                <h1><span style={{color:"white"}}>SwimLane UI with </span> <span style={{color:"Red"}}>Drag and Drop Funtionality</span></h1>
                <Swimlanes />
            </div>
        </>
    );
}

export default App;