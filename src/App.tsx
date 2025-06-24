import { actions, store, StoreContext } from './lib/store';
import Detail from './pages/Detail/Detail';

function App() {
    return (
        <StoreContext.Provider value={{ store, actions }}>
            <Detail />
        </StoreContext.Provider>
    );
}

export default App;
