import styles from './UserProgress.module.css'
import { useState } from 'react';
import axios from 'axios';
import { RadialLinearScale} from 'chart.js';
import { useEffect } from 'react';
import { Doughnut,PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);


const UserProgress = () => {
  const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear().toString();
let forColour = []
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let aa = [...monthNames]; // shallow copy of monthNames
const months = {
  "2025": aa,
};
      const [user, setUser] = useState(null);

  const [selecedCalender, setSelectedCalender] = useState({
  });
  const [userActivityDataYearChart, setUserActivityDataYearChart] = useState([]);
  const [userActivityDataMonthChart, setUserActivityDataMonthChart] = useState([]);
  const [userActivityDataStore, setUserActivityDataStore] = useState();
  const [userActiveTopicsDataStore, setUserActiveTopicsDataStore] = useState()
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  let [userYear,setUserYear] = useState([]);
  let [userMonth, setUserMonth] = useState([]);
    let [monthWithValue, setMonthwithValue] = useState([]);
  // X-axis labels
  // let labels = [];
  const [yearChart, setYearChart] = useState({ labels: [], data: [] });
const [monthChart, setMonthChart] = useState({ labels: [], data: [] });

    // Utility function to generate a random color
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.7)`;
};

  // Chart data
  const data = {
  labels: selectedMonth !== "" ? monthChart.labels : yearChart.labels,
  datasets: [
    {
      label: selectedMonth !== "" ? 'Submitted:' : 'Submitted:',
      data: selectedMonth !== "" ? monthChart.data : yearChart.data,
        fill: false,
                backgroundColor: selectedMonth !== "" ? monthChart.labels.map(() => getRandomColor()) : yearChart.labels.map(() => getRandomColor()),
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(201, 203, 207, 1)'
        ],
        borderWidth: 1,
        // tension: 0.1,
      },
    ],
  };

  // Chart config options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart Example',
      },
    },
  };

  // Polar Chart
  console.log(forColour);
  
  const polarData = {
  labels: [],
  datasets: [
    {
      label: 'User Performance',
      data: [],
                backgroundColor: [
  "rgba(255, 87, 34, 0.7)",
  "rgba(63, 81, 181, 0.7)",
    "rgba(33, 150, 243, 0.7)",
  "rgba(76, 175, 80, 0.7)",
                      "rgba(244, 67, 54, 0.7)",
  "rgba(255, 193, 7, 0.7)",
  "rgba(156, 39, 176, 0.7)",
  "rgba(0, 188, 212, 0.7)",
  "rgba(205, 220, 57, 0.7)",
  "rgba(121, 85, 72, 0.7)",
  "rgba(0, 150, 136, 0.7)",
  "rgba(233, 30, 99, 0.7)",
  "rgba(158, 158, 158, 0.7)",
  "rgba(103, 58, 183, 0.7)",
  "rgba(3, 169, 244, 0.7)"
                ],

      borderWidth: 1,
    },
  ],
};

const polarOption = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'User Activity Distribution',
    },
  },
};

// Year and Month progress
    if (selectedMonth === '') {
// update year Chart
  let len = userActivityDataYearChart.length;
for (let i = 0; i < monthNames.length && selectedYear !== ''; i++) {
        if(currentYear !== selecedCalender || monthNames[currentMonth] === yearChart.labels[i]) break;
        yearChart.labels.push(monthNames[i]);
    console.log(monthNames[i]);
    
  for (let j = 0; j < userActivityDataYearChart?.length; j++) {
  if (yearChart.labels[i] === userActivityDataYearChart[j][0]) {
    data.datasets[0].data.push(userActivityDataYearChart[j][1]);
    len--;
  }
}
    if (len === 0) break;
    data.datasets[0].data.push(0);
}

    } else {
      console.log('Monthy exec');
      
// update monthy chart
  let monthChartDataLen = userActivityDataMonthChart.length;

  for (let i = 0; i < monthNames.length && selectedMonth !== ''; i++) {
        if(currentYear !== selecedCalender || monthNames[currentMonth] === monthChart.labels[i]) break;
        monthChart.labels.push(monthNames[i]);
  for (let j = 0; j < userActivityDataMonthChart?.length; j++) {
  if (monthChart.labels[i] === userActivityDataMonthChart[j][0]) {
    data.datasets[0].data.push(userActivityDataMonthChart[j][1]);
    monthChartDataLen--;
  }
}
    if (monthChartDataLen === 0) break;
    data.datasets[0].data.push(0);
}
    }

  const handleYearChange = (e) => {
    setSelectedYear (e.target.value);
    setYearlyData(e.target.value);
    setSelectedMonth(''); // reset variety when fruit changes  
  };
  const handleMonthChange = (e) => {        
    setSelectedMonth(e.target.value);
    console.log(selectedMonth);
    setMonthlyData(e.target.value);
  };

const setYearlyData = (year) => {
  const labels = [];
  const data = [];

  for (const month in userActivityDataStore[year]) {
    labels.push(month);
    let total = 0;
    for (const date in userActivityDataStore[year][month]) {
      total += userActivityDataStore[year][month][date];
    }
    data.push(total);
  }

  setYearChart({ labels, data });
};

  //
const setMonthlyData = (month) => {
  const labels = [];
  const data = [];

  for (const date in userActivityDataStore[selectedYear][month]) {
    labels.push(date);
    data.push(userActivityDataStore[selectedYear][month][date]);
  }

  setMonthChart({ labels, data });
};
  
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
 }, [user?._id]);
  const getBarChartData = async () => {
    const userId = user?._id;
    const $FSA_auth_token = localStorage.getItem(`$FSA_auth_token`);
    try {
    const response = await axios.get('https://quiz-app-iazp.onrender.com/api/user-activity-track', {
          headers: {
            Authorization: `Bearer ${$FSA_auth_token}`,
          },
        });
        
            console.log(response.data);
            setUserActivityDataStore(response.data.data);
            setUserActiveTopicsDataStore(response.data.userActiveTopics)
              for (const year in response.data.data) {
                userYear.push(year);
                for (const month in response.data.data[year]) {
                  userMonth.push(month);
            }
         }
        console.log(userYear);
        console.log(userMonth);
        
    } catch (error) {
      console.log('Error fetching barChart:' ,error);
    }

  }

       for (const topic in userActiveTopicsDataStore) {
      polarData.labels.push(topic);
      polarData.datasets[0].data.push(userActiveTopicsDataStore[topic]);
      forColour.push(0)
    }
  useEffect(() => {
      getBarChartData();

  },[])   
    
  return (
    <>
    <div style={{backgroundColor: 'rgb(237, 234, 230)'}}><h1 className={styles.userHearder}>Monthly and Yearly Progress</h1></div>
                                {/* <h2>Select year to see your progress</h2> */}

        <div className={styles.row}>
      <div className={styles.dropdownWrapper}>
        <label className={styles.label}>Select Year:</label>
        <select value={selectedYear} onChange={handleYearChange}className={styles.select}>
          <option value="">-- Choose Year --</option>
          {userYear?.map((year,i) => (            
        <option key={i} value={year}>
          {year} 
        </option>
      ))}
          {/* <option value="2025"> 2025</option> */}
        </select>
      </div>

{selectedYear && (
  <div className={styles.dropdownWrapper}>
    <label className={styles.label}>Select Month:</label>
    <select
      value={selectedMonth}
      onChange={handleMonthChange}
      className={styles.select}
    >
      <option value="">-- Choose Month --</option>
      {userMonth?.map((month, idx) => (
        <option key={idx} value={month}>
          {month} 
        </option>
      ))}
    </select>
  </div>
)}

    </div>
    {selectedYear === '' ? (
        <div className={styles.NothingContainer}>
           <h3 className={styles.NothingHeader}>No Data Available</h3>
           <br />
            <div className={styles.loader}>
        <div className={styles.wrapper}>
          {/* <div className={styles.circle} /> */}
          <div className={styles.line1} />
          <div className={styles.line2} />
          <div className={styles.line3} />
          <div className={styles.line4} />
        </div>
      </div>
    </div>
    ) : (
        <div style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
      <Doughnut data={data} options={options} />
    </div>
        )}
<br />
    <h1 className={styles.userHearder}> Most Active Topic</h1>
<br />
                <div style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
              <PolarArea data={polarData} options={polarOption} />
                </div>
       </>
  )
};

export default UserProgress;
