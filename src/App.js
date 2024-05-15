import Home from './components/home/Home';
import Register from './components/register/Register';
import LogInForm from './components/login/LogIn';
import { Routes, Route } from 'react-router-dom';
import HomeLogged from './components/home/HomeLogged';
import CreatePost from './components/home/CreatePost';
import UserInfo from './components/home/UserInfo';

import Topic1 from './components/home/topic/Topic1';

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


        {/* Chủ đề bài viết */}
        <Route path='/topic1' element={<Topic1 />}></Route>

        {/* Mục đích bài viết */}
        <Route path='/purpose1' element={<Purpose1 />}></Route>
        <Route path='/purpose2' element={<Purpose2 />}></Route>
        <Route path='/purpose3' element={<Purpose3 />}></Route>        
        <Route path='/purpose4' element={<Purpose4 />}></Route>        

    </Routes>
  );
}

export default App;
