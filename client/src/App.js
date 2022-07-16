import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Weather from "./components/pages/Weather";
import Message from "./components/pages/Message";
import PlaceData from "./components/pages/PlaceData";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Message />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/weather/:place" element={<PlaceData />} />
      </Routes>
    </Fragment>
  );
}

export default App;
