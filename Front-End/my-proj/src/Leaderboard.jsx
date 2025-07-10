import { useState, useEffect } from 'react';
import styles from './layout.module.css';
import axios from 'axios';
import { useUser } from './UserContext'; 
function Leaderboard() {

const userCredentials = useUser();
  const [user, setUser] = useState(null);
const [leaderboardUsers, setLeaderboarUsers] = useState({
  userId: null,
  username: null,
  coins: null,
  skillScore: null,

});

function mergeSortDescending(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortDescending(arr.slice(0, mid));
  const right = mergeSortDescending(arr.slice(mid));

  return mergeDescending(left, right);
}

function mergeDescending(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].userStats.overallSkillScore > right[j].userStats.overallSkillScore) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}
            let [sortedUsers, setSortedUsers] = useState([]);

    useEffect(() => {
        const fetchUserCredentials = async () => {
          try {
            const userId = user?._id;
            const $FSA_auth_token = localStorage.getItem(`$FSA_auth_token`);
            const response = await axios.get('http://localhost:3000/api/get-user-whole-details', {
              headers: {
                Authorization: `Bearer ${$FSA_auth_token}`,
              },
            });
            console.log(response.data);
            setSortedUsers(mergeSortDescending(response.data));            
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
        fetchUserCredentials();
      }, []);
            console.log(sortedUsers);

         useEffect(() => {  
        const fetchProfile = async () => {
          try {
            const userId = user?._id;
            const $FSA_auth_token = localStorage.getItem(`$FSA_auth_token`);
            if (!$FSA_auth_token) {
              console.warn('Auth token not found');
              return;
            }
      
            const response = await axios.get('http://localhost:3000/myProfile', {
              headers: {
                Authorization: `Bearer ${$FSA_auth_token}`,
              },
            });

              setUser({
                _id: response.data._id,
              });
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
        fetchProfile();
      
        // Trigger function for whether user making tab switches or not
        const handleVisibilityChange = () => {
          if (document.visibilityState === "hidden") {
            console.log('Switched');
          } else if (document.visibilityState === "visible") {
            //console.log("Tab is active again");
          }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);    
        };
 }, [user?._id]);

  return (
    <>
    <div className={styles.pageWrapper}>

        <div className={styles.tableWrapper}>
          <h2 className={styles.leaderBoardHearder}>  Leaderboard </h2>
      <table className={styles.playerTable}>
        <thead>
          <tr>
            <th className={styles.th}>No.</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Coins</th>
            <th className={styles.th}>Skill Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers?.length > 0 ? (
            sortedUsers.map((_, index) => (
              <tr key={index}>
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>{sortedUsers[index].username?.toUpperCase()}</td>
                <td className={styles.td}>{sortedUsers[index].userStats.coins}</td>
                <td className={styles.td}>{sortedUsers[index].userStats.overallSkillScore}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noData}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  <div className={styles.firstPlace}>
          <img
        src="/public/images/profile-pic-sample.jpeg"
        alt="Profile"
        className={styles.avatar}
      />
      <p className={styles.name}>🥇 Jo</p>
<div className={styles.firstPlacerInfoContainer}>
  <div className={styles.gridItem}>Country: {sortedUsers[0]?.userStats?.country}</div>
  <div className={styles.gridItem}>Proffesion: {sortedUsers[0]?.userStats?.proffession}</div>
  <div className={styles.gridItem}>Skill Score: {sortedUsers[0]?.userStats?.overallSkillScore}</div>
  <div className={styles.gridItem}>Coins: {sortedUsers[0]?.userStats?.coins}</div>

  
</div>

  </div>
</div>

    </>
  )
}

export default Leaderboard;
