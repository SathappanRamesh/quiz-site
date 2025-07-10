import  styles from '../src/commonQuize.module.css'
import { useState, useRef, useEffect, useMemo} from 'react';
import {  useNavigate, Link,useParams  } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ScienceFillUps() {
  const [blockThePage, setBlockThePage] = useState(true);
  const [showThePage, setShowThePage] = useState(true);
  const [showBlurEffect, setShowBlurEffect] = useState(true);
  const navigate = useNavigate();
  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
      this.prev = null;
      this.len = 0;
    }
  }
  
  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.current = null;
    }
  
    insert(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        this.current = this.head;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      this.len++;
    }
  
    traverseForward() {
      if (this.current && this.current.next) {
        this.current = this.current.next;
        return this.current.data;
      }
      return null;
    }
  
    traverseBackward() {
      if (this.current && this.current.prev) {
        this.current = this.current.prev;
        return this.current.data;
      }
      return null;
    }    

  }

  // Quiz: Fill ups
const fillUpsQuestions = useMemo(() => ({
  easy: [
    // science/fill-ups/1
    { id: 1, question: "1. Which animal is known as the 'Ship of the Desert'?", correctAnswer: "camel", tag: 'science/fill-ups/1'},
    { id: 2, question: "2. How many days are there in a week?", correctAnswer: "seven", tag: 'science/fill-ups/1' },
    { id: 3, question: "3. How many hours are there in a day?", correctAnswer: "twenty four", tag: 'science/fill-ups/1' },
    { id: 4, question: "4. How many letters are there in the English alphabet?", correctAnswer: "twenty six", tag: 'science/fill-ups/1' },
    { id: 5, question: "5.Rainbow consists of how many colours?", correctAnswer: "seven", tag: 'science/fill-ups/1' },
    { id: 6, question: "6. How many days are there in a year?", correctAnswer: "three sixty five", tag: 'science/fill-ups/1' },
    { id: 7, question: "7. How many minutes are there in an hour?", correctAnswer: "sixty", tag: 'science/fill-ups/1' },
    { id: 8, question: "8. How many seconds are there in a minute?", correctAnswer: "sixty", tag: 'science/fill-ups/1' },
    { id: 9, question: "9. How many seconds make one hour?", correctAnswer: "three thousand and six hundred", tag: 'science/fill-ups/1' },
    { id: 10, question: "10. Baby frog is known as", correctAnswer: "tadpole", tag: 'science/fill-ups/1' },
    { id: 11, question: "11. How many consonants are there in the English alphabet?", correctAnswer: "twenty one", tag: 'science/fill-ups/1' },
    { id: 12, question: "12. How many vowels are there in the English alphabet and name them?", correctAnswer: "five", tag: 'science/fill-ups/1' },
    // science/fill-ups/2
    { id:1,   question: "Which animal is known as the king of the jungle?", correctAnswer: "lion", tag: 'science/fill-ups/2' },
    { id:2,   question: "Name the National bird of India?", correctAnswer: "peacock", tag: 'science/fill-ups/2' },
    { id:3,   question: "Name the National animal of India?", correctAnswer: "tiger", tag: 'science/fill-ups/2' },
    { id:4,   question: "What is the National Anthem of India?", correctAnswer: "jana gana mana", tag: 'science/fill-ups/2' },
    { id:5,   question: "Name the national flower of India?", correctAnswer: "lotus", tag: 'science/fill-ups/2' },
    { id:6,   question: "Name the National fruit of India?", correctAnswer: "mango", tag: 'science/fill-ups/2' },
    { id:7,   question: "What is the National song of India?", correctAnswer: "vande maataram", tag: 'science/fill-ups/2' },
    { id:8,   question: "Who designed the National Flag of India?", correctAnswer: "pingali venkayya", tag: 'science/fill-ups/2' },
    { id:9,   question: "Name the National game of India?", correctAnswer: "hockey", tag: 'science/fill-ups/2' },
    { id: 10, question: "Name the National tree of India?", correctAnswer: "banyan tree", tag: 'science/fill-ups/2' },
    { id: 11, question: "Name the National river of India?", correctAnswer: "ganga", tag: 'science/fill-ups/2' },
    { id: 12, question: "Name the National Reptile of India?", correctAnswer: "king cobra", tag: 'science/fill-ups/2' },
    // science/fill-ups/3
    { id:1,   question: "What is the capital of India?", correctAnswer: "new delhi", tag: 'science/fill-ups/3' },
    { id:2,   question: "Name the biggest continent in the world?", correctAnswer: "Asia", tag: 'science/fill-ups/3' },
    { id:3,   question: "How many continents are there in the world?", correctAnswer: "seven", tag: 'science/fill-ups/3' },
    { id:4,   question: "What is the color that start with 'y' and end with 'w'?", correctAnswer: "yellow", tag: 'science/fill-ups/3' },
    { id:5,   question: "Which is the smallest month of the year?", correctAnswer: "february", tag: 'science/fill-ups/3' },
    { id:6,   question: "Name the house made of ice?", correctAnswer: "igloo", tag: 'science/fill-ups/3' },
    { id:7,   question: "Which colour symbolises peace?", correctAnswer: "white", tag: 'science/fill-ups/3' },
    { id:8,   question: "Name the largest mammal?", correctAnswer: "blue whale", tag: 'science/fill-ups/3' },
    { id:9,   question: "Sun rises in the ", correctAnswer: "east", tag: 'science/fill-ups/3' },
    { id: 10, question: "How many sides are there in a triangle?", correctAnswer: "three", tag: 'science/fill-ups/3' },
    { id: 11, question: "Name the largest planet of our Solar System?", correctAnswer: "jupiter", tag: 'science/fill-ups/3' },
    { id: 12, question: "Name the smallest planet of our Solar System?", correctAnswer: "mercury", tag: 'science/fill-ups/3' },
  ],
  medium: []
}), []);


  
  const { tag, id } = useParams();
  const isValidUrl = `science/${tag}/${id}`;
  const questionsList = useRef(new DoublyLinkedList());
  const [result, setResult] = useState(null);
  let [maxNoOfMark,setMaxNoOfMark] = useState(undefined);

  let [difficulty, setDifficulty] = useState(null);
  let [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  let [timer, setTimer] = useState();
  let displayMinutes = Math.floor(timer / 60),
    displaySeconds = timer % 60;
    let [selectedAnswers, setSelectedAnswers] = useState({});
   const [selectedAnswer, setSelectedAnswer] = useState(null);
     const [currentInputValue, setCurrentInputValue] = useState('');
    const [showResultCard, setShowResultCard] = useState(false);
    
    const [circle, setCircle] = useState(false);
  const [stateProgress, setStateProgress] = useState(0);
  const [loader, setLoader] = useState(false);
  const [toggleCirclColorChange, setToggleCirclColorChange] = useState(false);
  const [progress, setProgress] = useState({ 
    answers: {},
    time: 0,
    currentQuestion: null,
    subProgress: 0,
    tag: null,
   });

  // Function to save progress to the server
const saveProgressToServer = async () => {
  try {
    const userId = user?._id;
    if (!userId) {
      console.warn("User not found, skipping progress save.");
      return;
    } 
    // Store the current user's progress
    progress.time = timer;
    progress.answers = selectedAnswers; 
    progress.subProgress = stateProgress;
    progress.tag = isValidUrl;
    await axios.post("http://localhost:3000/api/user-temp-progress", { userId, progress });
    console.log('temp progress Saved');
    
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

      useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setCurrentQuestion(false);
            } else {
                setCircle(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

  // Trigger function for whether user making tab switches or not
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      handleSubmitAns();
      toast.error('Tab switched, you violated the game rules');
      console.log('Switched');    }
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);    
  };
 }, [user?._id]);
 let currentRetrieveTime = useRef(120);

 useEffect(() => {  
  const fetchProgress = async () => {
    try {
            const userId = user?._id;
      const $FSA_auth_token = localStorage.getItem(`$FSA_auth_token`);

      if (!$FSA_auth_token) {
        console.warn("Auth token not found");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/retrieve-user-temp-progress", {
        headers: {
          Authorization: `Bearer ${$FSA_auth_token}`,
        },});

      const userProgress = response.data.find((progress) => progress.quizId === isValidUrl);

      if (tag === 'fill-ups') {
      if (userProgress) {
        setTimer(userProgress.time);        
        setSelectedAnswers(userProgress.answers);
        setStateProgress(userProgress.subProgress);

        console.log(timer, selectedAnswers,stateProgress);
        console.log('temp prog retrieved');
        currentRetrieveTime.current = userProgress.time;
      } else {
        console.warn("No progress found for the current quiz");
      }
    }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }    
  };
  fetchProgress();
}, [isValidUrl]);

useEffect(() => {
  if (!user || timer === undefined) return;
  const intervalId = setInterval(() => {
    console.log(timer);
    
    setTimer((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        clearInterval(intervalId);
        return 0;
      }
    });
  }, 1000);
  return () => clearInterval(intervalId);
}, [timer]);

// Progress
let total = 12;
const percentage = (stateProgress / total) * 100,
      radius = 50,
      circumference = 2 * Math.PI * radius,
      offset = circumference - (percentage / 100) * circumference;

useEffect(() => {
  // console.log(questionsList.current.);

  const fillUpsCollection = [];
  for (const key in fillUpsQuestions) {
    fillUpsQuestions[key].forEach((curr) => {
      if (!fillUpsCollection.includes(curr.tag)) {
        fillUpsCollection.push(curr.tag);
      }      
    });
  }

  if (fillUpsCollection.includes(isValidUrl)) {
    for (const key in fillUpsQuestions) {
      fillUpsQuestions[key].forEach((curr) => {
        if (curr.tag === isValidUrl) {
          setDifficulty(key);
          questionsList.current.insert(curr);
        }
      });
    }

    if (questionsList.current.head) {
      setCurrentQuestion(questionsList.current.head.data);
      setLoading(false);
    } else {
      alert('No questions there');
    }
  } else {
    navigate('/not-found');
  }
},[isValidUrl, fillUpsQuestions, navigate]);

useEffect(() => { 
  if (currentQuestion && currentQuestion.id !== undefined) {
    setSelectedAnswer(selectedAnswers?.[currentQuestion.id] || null);    
  }

for (const key in selectedAnswers) {
  const element = document.getElementById(key);
  if (element) {
    element.style.backgroundColor = "#529c24";
  }
}


}, [ selectedAnswers,currentQuestion]);

const handleBlockingPage = () => {
  const userId = user?._id;
  setShowBlurEffect(false);
  setBlockThePage(false);
  setTimer(currentRetrieveTime.current);
  console.log(userId);
  
  const saveAttempts = async () => {
    try {
      await axios.post("http://localhost:3000/api/count-attempts", { userId, tag, isValidUrl});
    } catch (error) {
      console.error("Error saving Count:", error);
    }
  };
  saveAttempts();
}; 

// Trigger save on page refresh or navigation away
useEffect(() => {
  const handleUnload = async (event) => {
    saveProgressToServer();
    event.preventDefault();
  };

  window.addEventListener("beforeunload", handleUnload);
  return () => {
    window.removeEventListener("beforeunload", handleUnload);
  };
}, );
const clearForm = async () => {
    setLoader(true);
  let userId = user?._id;
    setSelectedAnswers({});
    setSelectedAnswer(null);
    setStateProgress(0);
    for (const key in selectedAnswers) {
    document.getElementById(key).style.backgroundColor = "#432fc0";
    }
     try {
      await axios.post('http://localhost:3000/api/clear-form', {userId, isValidUrl});
      toast.info('Form Cleared');
    } catch (error) {
      console.log( "Error saving form:",error);
    } finally {
        setLoader(false);
    }
};

const handleNavigateQuestions = (qNo) => {
  const list = questionsList.current;
  let node = list.head;
  while (node) {
    if (node.data.id === qNo) {
      list.current = node; 
      setCurrentQuestion(node.data);
      return;
    }
    node = node.next;
  }
};
const handleNext = () => {
  const nextQuestion = questionsList.current.traverseForward();
  
  if (nextQuestion) {
    setCurrentQuestion(nextQuestion);
    setSelectedAnswer(selectedAnswers[nextQuestion.id] || null);
    setCurrentInputValue('');
  } else {
    alert('No more questions!');
  }
};

const handlePrev = () => {
  const prevQuestion = questionsList.current.traverseBackward();
  console.log(selectedAnswers);
  
  if (prevQuestion) {
    setCurrentQuestion(prevQuestion);
    setSelectedAnswer(selectedAnswers[prevQuestion.id] || null);
  } else {
    alert('No previous questions!');
  }
};

// Total correct answers validation
const handleSubmitAns = () => {
  setLoader(true);
  const userAnswers = selectedAnswers; 
  const correctAnswers = [];
  let curr = questionsList.current.head;
  for (let i = 1; i <= 12; i++) {
    correctAnswers.push(curr.data);
    curr = curr.next;
  }
  console.log(correctAnswers);
  console.log(userAnswers);
  let userFinalResult = 0;
  for (const key in userAnswers) {
    correctAnswers.forEach((curr) => {      
      if (key == curr.id && curr.correctAnswer === userAnswers[key]) {
        userFinalResult++;
      }
    });
  }
  const userId = user?._id;

  const saveResult = async () => {
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
      let currentDate = new Date().getDate();
      let currentMonth = new Date().getMonth();
      currentMonth = monthNames[currentMonth];
      let currentYear = new Date().getFullYear();
      let currentSubmittedDate = `${currentDate}/${currentMonth}/${currentYear}`
      let topic = 'fillups'
      let activityDetails = {
        'getMonth': currentMonth,
        'getYear': currentYear,
        'fullDate': currentSubmittedDate
      }
    try {
      await axios.post('http://localhost:3000/api/save-game-info', {userId, userFinalResult, userAnswers, isValidUrl, tag, difficulty, activityDetails, topic});
      console.log('User Game Info saved successfully');
            if (difficulty === 'easy'){
        setResult(userFinalResult*2);  
        setMaxNoOfMark(2*12);
      } 
      if (difficulty === 'medium'){
        setResult(userFinalResult*4);
        setMaxNoOfMark(4*12);
      } 
      if (difficulty === 'hard'){
        setResult(userFinalResult*6);
        setMaxNoOfMark(6*12);
      } 
      setShowResultCard(true);
    } catch (error) {
      console.log( "Error saving result:",error);
    } finally {
        setLoader(false);
    }
  }
  saveResult();
  const deleteTempProgress = async() => {
      let userId = user?._id;
      console.log(userId,isValidUrl);
      
      try {
        await axios.post('http://localhost:3000/api/delete-temp-progress', {userId,isValidUrl
      })
        console.log('Success delete');
  
      } catch (error) {
        console.log('Error deleting temp progress:', error);
      }
    }
    deleteTempProgress();
};

if (loading) {
  return <div>------------------Not Found</div>
}
      console.log(selectedAnswer);
      console.log(currentInputValue);

  return (
    <>
    <ToastContainer/>
            {loader && (
        <div className={styles.loader90}>
          <div className={`${styles.load2}`}></div>
        </div>
            )}
            {showResultCard  && (
                        <div className={styles.overlay}>
                          <div className={styles.overlayContent}></div>
        <div className={styles.centeredContainer}>
        <div className={styles.resultCardGBI}> 
          <Link to='/science/all'><button type="button" onClick={() => setShowResultCard(false)} className={styles.dismissGBI}>×</button> </Link> 
          <div className={styles.headerGBI}> 
            <div className={styles.resultCardImageGBI}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path> </g></svg>
              </div> 
              <div className={styles.resultCardContentGBI}>
                 <span className={styles.resultCardTitleGBI}>Validated!</span> 
             <h2 className={styles.resultCardMessageGBI}> You got {result}/{maxNoOfMark} </h2> 
                 </div> 
                 <div className={styles.resultCardActionsGBI}>
        <Link to="/science/all"><button type="button" className={styles.okresultCardGBI}>Okay</button></Link>
                    </div> 
                    </div> 
                    </div>
                    </div>
        </div>
        )}
    <div className={styles.gkQuestionsBody}>
       {showBlurEffect && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
{/*----------------------------------- Carousel---------------------------------------------- */}
       <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
       <div className="carousel-indicators">
         <button type="button"data-bs-target="#carouselExampleIndicators"data-bs-slide-to="0"className="active"aria-current="true"aria-label="Slide 1"></button>
        <button type="button"data-bs-target="#carouselExampleIndicators"data-bs-slide-to="1"aria-label="Slide 2"></button>
        <button type="button"data-bs-target="#carouselExampleIndicators"data-bs-slide-to="2"aria-label="Slide 3"></button>
      </div> 
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/public/images/carousel_Blocker_proj.png" className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="/public/images/carousel_Blocker_proj.png" className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="/public/images/carousel_Blocker_proj.png" className="d-block w-100" alt="Slide 3" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button"data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <div className={styles.carouselBtnContainer}>
<button  className={styles.startBtn} onClick={() => handleBlockingPage()}>
<span className={styles.startText}>Let&rsquo;s Start</span>
  <span className={styles.startSvg}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="20"
      viewBox="0 0 38 15"
      fill="none"
    >
      <path
        fill="white"
        d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
      ></path>
    </svg>
  </span>
</button>
<Link to='/science'><button className={styles.backBtn}>
<span>Back</span>
  <svg className={styles.backSvg} style={{transform: "scaleX(-1)"}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
</button></Link>
</div>
            </div>
          </div>
        )}

{/* -----------------------------------------------Circles ------------------------------------*/}
      {showThePage && (
<div className={styles.parent111}>
         {circle && (
<div className={styles.div111}>
  <div className={styles.container}>
                <h3 className={styles.stylishHeading} tabIndex={-1}>Science {tag}-{id}</h3>
    
      <div className={styles.row}>
        <div id='1' onClick={() => handleNavigateQuestions(1)} className={`${styles.circle} ${toggleCirclColorChange ? styles.red : styles.blue}`}>1</div>
        <div id='2' onClick={() => handleNavigateQuestions(2)} className={styles.circle}>2</div>
        <div id='3' onClick={() => handleNavigateQuestions(3)} className={styles.circle}>3</div>
      </div>
      <div className={styles.row}>
        <div id='4' onClick={() => handleNavigateQuestions(4)} className={styles.circle}>4</div>
        <div id='5' onClick={() => handleNavigateQuestions(5)} className={styles.circle}>5</div>
        <div id='6'onClick={() => handleNavigateQuestions(6)} className={styles.circle}>6</div>
      </div>
      <div className={styles.row}>
        <div id='7' onClick={() => handleNavigateQuestions(7)} className={styles.circle}>7</div>
        <div id='8' onClick={() => handleNavigateQuestions(8)} className={styles.circle}>8</div>
        <div id='9' onClick={() => handleNavigateQuestions(9)} className={styles.circle}>9</div>
      </div>
      <div className={styles.row}>
        <div id='10' onClick={() => handleNavigateQuestions(10)} className={styles.circle}>10</div>
        <div id='11' onClick={() => handleNavigateQuestions(11)} className={styles.circle}>11</div>
        <div id='12' onClick={() => handleNavigateQuestions(12)} className={styles.circle}>12</div>
      </div>
    </div>
</div>
       )}

<div className={styles.div333}>
          {!circle && (
                       <h3 className={styles.stylishHeading}>Science {tag}-{id}</h3>
          )}
  <div className={styles.div333SubContainer}>
    {/* ----------------------------------- Timer --------------------------------------- */}
<div className={styles.outerTimerBox}>
  <div className={styles.parentTimerContainer}>
    <div className={styles.timerContainer}>
      <div className={styles.loader}>
        <span className={`${styles.hour} ${styles.span}`}></span>
        <span className={`${styles.min} ${styles.span}`}></span>
        <span className={`${styles.circel} ${styles.span}`}></span>
      </div>
    </div>
    <h3 className={styles.digitTimer}> {!isNaN(displayMinutes) ?`${displayMinutes}`: "0"}:{ !isNaN(displaySeconds) ? `${displaySeconds}` : "0"}</h3>
  </div>
</div>
<div></div>
<div></div>
<div className={styles.progressContainer}>
      <svg className={styles.progressCircle} width="120" height="120">
        <circle
          className={styles.progressBackground}
          cx="60"
          cy="60"
          r={radius}
        />
        <circle
          className={styles.progressBar}
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.progressText}>{`${stateProgress}/${total}`}</div>
    </div>
    </div>
<br />
  <div>
{/*----------------------------------- Question Display ------------------------------------------ */}
<div className={styles.inputContainerFillUp}>
 <div className={styles.questionWrapper}><h4 className={styles.questionWrapper}> 
    {currentQuestion.question} <input
      value={selectedAnswers?.[currentQuestion?.id] || ""}
  onChange={(e) => {
    const value = e.target.value;
    // ✅ Update the selectedAnswers state
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    // ✅ Only increment progress if the current question hasn't been answered before
    console.log(currentQuestion.id);
    
    if (currentQuestion?.id !== undefined && !Object.hasOwn(selectedAnswers, currentQuestion.id)) {
      setStateProgress((count) => count + 1);
      console.log("Progress incremented");
    }
  }}
     placeholder='*Answer' type="text" id="input" required=""></input>
  <div className={styles.underlineFillUps}></div>
  </h4></div>
</div>
</div>
{/*------------------------------------ Buttons --------------------------------------*/}
<div className={styles.questionBtnContainer}>
    <button onClick={() => handlePrev()} style={{gap: '6px'}} className={`${styles.btnPrev} ${styles.button}`} id='pre'>
    <svg className={styles.svg} style={{transform: "scaleX(-1)"}} xmlns="http://www.w3.org/2000/svg" fill="none"viewBox="0 0 74 74"height="34"width="34">
    <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle><path  fill="black"  d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"></path></svg>
  Prev</button>
    <button onClick={handleSubmitAns} style={{backgroundColor: 'rgb(236, 172, 24)'}} className={`${styles.btnSubmit} ${styles.button}`}>Save & Submit</button>
    <button onClick={() => handleNext()} className={`${styles.btnNext} ${styles.button}`} id='next'>Next
    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" fill="none"viewBox="0 0 74 74"height="34"width="34">
    <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
    <path
      fill="black"
      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
    ></path>
  </svg>
    </button>
    <button className={`${styles.btnPrev} ${styles.button}`} onClick={() => clearForm()} >clear form
      <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.12 12.548a4 4 0 0 0-3.07 3.86v3.11a.47.47 0 0 0 .48.48l3.24-.06a3.78 3.78 0 0 0 3.44-2.2 3.65 3.65 0 0 0-4.09-5.19Z" />
  <path d="M19.26 4.46a2.14 2.14 0 0 0-2.88.21L10 11.08a.47.47 0 0 0 0 .66L12.25 14a.47.47 0 0 0 .66 0l6.49-6.47a2.06 2.06 0 0 0 .6-1.47 2 2 0 0 0-.74-1.6Z" />
</svg>
    </button>
</div>
</div>
</div>
      )}
</div>

    </>
  );
}

export default ScienceFillUps;