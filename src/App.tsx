

import React from 'react';
import  ITunesPage  from './pages/ITunesPage.tsx'
import BasicExample from './components/navbar'
import Colorant from './components/Colorant/Colorant.tsx'
//import Header from "./Header.tsx";
const App: React.FC = () => {
    return (
        <Router>
            <BasicExample></BasicExample>
            <Routes>
                <Route path="/rip_front" element={<ITunesPage/>}/>
                <Route path="/rip_front/alpinist/:id" element={<Colorant/>}/>
            </Routes>
        </Router>

    );
};

export default App;
