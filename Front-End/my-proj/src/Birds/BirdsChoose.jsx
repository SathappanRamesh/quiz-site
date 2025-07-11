import  styles from '/src/commonQuize.module.css'
import { useState, useRef, useEffect, useMemo} from 'react';
import {  useNavigate, Link,useParams} from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BirdsChoose() {
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
  // Quiq: choose
  const chooseQuestions = useMemo(() => ({
    easy: [
    // birds/choose/1
    { id: 1, qNo: 1, question: '1. In what year did the Great October Socialist Revolution take place?', options: { a: '1917', b: '1923', c: '1914', d: '1920' }, correctAnswer: 'a', tag: 'birds/choose/1', difficulty: 'easy'},
    { id: 2, qNo: 2, question: '2. What is the largest lake in the world?', options: { a: 'Caspian Sea', b: 'Baikal', c: 'Lake Superior', d: 'Ontario' }, correctAnswer: 'a', tag: 'birds/choose/1', difficulty: 'easy' },
    { id: 3, qNo: 3, question: '3. Which planet in the solar system is known as the “Red Planet”?', options: { a: 'Venus', b: 'Earth', c: 'Mars', d: 'Jupiter' }, correctAnswer: 'c', tag: 'birds/choose/1', difficulty: 'easy'  },
    { id: 4, qNo: 4, question: '4. Who wrote the novel “War and Peace”?', options: { a: 'Anton Chekhov', b: 'Fyodor Dostoevsky', c: 'Leo Tolstoy', d: 'Ivan Turgenev' }, correctAnswer: 'c', tag: 'birds/choose/1', difficulty: 'easy'  },
    { id: 5, qNo: 5, question: '5. What is the capital of Japan?', options: { a: 'Beijing', b: 'Tokyo', c: 'Seoul', d: 'Bangkok' }, correctAnswer: 'b', tag: 'birds/choose/1', difficulty: 'easy'  },
    { id: 6, qNo: 6, question: '6. Which river is the longest in the world?', options: { a: 'Amazon', b: 'Mississippi', c: 'Nile', d: 'Yangtze' }, correctAnswer: 'c', tag: 'birds/choose/1', difficulty: 'easy'  },
    { id: 7, qNo: 7, question: '7. What gas is used to extinguish fires?', options: { a: 'Oxygen', b: 'Nitrogen', c: 'Carbon dioxide', d: 'Hydrogen' }, correctAnswer: 'c', tag: 'birds/choose/1', difficulty: 'easy'  },
    { id: 8, qNo: 8, question: '8. What animal is the national symbol of Australia?', options: { a: 'Kangaroo', b: 'Koala', c: 'Emu', d: 'Crocodile' }, correctAnswer: 'a', tag: 'birds/choose/1', difficulty: 'easy'  },
    { id: 9, qNo: 9, question: '9. Which of the following planets is not a gas giant?', options: { a: 'Mars', b: 'Jupiter', c: 'Saturn', d: 'Uranus' }, correctAnswer: 'a', tag: 'birds/choose/1', difficulty: 'easy'  },
    { id: 10, qNo: 10, question:'10. What is the name of the process by which plants convert sunlight into energy?', options: { a: 'Respiration', b: 'Photosynthesis', c: 'Oxidation', d: 'Evolution' }, correctAnswer: 'b', tag: 'birds/choose/1', difficulty: 'easy' },
    { id: 11, qNo: 11, question: '11. What chemical element is designated as “Hg”?', options: { a: 'Silver', b: 'Tin', c: 'Copper', d: 'Mercury' }, correctAnswer: 'd', tag: 'birds/choose/1', difficulty: 'easy' },
    { id: 12, qNo: 12, question: '12.   In what year was the first international modern Olympiad held?', options: { a: '1896', b: '1900', c: '1912', d: '1924' }, correctAnswer: 'a', tag: 'birds/choose/1', difficulty: 'easy' },
    
    // birds/choose/2
    { id:1,   qNo: 1, question: '1. In what year did the Great October Socialist Revolution take place?', options: { a: '1917', b: '1923', c: '1914', d: '1920' }, correctAnswer: 'a', tag: 'birds/choose/2', difficulty: 'easy'},
    { id:2,   qNo: 2, question: '2. What is the largest lake in the world?', options: { a: 'Caspian Sea', b: 'Baikal', c: 'Lake Superior', d: 'Ontario' }, correctAnswer: 'a', tag: 'birds/choose/2', difficulty: 'easy' },
    { id:3,   qNo: 3, question: '3. Which planet in the solar system is known as the “Red Planet”?', options: { a: 'Venus', b: 'Earth', c: 'Mars', d: 'Jupiter' }, correctAnswer: 'c', tag: 'birds/choose/2', difficulty: 'easy'  },
    { id:4,   qNo: 4, question: '4. Who wrote the novel “War and Peace”?', options: { a: 'Anton Chekhov', b: 'Fyodor Dostoevsky', c: 'Leo Tolstoy', d: 'Ivan Turgenev' }, correctAnswer: 'c', tag: 'birds/choose/2', difficulty: 'easy'  },
    { id:5,   qNo: 5, question: '5. What is the capital of Japan?', options: { a: 'Beijing', b: 'Tokyo', c: 'Seoul', d: 'Bangkok' }, correctAnswer: 'b', tag: 'birds/choose/2', difficulty: 'easy'  },
    { id:6,   qNo: 6, question: '6. Which river is the longest in the world?', options: { a: 'Amazon', b: 'Mississippi', c: 'Nile', d: 'Yangtze' }, correctAnswer: 'c', tag: 'birds/choose/2', difficulty: 'easy'  },
    { id:7,   qNo: 7, question: '7. What gas is used to extinguish fires?', options: { a: 'Oxygen', b: 'Nitrogen', c: 'Carbon dioxide', d: 'Hydrogen' }, correctAnswer: 'c', tag: 'birds/choose/2', difficulty: 'easy'  },
    { id:8,   qNo: 8, question: '8. What animal is the national symbol of Australia?', options: { a: 'Kangaroo', b: 'Koala', c: 'Emu', d: 'Crocodile' }, correctAnswer: 'a', tag: 'birds/choose/2', difficulty: 'easy'  },
    { id:9,   qNo: 9, question: '9. Which of the following planets is not a gas giant?', options: { a: 'Mars', b: 'Jupiter', c: 'Saturn', d: 'Uranus' }, correctAnswer: 'a', tag: 'birds/choose/2', difficulty: 'easy'  },
    { id: 10, qNo: 10, question:'10. What is the name of the process by which plants convert sunlight into energy?', options: { a: 'Respiration', b: 'Photosynthesis', c: 'Oxidation', d: 'Evolution' }, correctAnswer: 'b', tag: 'birds/choose/2', difficulty: 'easy' },
    { id: 11, qNo: 11, question: '11. What chemical element is designated as “Hg”?', options: { a: 'Silver', b: 'Tin', c: 'Copper', d: 'Mercury' }, correctAnswer: 'd', tag: 'birds/choose/2', difficulty: 'easy' },
    { id: 12, qNo: 12, question: '12.   In what year was the first international modern Olympiad held?', options: { a: '1896', b: '1900', c: '1912', d: '1924' }, correctAnswer: 'a', tag: 'birds/choose/2', difficulty: 'easy' },

    // birds/choose/3
    { id:1,   qNo: 1, question: '1. In what year did the Great October Socialist Revolution take place?', options: { a: '1917', b: '1923', c: '1914', d: '1920' }, correctAnswer: 'a', tag: 'birds/choose/3', difficulty: 'easy'},
    { id:2,   qNo: 2, question: '2. What is the largest lake in the world?', options: { a: 'Caspian Sea', b: 'Baikal', c: 'Lake Superior', d: 'Ontario' }, correctAnswer: 'a', tag: 'birds/choose/3', difficulty: 'easy' },
    { id:3,   qNo: 3, question: '3. Which planet in the solar system is known as the “Red Planet”?', options: { a: 'Venus', b: 'Earth', c: 'Mars', d: 'Jupiter' }, correctAnswer: 'c', tag: 'birds/choose/3', difficulty: 'easy'  },
    { id:4,   qNo: 4, question: '4. Who wrote the novel “War and Peace”?', options: { a: 'Anton Chekhov', b: 'Fyodor Dostoevsky', c: 'Leo Tolstoy', d: 'Ivan Turgenev' }, correctAnswer: 'c', tag: 'birds/choose/3', difficulty: 'easy'  },
    { id:5,   qNo: 5, question: '5. What is the capital of Japan?', options: { a: 'Beijing', b: 'Tokyo', c: 'Seoul', d: 'Bangkok' }, correctAnswer: 'b', tag: 'birds/choose/3', difficulty: 'easy'  },
    { id:6,   qNo: 6, question: '6. Which river is the longest in the world?', options: { a: 'Amazon', b: 'Mississippi', c: 'Nile', d: 'Yangtze' }, correctAnswer: 'c', tag: 'birds/choose/3', difficulty: 'easy'  },
    { id:7,   qNo: 7, question: '7. What gas is used to extinguish fires?', options: { a: 'Oxygen', b: 'Nitrogen', c: 'Carbon dioxide', d: 'Hydrogen' }, correctAnswer: 'c', tag: 'birds/choose/3', difficulty: 'easy'  },
    { id:8,   qNo: 8, question: '8. What animal is the national symbol of Australia?', options: { a: 'Kangaroo', b: 'Koala', c: 'Emu', d: 'Crocodile' }, correctAnswer: 'a', tag: 'birds/choose/3', difficulty: 'easy'  },
    { id:9,   qNo: 9, question: '9. Which of the following planets is not a gas giant?', options: { a: 'Mars', b: 'Jupiter', c: 'Saturn', d: 'Uranus' }, correctAnswer: 'a', tag: 'birds/choose/3', difficulty: 'easy'  },
    { id: 10, qNo: 10, question:'10. What is the name of the process by which plants convert sunlight into energy?', options: { a: 'Respiration', b: 'Photosynthesis', c: 'Oxidation', d: 'Evolution' }, correctAnswer: 'b', tag: 'birds/choose/3', difficulty: 'easy' },
    { id: 11, qNo: 11, question: '11. What chemical element is designated as “Hg”?', options: { a: 'Silver', b: 'Tin', c: 'Copper', d: 'Mercury' }, correctAnswer: 'd', tag: 'birds/choose/3', difficulty: 'easy' },
    { id: 12, qNo: 12, question: '12.   In what year was the first international modern Olympiad held?', options: { a: '1896', b: '1900', c: '1912', d: '1924' }, correctAnswer: 'a', tag: 'birds/choose/3', difficulty: 'easy' },
  ],
    medium : [ 
      { id: 1, question: '1. Which river is the longest in the world?', options: { a: 'Amazon', b: 'Mississippi', c: 'Nile', d: 'Yangtze' }, correctAnswer: 'c', tag: 'birds/choose/4',difficulty: 'medium' },
      { id: 2, question: '2. What gas is used to extinguish fires?', options: { a: 'Oxygen', b: 'Nitrogen', c: 'Carbon dioxide', d: 'Hydrogen' }, correctAnswer: 'c', tag: 'birds/choose/4',difficulty: 'medium' },
      { id: 3, question: '3. Which planet in the solar system is known as the “Red Planet”?', options: { a: 'Venus', b: 'Earth', c: 'Mars', d: 'Jupiter' }, correctAnswer: 'c', tag: 'birds/choose/4', difficulty: 'medium'  },
      { id: 4, question: '4. Who wrote the novel “War and Peace”?', options: { a: 'Anton Chekhov', b: 'Fyodor Dostoevsky', c: 'Leo Tolstoy', d: 'Ivan Turgenev' }, correctAnswer: 'c', tag: 'birds/choose/4', difficulty: 'medium' },
      { id: 5, question: '5. What is the capital of Japan?', options: { a: 'Beijing', b: 'Tokyo', c: 'Seoul', d: 'Bangkok' }, correctAnswer: 'b', tag: 'birds/choose/4', difficulty: 'medium'  },
      { id: 6, question: '6. Which river is the longest in the world?', options: { a: 'Amazon', b: 'Mississippi', c: 'Nile', d: 'Yangtze' }, correctAnswer: 'c', tag: 'birds/choose/4', difficulty: 'medium' },
      { id: 7, question: '7. What gas is used to extinguish fires?', options: { a: 'Oxygen', b: 'Nitrogen', c: 'Carbon dioxide', d: 'Hydrogen' }, correctAnswer: 'c', tag: 'birds/choose/4', difficulty: 'medium' },
      { id: 8, question: '8. What animal is the national symbol of Australia?', options: { a: 'Kangaroo', b: 'Koala', c: 'Emu', d: 'Crocodile' }, correctAnswer: 'a', tag: 'birds/choose/4', difficulty: 'medium'},
      { id: 9, question: '9. Which of the following planets is not a gas giant?', options: { a: 'Mars', b: 'Jupiter', c: 'Saturn', d: 'Uranus' }, correctAnswer: 'a', tag: 'birds/choose/4', difficulty: 'medium' },
      { id: 10, question:'10. What is the name of the process by which plants convert sunlight into energy?', options: { a: 'Respiration', b: 'Photosynthesis', c: 'Oxidation', d: 'Evolution' }, correctAnswer: 'b', tag: 'birds/choose/4',difficulty: 'medium' },
      { id: 11, question: '11. What chemical element is designated as “Hg”?', options: { a: 'Silver', b: 'Tin', c: 'Copper', d: 'Mercury' }, correctAnswer: 'd', tag: 'birds/choose/4', difficulty: 'medium' },
      { id: 12, question: '12.   In what year was the first international modern Olympiad held?', options: { a: '1896', b: '1900', c: '1912', d: '1924' }, correctAnswer: 'a', tag: 'birds/choose/4', difficulty: 'medium' },
    ],

hard : [
  { id: 1, question: '1. Which river is the longest in the world?', options: { a: 'Amazon', b: 'Mississippi', c: 'Nile', d: 'Yangtze' }, correctAnswer: 'c', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 2, question: '2. What gas is used to extinguish fires?', options: { a: 'Oxygen', b: 'Nitrogen', c: 'Carbon dioxide', d: 'Hydrogen' }, correctAnswer: 'c', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 3, question: '3. Which planet in the solar system is known as the “Red Planet”?', options: { a: 'Venus', b: 'Earth', c: 'Mars', d: 'Jupiter' }, correctAnswer: 'c', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 4, question: '4. Who wrote the novel “War and Peace”?', options: { a: 'Anton Chekhov', b: 'Fyodor Dostoevsky', c: 'Leo Tolstoy', d: 'Ivan Turgenev' }, correctAnswer: 'c', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 5, question: '5. What is the capital of Japan?', options: { a: 'Beijing', b: 'Tokyo', c: 'Seoul', d: 'Bangkok' }, correctAnswer: 'b', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 6, question: '6. Which river is the longest in the world?', options: { a: 'Amazon', b: 'Mississippi', c: 'Nile', d: 'Yangtze' }, correctAnswer: 'c', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 7, question: '7. What gas is used to extinguish fires?', options: { a: 'Oxygen', b: 'Nitrogen', c: 'Carbon dioxide', d: 'Hydrogen' }, correctAnswer: 'c', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 8, question: '8. What animal is the national symbol of Australia?', options: { a: 'Kangaroo', b: 'Koala', c: 'Emu', d: 'Crocodile' }, correctAnswer: 'a', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 9, question: '9. Which of the following planets is not a gas giant?', options: { a: 'Mars', b: 'Jupiter', c: 'Saturn', d: 'Uranus' }, correctAnswer: 'a', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 10, question:'10. What is the name of the process by which plants convert sunlight into energy?', options: { a: 'Respiration', b: 'Photosynthesis', c: 'Oxidation', d: 'Evolution' }, correctAnswer: 'b', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 11, question: '11. What chemical element is designated as “Hg”?', options: { a: 'Silver', b: 'Tin', c: 'Copper', d: 'Mercury' }, correctAnswer: 'd', tag: 'birds/choose/7', difficulty: 'hard' },
  { id: 12, question: '12. In what year was the first international modern Olympiad held?', options: { a: '1896', b: '1900', c: '1912', d: '1924' }, correctAnswer: 'a', tag: 'birds/choose/7', difficulty: 'hard' },
],

  }),[]); 

  
  const { tag, id } = useParams();
  const isValidUrl = `birds/${tag}/${id}`;
  let questionsList = useRef(new DoublyLinkedList());
  const [result, setResult] = useState(null);
  let [maxNoOfMark,setMaxNoOfMark] = useState(undefined);
  let [difficulty, setDifficulty] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  let [timer, setTimer] = useState();
  let displayMinutes = Math.floor(timer / 60),
    displaySeconds = timer % 60;
  let [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [stateProgress, setStateProgress] = useState(0);
  const [toggleCirclColorChange, setToggleCirclColorChange] = useState(false);
    const [showResultCard, setShowResultCard] = useState(false);
    const [circle, setCircle] = useState(false);
    const [loader, setLoader] = useState(false);
    const headingRef = useRef(null);
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
    progress.answers = selectedOptions; 
    progress.subProgress = stateProgress;
    progress.tag = isValidUrl;
    await axios.post("https://quiz-app-iazp.onrender.com/api/user-temp-progress", { userId, progress });
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
      headingRef.current.scrollIntoView({ behavior: 'smooth' });
      console.log('reffed');
      
    }}, []);

      useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth < 767) {
                setCurrentQuestion(false);
                console.log('below 768');                
            } else {
                setCircle(true);
                console.log('above 768');
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

      const response = await axios.get('https://quiz-app-iazp.onrender.com/myProfile', {
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

      const response = await axios.get("https://quiz-app-iazp.onrender.com/api/retrieve-user-temp-progress", {
        headers: {
          Authorization: `Bearer ${$FSA_auth_token}`,
        },});

      const userProgress = response.data.find((progress) => progress.quizId === isValidUrl);
      console.log(response.data,isValidUrl);
      if (tag === 'choose') {
      if (userProgress) {
        setTimer(userProgress.time);        
        setSelectedOptions(userProgress.answers);
        setStateProgress(userProgress.subProgress);
        currentRetrieveTime.current = userProgress.time;
        console.log('temporary prog saved');
      } else {
        console.warn("No progress found for the current quiz");
      }
    }

    } catch (error) {
      console.error("Error fetching progress:", error);
    }    
  };
  fetchProgress();
}, [tag,isValidUrl]);

useEffect(() => {
  if (!user || timer === undefined) return;
  const intervalId = setInterval(() => {
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
  const chooseCollection = [];
  for (const key in chooseQuestions) {
    chooseQuestions[key].forEach((curr) => {
      if (!chooseCollection.includes(curr.tag)) {
        chooseCollection.push(curr.tag);
      }      
    });
  }

  if (chooseCollection.includes(isValidUrl)) {
    for (const key in chooseQuestions) {
      chooseQuestions[key].forEach((curr) => {
        if (curr.tag === isValidUrl) {
          setDifficulty(key);
          questionsList.current.insert(curr);
        }
      });
    }

    if (questionsList.current.head) {
      setCurrentQuestion(questionsList.current.head.data);
      setLoading(false);
      console.log('goon');
      
    } else {
      alert('No questions there');
    }
  } else {
    navigate('/not-found');
  }
},[isValidUrl, chooseQuestions, navigate]);

useEffect(() => { 
  if (currentQuestion && currentQuestion.id !== undefined) {
    setSelectedOption(selectedOptions?.[currentQuestion.id] || null);
  }
if (window.innerWidth > 767) {
  for (const key in selectedOptions) {
    document.getElementById(key).style.backgroundColor = "#529c24";
    console.log('change color');
  }
}
}, [currentQuestion, selectedOptions]);

const handleBlockingPage = () => {
  const userId = user?._id;
  setShowBlurEffect(false);
  setBlockThePage(false);
  setTimer(currentRetrieveTime.current);
  console.log(userId);
  
  const saveAttempts = async () => {
    try {
      await axios.post("https://quiz-app-iazp.onrender.com/api/count-attempts", { userId, tag, isValidUrl});
    } catch (error) {
      console.error("Error saving progress:", error);
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
  console.log(userId);
    setSelectedOptions({});
    setSelectedOption(null);
    setStateProgress(0);
  for (const key in selectedOptions) {
    document.getElementById(key).style.backgroundColor = "#432fc0";
    toast.info('Form Cleared');
  }
     try {
      await axios.post('https://quiz-app-iazp.onrender.com/api/clear-form', {userId, isValidUrl});
    } catch (error) {
      console.log( "Error clearing form:",error);
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
      setSelectedOption(selectedOptions[node.data.id] || null);
      return;
    }
    node = node.next;
  }
};


const handleNext = () => {
  const nextQuestion = questionsList.current.traverseForward();

  if (nextQuestion) {
    setCurrentQuestion(nextQuestion);
    setSelectedOption(selectedOptions[nextQuestion.id] || null);
  }
};

const handlePrev = () => {
  const prevQuestion = questionsList.current.traverseBackward();
  console.log(selectedOptions);
  
  if (prevQuestion) {
    setCurrentQuestion(prevQuestion);
    setSelectedOption(selectedOptions[prevQuestion.id] || null);
  } else {
    alert('No previous questions!');
  }
};

const handleOptionChange = (event) => {
  const selectedValue = event.target.value;
  setSelectedOptions((prevSelectedOptions) => {
    const newOptions = {
      ...prevSelectedOptions,
      [currentQuestion.id]: selectedValue,
    };
    return newOptions;
  });

if (
  selectedOptions && currentQuestion &&
  currentQuestion.id !== null &&
  !Object.hasOwn(selectedOptions, currentQuestion.id)) {    
    setStateProgress((count) => count + 1);
  }
  setSelectedOption(selectedValue);
    console.log(selectedOptions, currentQuestion.id);
};

// Total correct answers validation
const handleSubmitAns = () => {
    setLoader(true);
  const userAnswers = selectedOptions; 
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
      let topic = 'Birds'
      let activityDetails = {
        'getMonth': currentMonth,
        'getYear': currentYear,
        'fullDate': currentSubmittedDate
      }
    try {
      await axios.post('https://quiz-app-iazp.onrender.com/api/save-game-info', {userId, userFinalResult, userAnswers, isValidUrl, tag, difficulty, activityDetails, topic });
      console.log('saved');
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
      await axios.post('https://quiz-app-iazp.onrender.com/api/delete-temp-progress', {userId,isValidUrl
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
  <Link to='/birds/all'> <button type="button" onClick={() => setShowResultCard(false)} className={styles.dismissGBI}>×</button> </Link>
  <div className={styles.headerGBI}> 
    <div className={styles.resultCardImageGBI}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path> </g></svg>
      </div> 
      <div className={styles.resultCardContentGBI}>
         <span className={styles.resultCardTitleGBI}>Validated!</span> 
             <h2 className={styles.resultCardMessageGBI}> You got {result}/{maxNoOfMark} </h2> 
         </div> 
         <div className={styles.resultCardActionsGBI}>
<Link to="/birds/all"><button type="button" className={styles.okresultCardGBI}>Okay</button></Link>
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
          <img src="/images/carousel_Blocker_proj.png" className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="/images/carousel_Blocker_proj.png" className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="/images/carousel_Blocker_proj.png" className="d-block w-100" alt="Slide 3" />
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
<Link to='/birds'><button className={styles.backBtn}>
<span>Back</span>
  <svg className={styles.backSvg} style={{transform: "scaleX(-1)"}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
</button></Link>
</div>
            </div>
          </div>
        )}

{/* -----------------------------------------------Circles ------------------------------------*/}
      {showThePage && (
        <>
<div className={styles.parent111}>
       {circle && (
<div className={styles.div111}>
  <div className={styles.container}>
            <h3 className={styles.stylishHeading} tabIndex={-1} ref={headingRef}>Birds {tag}-{id}</h3>

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
       <div></div>
<div className={styles.div333}>
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
{/*----------------------------------- Question Display ------------------------------------------ */}
  <div>
    
 <div className={styles.questionWrapper}><h4 className={styles.questionWrapper}> {currentQuestion?.question} </h4></div>
<div className={styles.cyberpunkCheckboxContainer}>
  <label className={styles.cyberpunkCheckboxLabel}> a.)
    <input value={'a'} onChange={handleOptionChange} checked={selectedOption === 'a'} type="radio" name="options" className={styles.cyberpunkCheckbox} /> <span> {currentQuestion?.options.a} </span>
  </label>
  <label className={styles.cyberpunkCheckboxLabel}>b.)  
    <input value={'b'} onChange={handleOptionChange} checked={selectedOption === 'b'} type="radio" name="options" className={styles.cyberpunkCheckbox} /> <span> {currentQuestion?.options.b} </span>
  </label>
  <label className={styles.cyberpunkCheckboxLabel}>c.) 
    <input value={'c'} onChange={handleOptionChange} checked={selectedOption === 'c'} type="radio" name="options" className={styles.cyberpunkCheckbox} /> <span> {currentQuestion?.options.c} </span>
  </label>
  <label className={styles.cyberpunkCheckboxLabel}>d.)
    <input value={'d'} onChange={handleOptionChange} checked={selectedOption === 'd'} type="radio" name="options" className={styles.cyberpunkCheckbox} /> <span> {currentQuestion?.options.d} </span>
  </label>
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
    <button onClick={() => clearForm()} style={{gap: '6px'}} className={`${styles.btnPrev} ${styles.button}`}>clear form
      <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.12 12.548a4 4 0 0 0-3.07 3.86v3.11a.47.47 0 0 0 .48.48l3.24-.06a3.78 3.78 0 0 0 3.44-2.2 3.65 3.65 0 0 0-4.09-5.19Z" />
  <path d="M19.26 4.46a2.14 2.14 0 0 0-2.88.21L10 11.08a.47.47 0 0 0 0 .66L12.25 14a.47.47 0 0 0 .66 0l6.49-6.47a2.06 2.06 0 0 0 .6-1.47 2 2 0 0 0-.74-1.6Z" />
</svg>
    </button>
</div>
</div>
</div>
</>
      )}
</div>
    </>
  );
}

export default BirdsChoose;