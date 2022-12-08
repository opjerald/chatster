import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Chat from '../pages/Chat';
import Avatar from '../pages/Avatar';
import Chatmates from '../components/Chatmates';
import Rooms from '../components/Rooms';

const Routes = () => {
  return (
    <Switch>
      <Route path='*' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/set-avatar' element={<Avatar />} />
      <Route path='/' element={<Chat />}>
        <Route path='contacts' element={<Chatmates />}>
          <Route path=':id' element={<Chat />}></Route>
        </Route>
        <Route path='rooms' element={<Rooms />} />
      </Route>
    </Switch>
  );
};

export default Routes;
