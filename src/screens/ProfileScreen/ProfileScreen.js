import React from 'react';
import './ProfileScreen.css';
import Nav from '../../components/Nav/Nav';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { auth } from '../../firebase';
import avatar from '../../img/icon48.png';
import PlanScreen from '../PlanScreen/PlanScreen';

function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen-body">
        <h1>Edit Profile</h1>
        <div className="profileScreen-info">
          <img src={avatar} alt="avatar's icon" />
          <div className="profileScreen-details">
            <h2>{user.email}</h2>
            <div className="profileScreen-plans">
              <h3>PLans</h3>
              <PlanScreen />
              <button
                onClick={() => auth.signOut()}
                className="profileScreen-signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
