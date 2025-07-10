import  styles from '../src/commonQuize.module.css'
import { useState, useEffect,} from 'react';
import {  useNavigate, Link,useParams, useLocation,  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useUser } from '../UserContext';
function Birds() {
  const [activePage, setActivePage] = useState('All');
  const [pickOne, setPickOne] = useState(false);
  let [currSetOfCards, setCurrSetOfCards] = useState();

   const navigate = useNavigate();
     const [loader, setLoader] = useState(false);
   const [selectedQuizType, setSelectedQuizType] = useState('all'); 
   const [selectedDifficulty, setSelectedDifficulty] = useState('all'); 
   const [searchBarValue, setSearchBarValue] = useState('');
   const [status, setStatus] = useState()
   const [selectedStatus, setSelectedStatus] = useState();
   const { quizType } = useParams();
   
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   
   const { userCredentials } = useUser();

   const QuizMCQCardData = {
  choose: [
    { id: '1', image: '/public/images/bird.jpg', title: 'Choose - Unit-1', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/1',difficulty: 'easy' },
    { id: '2', image: '/public/images/bird.jpg', title: 'Choose - Unit-2', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/2', difficulty: 'easy' },
    { id: '3', image: '/public/images/bird.jpg', title: 'Choose - Unit-3', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/3', difficulty: 'easy' },
    { id: '4', image: '/public/images/bird.jpg', title: 'Choose - Unit-4', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/4', difficulty: 'medium' },
    // { id: '5', image: '/public/images/bird.jpg', title: 'Choose - Unit-5', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/5', difficulty: 'medium' },
    // { id: '6', image: '/public/images/bird.jpg', title: 'Choose - Unit-6', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/6', difficulty: 'medium' },
    { id: '7', image: '/public/images/bird.jpg', title: 'Choose - Unit-7', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/7', difficulty: 'hard' },
    // { id: '8', image: '/public/images/bird.jpg', title: 'Choose - Unit-8', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/8', difficulty: 'hard' },
    // { id: '9', image: '/public/images/bird.jpg', title: 'Choose - Unit-9', score: '-', coins: 0, isCompleted: false, tag: 'choose', keyword: 'birds/choose/9', difficulty: 'hard' },
  ],
  fillUps: [
    { id: '1', image: '/public/images/bird.jpg', title: 'Fill Ups Unit-1', score: '-', coins: 0, isCompleted: false, tag: 'fill-ups', keyword: 'birds/fill-ups/1', difficulty: 'easy' },
    { id: '2', image: '/public/images/bird.jpg', title: 'Fill Ups Unit-2', score: '-', coins: 0, isCompleted: false, tag: 'fill-ups', keyword: 'birds/fill-ups/2', difficulty: 'easy' },
    { id: '3', image: '/public/images/bird.jpg', title: 'Fill Ups Unit-3', score: '-', coins: 0, isCompleted: false, tag: 'fill-ups', keyword: 'birds/fill-ups/3', difficulty: 'easy' },
  ],
  guessByImage: [
    { id: '1', image: '/public/images/bird.jpg', title: 'Guess by Image Unit-1', score: '-', coins: 0, isCompleted: false, tag: 'guess-by-image', keyword: 'birds/guess-by-image/1', difficulty: 'easy' },
    { id: '2', image: '/public/images/bird.jpg', title: 'Guess by Image Unit-2', score: '-', coins: 0, isCompleted: false, tag: 'guess-by-image', keyword: 'birds/guess-by-image/2', difficulty: 'easy' },
  ]
};
  const [quizCardData, setQuizCardData] = useState(QuizMCQCardData);

     const { refreshUserCredentials } = useUser();

  useEffect(() => {
    refreshUserCredentials();
}, []);
useEffect(() => {
  // Set the selected quiz type based on the URL parameter when the component mounts or the URL changes
  if (quizType) {
    setSelectedQuizType(quizType);
    setActivePage(quizType.charAt(0).toUpperCase() + quizType.slice(1));
  } else {
    setSelectedQuizType('all');
    setActivePage('All');
  }
}, [quizType]);

useEffect(() => {
  const difficulty = queryParams.get('difficulty');
  if (difficulty) {
    setSelectedDifficulty(difficulty.toLowerCase());
  } else {
    setSelectedDifficulty('all');
  }

  const status = queryParams.get('status');
  if (status) {
    setSelectedStatus(status.toLowerCase());
  }
}, [location.search]);

useEffect(() => {
  if (!quizCardData) return;
  let updated = { ...quizCardData };
  let hasChanged = false;

  Object.keys(quizCardData).forEach((tag) => {
    quizCardData[tag].forEach((quiz, index) => {
      let correctedTag = tag;
      if (quiz.tag === 'fill-ups') correctedTag = 'fillUps';
      if (quiz.tag === 'guess-by-image') correctedTag = 'guessByImage';

      const chapterStats = userCredentials?.userAllChapterPoints?.[correctedTag]?.[quiz.keyword];

      if (chapterStats?.isCompleted && !quiz.isCompleted) {
        setQuizCardData(prev => {
          const updated = { ...prev };
          updated[tag] = [...prev[tag]];
          updated[tag][index] = { ...updated[tag][index], isCompleted: true };
          return updated;
        });
      }
    });
  });
    if (hasChanged) {
    setQuizCardData(updated);
  }
}, [userCredentials, quizCardData]);

const getFilteredQuizzes = () => {
  const quizzesByType = selectedQuizType === 'choose' ? quizCardData.choose
                        : selectedQuizType === 'fill-ups' ? quizCardData.fillUps
                        : selectedQuizType === 'guess-by-image' ? quizCardData.guessByImage
                        : [...quizCardData.choose, ...quizCardData.fillUps, ...quizCardData.guessByImage];
  currSetOfCards = quizzesByType;
  const getSearchedValue = [];
  
  if (searchBarValue !== '') {
    quizzesByType.map((curr) => {
       let title = curr.title.toLowerCase();
      for (let i = 0; i < title.length; i++) {
        console.log(title.slice(i, i + searchBarValue.length));
        let currSlicedEle = title.slice(i,i+searchBarValue.length).toLowerCase();
        if (currSlicedEle === searchBarValue) {
          getSearchedValue.push(curr);
        }
      }
    });
    return getSearchedValue;
  }
    if (status === 'To-Do') {
      console.log('open');
              return quizzesByType.filter(quiz => !quiz.isCompleted);
    } else if (status === 'Solved') {
    return quizzesByType.filter(quiz => quiz.isCompleted);
    }
    if (selectedDifficulty === 'all') return quizzesByType;
  return quizzesByType.filter(quiz => quiz.difficulty === selectedDifficulty);
};
const handlePageClick = (page, quizType) => {
    setLoader(true);
  setActivePage(page);
  setSelectedQuizType(quizType);
    setLoader(false);
};

const handleResetSearch = () => {
  setSearchBarValue('');
}
// Pick One
function getRandomInt() {
  if (currSetOfCards?.length < 1) return;
      setLoader(true);
  let max = currSetOfCards?.length;
  console.log('max', max);
  
  let randomNo = Math.floor(Math.random() * (max - 1 + 1)) ;
  navigate(`/${currSetOfCards?.[randomNo]?.keyword}`);
    setLoader(false);

}

const handleDifficultyClick = (difficulty) => {
  setLoader(true);
  setSelectedDifficulty(difficulty);
  navigate(`/bids/${selectedQuizType}/?difficulty=${difficulty.toUpperCase()}`);
  setLoader(false);
};

const handleStatus = (status) => {
  setLoader(true);
  setSelectedDifficulty(status);
  navigate(`/birds/${selectedQuizType}/?status=${status.toUpperCase()}`);
  setLoader(false);
};
console.log(selectedQuizType);

  return (
    <>
        {loader && (
    <div className={styles.loader}>
      <div className={`${styles.load2}`}></div>
    </div>
        )}
    <div className={styles.flexContainer}>
      <div className={styles.inlineText}>
        <h2 className={styles.inlineText}>General Knowledge</h2>
        <p className={styles.inlineText}>
          In this block we prepared a series of basic level to advanced level &quot;Birds&quot; quizes with different level of games, people can engage there knowledge in this segment
          <br/>
          <br />
          <p>Wish you all the best.</p>
        </p>
      </div>
    </div>

    {/*-------------------------- Nav Pagination- --------------------- */}
    <div className={`${styles.paginationContainer} ${styles.fixed}`}>
      <nav aria-label="Page navigation example">
        <ul className={styles.pagination}>
        <Link to='/birds/all'>
        <li className={`${styles.pageItem} ${activePage === 'All' ? styles.active : ''}`}
            onClick={() => handlePageClick('All', 'all')}>
            <a className={styles.pageLink} >All</a>
          </li>
        </Link>
          <Link to='/birds/choose'>
          <li className={`${styles.pageItem} ${activePage === 'Choose' ? styles.active : ''}`}
            onClick={() => handlePageClick('Choose', 'choose')}>
            <a className={styles.pageLink} >Choose</a>
          </li></Link>
          <Link to='/birds/fill-ups'>
          <li className={`${styles.pageItem} ${activePage === 'Fill ups' ? styles.active : ''}`}
            onClick={() => handlePageClick('Fill ups', 'fill-ups')}>
            <a className={styles.pageLink} >Fill Ups</a>
            </li></Link>
            <Link to='/birds/guess-by-image'>
          <li className={`${styles.pageItem} ${activePage === 'Guess by image' ? styles.active : ''}`}
            onClick={() => handlePageClick('Guess by image', 'guess-by-image')}>
            <a className={styles.pageLink} >Guess by Image</a>
            </li></Link>
            <Link to='/birds/mixed-type-quiz'>
          <li className={`${styles.pageItem} ${activePage === 'Mixed type quiz' ? styles.active : ''}`}
            onClick={() => handlePageClick('Mixed type quiz', 'mixed-type-quiz')}>
            <a className={styles.pageLink}>Mixed type Quiz</a>
            </li></Link>
        </ul>
      </nav>
    </div>
  {/* Search Input */}
  <div className={styles.flexContainerDropdownsAbove768}>
  <div className={styles.searchBarContainer}>
    <form className={styles.form}>
      <label className={styles.label} htmlFor="search">
        <input className={styles.input} value={searchBarValue} 
      onChange={(e) => {
        const value = e.target.value;
        setSearchBarValue(value);
      }}
        type="text" required="" placeholder="Search" id="search" />
        <div className={styles.fancyBg}></div>
        <div className={styles.search}>
          <svg id="svgSearch" viewBox="0 0 24 24" aria-hidden="true" className="r-14j79pv" style={{ width: '17px', display: 'block' }}>
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </div>
        <button className={styles.closeBtn} onClick={() => {handleResetSearch()}} type="reset"> 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
      </label>
    </form>
  </div>
  {/*------------------------------------ Dropdowns ------------------------------------------------*/}
  <div className={styles.flexContainerDropdowns}>
  <div className={styles.flexItemsDropdowns}>
    <div className="btn-group">
      <button className={styles.dropdownBtns} type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: 'violet', }}>
        Difficulty
        <svg className={styles.dropdownSvg} width={24} height={24} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="m4.594 8.912 6.553 7.646a1.126 1.126 0 0 0 1.708 0l6.552-7.646c.625-.73.107-1.857-.854-1.857H5.447c-.961 0-1.48 1.127-.853 1.857Z" />
</svg>
      </button>
      <ul className="dropdown-menu">
      <li><a onClick={() => handleDifficultyClick('all')} className="dropdown-item">All</a></li>
      <li><a onClick={() => handleDifficultyClick('easy')} className="dropdown-item">Easy</a></li>
      <li><a onClick={() => handleDifficultyClick('medium')} className="dropdown-item">Medium</a></li>
      <li><a onClick={() => handleDifficultyClick('hard')} className="dropdown-item">Hard</a></li>
      </ul>
    </div>
  </div>
  {/* -------------------------------- Status Dropdowns ---------------------------*/}
  <div className={styles.flexItemsDropdowns}>
    <div className="btn-group">
      <button className={styles.dropdownBtns} type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: 'violet' }}>
        Status
        <svg className={styles.dropdownSvg} width={24} height={24} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="m4.594 8.912 6.553 7.646a1.126 1.126 0 0 0 1.708 0l6.552-7.646c.625-.73.107-1.857-.854-1.857H5.447c-.961 0-1.48 1.127-.853 1.857Z" />
</svg>
      </button>
      <ul className="dropdown-menu">
        <li onClick={() => {
          setStatus('Solved');
          handleStatus('Solved');
          getFilteredQuizzes();
        }}><a className="dropdown-item" >Solved</a></li>

        <li onClick={() => {
          setStatus('To-Do');
          handleStatus('To-Do');
          getFilteredQuizzes();
        }} ><a className="dropdown-item" >To-Do</a></li>
      </ul>
    </div>
  </div>
  {/* Pick one */}
  <div className={styles.flexItemsDropdowns}>
<button type="button" className={styles.pickOnebtn}  onClick={() => getRandomInt()} >
  <svg style={{ backgroundColor: 'yellowgreen', borderRadius: '50%', padding: '5px', height: '28px', width: '28px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.pickOneSvg} viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path> <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" ></path></svg>
  <span className={styles.pickOneLetter}>Pick One </span>
</button>
</div>
</div>
</div>
{/*---------------------------------------- Card------------------------------------------------- */}
<div className={styles.parentcardContainer}>
        <div className={styles.parent}>
          {getFilteredQuizzes()?.length > 0 ? (
  getFilteredQuizzes().map((cards, index) => {
          let taggg =  cards.keyword;
          let tag = cards.tag;
          if (tag === 'fill-ups') tag = 'fillups'
          if (tag === 'guess-by-image') tag = 'guessByImage'
          const chapterStats = userCredentials?.userAllChapterPoints?.[tag]?.[taggg];
          
  return (
    <div className={styles.div1} key={index}>
      <div className={styles.cardContainerQuiz}>
        <div className="card" style={{ borderRadius: '10%' }}>
          <div className={styles.imageContainer}>
            <img src={cards.image} className={styles.quizImg} alt="..." />
            <div className={styles.difficultyContainer}>
              <img
                className={styles.difficulty}
                width="50"
                height="50"
                src="https://img.icons8.com/bubbles/100/brain.png"
                alt="brain"
              />
              {cards.difficulty}
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{cards.title} {chapterStats?.isCompleted === undefined ? '' : chapterStats?.isCompleted ? <svg width={24} height={24} fill="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-11.152a1.2 1.2 0 0 0-1.696-1.696L10.8 12.703l-1.552-1.551a1.2 1.2 0 0 0-1.696 1.696l2.4 2.4a1.2 1.2 0 0 0 1.696 0l4.8-4.8Z" clipRule="evenodd" />
</svg> : <svg width={24} height={24} fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M21.6 12a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 19.2 0Zm-8.4 4.8a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM12 6a1.2 1.2 0 0 0-1.2 1.2V12a1.2 1.2 0 1 0 2.4 0V7.2A1.2 1.2 0 0 0 12 6Z" clipRule="evenodd" />
</svg> }</h5>
            <div className={styles.innerParent}>
              <div className={styles.innerDiv2}>Coins</div>
              <div className={styles.innerDiv1}>High Score</div>
              <div className={styles.innerDiv3}>Attempts</div>

              <div className={styles.innerDiv4}>
                {chapterStats?.coins ?? '-'}
              </div>
              <div className={styles.innerDiv5}>
                {chapterStats?.highScore ?? '-'}
              </div>
              <div className={styles.innerDiv6}>
                {chapterStats?.attempts ?? '-'}
              </div>
            </div>
            <br />
            <Link
              to={`/birds/${cards.tag}/${cards.id}`}
              onClick={() => {setLoader(true)}}
              style={{
                backgroundColor: 'green',
                padding: '10px 15px',
                color: 'white',
                textDecoration: 'none',
              }}
              className="btn btn-primary"
            >
              Let's Start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
})


) : (
  <p style={{ textAlign: 'center', marginTop: '20px' }}>No quizzes found.</p>
)}
        </div>
      </div>
    </>
  );
}
export default Birds;
