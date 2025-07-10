import { useState, useEffect } from 'react';
import { useLocation,useParams, useNavigate, Link, Outlet, } from 'react-router-dom';
import styles from './layout.module.css';
import { useUser } from './UserContext';
import axios from 'axios';
const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [coinIconDisappear, setCoinIconDisappear] = useState(true);
    const [leaderboardShower, setLeaderboardShower] = useState(false);
    const location = useLocation();
      const { tag, id } = useParams();
    console.log(tag,id);
    
    console.log(location);
    
    const navigate = useNavigate();
  const hideSidebarRoutes = ["/leaderboard", '/change-password', "/register", "/full-screen-page", "/progress"];
  const hideSideAndNav = [`/gk/${tag}/${id}`, `/birds/${tag}/${id}`, `/animals/${tag}/${id}`, `/science/${tag}/${id}`];
  const shouldhideSideAndNav = hideSideAndNav.includes(location.pathname);
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);
  const [user, setUser] = useState(null);
    const { userCredentials } = useUser();

    useEffect(()=> {

    },[userCredentials])
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSidebarOpen(true); 
                setCoinIconDisappear(false);
                setLeaderboardShower(true)
            } else {
                setSidebarOpen(true); 
                setCoinIconDisappear(true);
                setLeaderboardShower(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const setActiveClass = () => {
            const path = location.pathname;
            const page = path.substr(path.lastIndexOf('/') + 1) || 'dashboard';
            const activeLink = `${page}-link`;
            document.querySelectorAll(`.${styles.navItem}`).forEach(item => {
                item.classList.toggle(styles.active, item.classList.contains(activeLink));
            });
        };

        setActiveClass();
    }, [location]);

      // Handle page unload event
  useEffect(() => {
    const handleUnload = () => {
      const data = {
        message: 'User has left the page.',
        timestamp: new Date().toISOString(),
      };

      const url = 'http://localhost:3000/api/track-unload';
      navigator.sendBeacon(url, JSON.stringify(data));
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

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
 }, [user?._id]);
  // Redirect based on token and registration state
  // useEffect(() => {
  //   const registered = localStorage.getItem('registered');
  //         const userId = user?._id;
  //   const token = localStorage.getItem(`$FSA_auth_token`);

  //   // Check if the user is on the root path and redirect accordingly
  //   if (window.location.pathname === '/') {
  //     if (!registered || !token) {
  //       navigate('/login'); // Redirect to login if not registered or no token
  //     }
  //   }
  // }, [user]);

    // Other Handles
    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
        console.log(isSidebarOpen);
        
    };

    const handleLogout = () => {
      const userId = user?._id;
        localStorage.removeItem(`$FSA_auth_token`);
        navigate('/login');
    };

    return (
        <div className={styles.homeBody}>
            <main role="main" className={`${styles.containerFluid}`} id="main">
                {/* Header sidebarWrapper */}
                {!shouldhideSideAndNav && (
                <header className={` ${styles.homeHeader} ${styles.row} ${styles.bgWhite}`}>
                    <nav className={`${styles.col} ${styles.navbar} ${styles.navbarExpandMd} ${styles.navbarLight} ${styles.shadowSm} ${styles.navheadFixed} ${styles.containerFluid2}`}>
                        <button
                            id="sidebarToggle"
                            className={styles.navbarToggler}
                            type="button"
                            onClick={toggleSidebar}
                            aria-controls="sidebar"
                            aria-expanded={isSidebarOpen}
                            aria-label="Toggle navigation">
                            <i className={styles.materialIcons}>{isSidebarOpen ? 'close' : 'menu'}</i>
                        </button>
                        <Link to='/gk/all'>
                        <a className={`${styles.navbarBrand} ${styles.aHome}`} href="#">
                            <img src="/public/images/main-logo.jpeg" className={`${styles.lazyload} ${styles.ml3}`} alt="Site logo" width="95px" />
                        </a>
                        </Link>
                        {!leaderboardShower && (
                            <>
                            <div className={styles.leaderboard}>
                                <svg className={styles.leaderboardSvg} xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 11v8h4v-8H4Zm6-6v14h4V5h-4Zm6 8v6h4v-6h-4Zm4 8H4q-.825 0-1.413-.588T2 19v-8q0-.825.588-1.413T4 9h4V5q0-.825.588-1.413T10 3h4q.825 0 1.413.588T16 5v6h4q.825 0 1.413.588T22 13v6q0 .825-.588 1.413T20 21Z"/></svg>
                                 <Link className={styles.leaderboard} to="/leaderboard">Leaderboard</Link>
                            </div>
                            <div className={styles.leaderboard}>
                <svg className={styles.leaderboardSvg} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h4l3 8l4-16l3 8h4"/></svg>
                                <Link className={styles.leaderboard} to="/progress">Activity</Link>
                            </div>
                                                        </>

                                                    )}

                        {/* </div> */}

{/*  ---------------------------------- Coin conatiner --------------------------------------------- */}
                  {coinIconDisappear && (
                        <div className={`${styles.buttonNavbar} ${styles.coinContainer}`}>
                        <div className={styles.parent}>
                        <div className={styles.div1}>
                                <img src="/public/images/coinCoinImage.png" alt="icon" className={styles.coinIcon}></img><span className={styles.coinText}>       {userCredentials?.userCoins}</span>    
                        </div>
                        <div className={styles.div2}>
                                <img width="48" height="48" src="https://img.icons8.com/emoji/48/star-emoji.png" alt="icon" className={styles.coinIcon}></img><span className={styles.coinText}>       {userCredentials?.userSc}</span>   
                        </div>
                        </div>
                        </div>
                  )}
{/*------------------------------------------ User Icon ------------------------------------*/}
                        <div className={styles.buttonNavbar}>
                            <button
                                className={`${styles.btn} ${styles.dropdown} ${styles.accountBoxToggler}`}
                                type="button"
                                data-toggle="collapse"
                                data-target="#account-box"
                                aria-expanded="false"
                                aria-controls="account-box"
                            >
                                <label className={styles.popup}>
                                    <input type="checkbox" />
                                    <div className={styles.burger} tabIndex="0">
                                        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M335 343.43H65V300.06C65 254.02 102.33 216.69 148.37 216.69H251.63C297.67 216.69 335 254.02 335 300.06V343.43Z"
                                                stroke="#191919"
                                                strokeWidth="12"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M200 186.57C235.899 186.57 265 157.468 265 121.57C265 85.6713 235.899 56.5698 200 56.5698C164.101 56.5698 135 85.6713 135 121.57C135 157.468 164.101 186.57 200 186.57Z"
                                                stroke="#6A0BFF"
                                                strokeWidth="12"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
<nav className={styles.popupWindow}>
    <legend>Actions</legend>
    <ul>
      <li>
        <Link to='/profile' style={{textDecoration: 'none'}}>
        <button className={styles.popupBtn} >
          <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle r="4" cy="7" cx="9"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>My Profile</span> 
        </button>
        </Link>
      </li>
      <li>
      <Link to='/change-password' style={{textDecoration: 'none'}}>
        <button className={styles.popupBtn} >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" >
    <path fill="currentColor" d="M15 6a1.54 1.54 0 0 1-1.5-1.5a1.5 1.5 0 0 1 3 0A1.54 1.54 0 0 1 15 6zm-1.5-5A5.55 5.55 0 0 0 8 6.5a6.81 6.81 0 0 0 .7 2.8L1 17v2h4v-2h2v-2h2l3.2-3.2a5.85 5.85 0 0 0 1.3.2A5.55 5.55 0 0 0 19 6.5A5.55 5.55 0 0 0 13.5 1z"></path>
      </svg>  
          <span>Change Password</span>
        </button>
      </Link>
      </li>
      <li>
        <button className={styles.popupBtn} onClick={handleLogout}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9.5 10.5v2a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v2M6.5 7h7m-2-2l2 2l-2 2"></path>
    </svg>
       <span>Sign out</span>
        </button>
      </li>
    </ul>
  </nav>
  </label>
</button>
</div>
 </nav>

{/*------------------------------------------------ Sidebar ---------------------------------*/}
      {!shouldHideSidebar && (
                    <div className={styles.sidebarWrapper}>
                        <div className={`${styles.sidebarContainer} ${isSidebarOpen ? '' : styles.sidebarCollapse}`}>
                            <div id="sidebar" className={`${styles.sidebarSticky} ${styles.shadowSm}`}>
                                <ul className={`${styles.nav} ${styles.flexColumn} ${styles.mainMenu}`}>
        {leaderboardShower && (
            <>

      <li className={`${styles.navItem} ${styles.li}`}>
        <Link style={{ textDecoration: 'none' }} to="/leaderboard">
          <a className={`${styles.navLink} ${styles.aHome}`}>
                                            <svg style={{color: 'rgb(24, 170, 24)'}} xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 11v8h4v-8H4Zm6-6v14h4V5h-4Zm6 8v6h4v-6h-4Zm4 8H4q-.825 0-1.413-.588T2 19v-8q0-.825.588-1.413T4 9h4V5q0-.825.588-1.413T10 3h4q.825 0 1.413.588T16 5v6h4q.825 0 1.413.588T22 13v6q0 .825-.588 1.413T20 21Z"/></svg>
            <span className={styles.sidebarInlineText}>LeaderBoard</span>
          </a>
        </Link>
      </li>

      <li className={`${styles.navItem} ${styles.li}`}>
        <Link style={{ textDecoration: 'none' }} to="/progress">
          <a className={`${styles.navLink} ${styles.aHome}`}>
<svg style={{color: 'rgb(24, 170, 24)'}} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h4l3 8l4-16l3 8h4"/></svg>            <span className={styles.sidebarInlineText}>Activity</span>
          </a>
        </Link>
      </li>

      <li className={`${styles.navItem} ${styles.li}`}>
        <a className={`${styles.navLink} ${styles.aHome}`}>
 <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M18.848 5.152a1.2 1.2 0 0 1 0 1.696l-6 6a1.2 1.2 0 0 1-1.696 0l-6-6a1.2 1.2 0 0 1 1.696-1.696L12 10.303l5.152-5.151a1.2 1.2 0 0 1 1.696 0Zm0 7.2a1.2 1.2 0 0 1 0 1.696l-6 6a1.2 1.2 0 0 1-1.696 0l-6-6a1.2 1.2 0 1 1 1.696-1.696L12 17.503l5.152-5.151a1.2 1.2 0 0 1 1.696 0Z" clipRule="evenodd" /></svg>
          <h6 className={styles.sidebarInlineText1}>Topics</h6>
        </a>
      </li>

            </>
                    )}
                                    <li className={`${styles.navItem} ${styles.coursesLink}`}>
                                        <Link style={{textDecoration: 'none'}} to="/gk/all">
                                        <a className={`${styles.navLink} ${styles.aHome}`}>
                                            <img src="/public/images/question-mark.png" alt="?" width="30px" />
                                                <span className={styles.sidebarInlineText}>GK </span>
                                        </a>
                                        </Link>
                                    </li>
                                    <hr className={styles.borderSidebar} />
                                    <li className={`${styles.navItem} ${styles.codeKataLink}`}>
                                        <Link style={{textDecoration: 'none'}} to="/birds/all">
                                        <a className={`${styles.navLink} ${styles.aHome}`} href="/code-kata/">
                                            <img src="/public/images/parrot.png" alt="?" width="30px" />
                                            <span className={styles.sidebarInlineText}>Birds</span>
                                        </a>
                                        </Link>
                                    </li>
                                    <hr className={styles.borderSidebar} />
                                    <li className={`${styles.navItem} ${styles.leaderBoardLink}`}>
                                          <Link style={{textDecoration: 'none'}} to="/animals/all">
                                        <a className={`${styles.navLink} ${styles.aHome}`} href="/leader-board/">
                                            <img src="/public/images/lion.png" alt="?" width="30px" />
                                            <span className={styles.sidebarInlineText}>Animals</span>
                                        </a>
                                          </Link>
                                    </li>
                                      <li className={`${styles.navItem} ${styles.referralLink}`}>
                                         <Link style={{textDecoration: 'none'}} to="/science/all">
                                        <a className={`${styles.navLink} ${styles.aHome}`} href="/referral/">
                                            <img src="/public/images/flask.png" alt="?" width="30px" />
                                            <i className={styles.iconsReferral}></i>
                                            <span className={styles.sidebarInlineText}>Science</span>
                                        </a>
                                        </Link>
                                    </li>
                                    <li className={`${styles.navItem} ${styles.rewardsLink}`}>
                                        <a className={`${styles.navLink} ${styles.aHome}`} href="/rewards/">
                                            <img src="/public/images/question-mark.png" alt="?" width="30px" />
                                            <span className={styles.sidebarInlineText}>Rewards</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                </header>
              )}
                <div className={styles.staticHeight}></div>
                {/* /Header */}
                <div className={styles.containerFluid}>
{/*  -------------------------- Main contents --------------------------------------------------- */}
                    <div className={styles.row}>
                        <div className={`${styles.colSm12} ${styles.offsetMd1} ${styles.colMd11}`}>
                            <div className={styles.bow}>                                
                                <div className={`${styles.colSm12} ${styles.colMd6} ${styles.dFlex} ${styles.flexColumn} ${styles.justifyContentAround}`}>
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;