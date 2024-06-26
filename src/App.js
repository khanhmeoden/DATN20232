import Home from './components/home/Home';
import Register from './components/register/Register';
import LogInForm from './components/login/LogIn';
import { Routes, Route } from 'react-router-dom';
import HomeLogged from './components/home/HomeLogged';
import CreatePost from './components/home/CreatePost';
import UserInfo from './components/home/UserInfo';
import SearchResult from './components/home/SearchResult';

import Topic1 from './components/home/topic/Topic1';
import Topic2 from './components/home/topic/Topic2';
import Topic3 from './components/home/topic/Topic3';
import Topic4 from './components/home/topic/Topic4';
import Topic5 from './components/home/topic/Topic5';
import Topic6 from './components/home/topic/Topic6';
import Topic7 from './components/home/topic/Topic7';
import Topic8 from './components/home/topic/Topic8';
import Topic9 from './components/home/topic/Topic9';
import Topic10 from './components/home/topic/Topic10';
import Topic11 from './components/home/topic/Topic11';
import Topic12 from './components/home/topic/Topic12';
import Topic13 from './components/home/topic/Topic13';
import Topic14 from './components/home/topic/Topic14';

import Purpose1 from './components/home/purpose/Purpose1';
import Purpose2 from './components/home/purpose/Purpose2';
import Purpose3 from './components/home/purpose/Purpose3';
import Purpose4 from './components/home/purpose/Purpose4';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='login' element={<LogInForm />}></Route>
        <Route path='home' element={<HomeLogged />}></Route>
        <Route path='create-post' element={<CreatePost />}></Route>
        <Route path='user-info' element={<UserInfo />}></Route>
        <Route path="/search-results" element={<SearchResult />} />


        {/* Chủ đề bài viết */}
        <Route path='/topic1' element={<Topic1 />}></Route>
        <Route path='/topic2' element={<Topic2 />}></Route>
        <Route path='/topic3' element={<Topic3 />}></Route>
        <Route path='/topic4' element={<Topic4 />}></Route>
        <Route path='/topic5' element={<Topic5 />}></Route>
        <Route path='/topic6' element={<Topic6 />}></Route>
        <Route path='/topic7' element={<Topic7 />}></Route>
        <Route path='/topic8' element={<Topic8 />}></Route>
        <Route path='/topic9' element={<Topic9 />}></Route>
        <Route path='/topic10' element={<Topic10 />}></Route>
        <Route path='/topic11' element={<Topic11 />}></Route>
        <Route path='/topic12' element={<Topic12 />}></Route>
        <Route path='/topic13' element={<Topic13 />}></Route>
        <Route path='/topic14' element={<Topic14 />}></Route>

        {/* Mục đích bài viết */}
        <Route path='/purpose1' element={<Purpose1 />}></Route>
        <Route path='/purpose2' element={<Purpose2 />}></Route>
        <Route path='/purpose3' element={<Purpose3 />}></Route>        
        <Route path='/purpose4' element={<Purpose4 />}></Route>        

    </Routes>
  );
}

export default App;
