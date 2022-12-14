import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import 'bootstrap';

import Home from "./components/Home/Home";
import Invited from "./components/Invite/index";
import Accepted from "./components/Accepted/index";
import Rejected from "./components/Rejected/index";
import NoReply from "./components/NoReply/index";
import Success from "./components/Success/index";
import Success2 from "./components/Success2/index";
import UserPage from './components/UserPage/index';
import Attended from './components/Attended';
import Error from './components/Error/Error';
import Registration from './components/Registration';
import Registration2 from './components/Registration2';
import Video from "./components/Video";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Invited" element={<Invited />} />
          <Route path="/Accepted" element={<Accepted />} />
          <Route path="/Rejected" element={<Rejected />} />
          <Route path="/NoReply" element={<NoReply />} />
          <Route path="/Success/:user_id" element={<Success />} />
          <Route path="/Success" element={<Success2 />} />
          <Route path="/Attended" element={<Attended />} />
          <Route path="/Registration/:user_id" element={<Registration />} />
          <Route path="/Registration2" element={<Registration2 />} />
          <Route path="/user/:user_id" element={<UserPage />} />
          <Route path="*" element={<Error />} />
          <Route path="/Video/:user_id" element={<Video />} />
      </Routes>
    </>
  )
}
export default App
