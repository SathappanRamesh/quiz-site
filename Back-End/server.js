const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserModel = require('./models/User');
const TemporaryUserModel = require('./models/TemporaryUser');
const { OAuth2Client } = require('google-auth-library');
const User = require('./models/User');
const app = express();
import dotenv from 'dotenv';
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 * 60,
      secure: true,
      httpOnly: true,
    },
    store: MongoStore.create({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, 
      connectTimeoutMS: 30000,
      mongoUrl: "mongodb+srv://sathappanramesh288:Guvi123...@cluster0.bsgotks.mongodb.net/Main_Project_1?retryWrites=true&w=majority",
    }),
  })
);
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_DB;
mongoose.connect(DB_URL, {
  family: 4,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("Could not connect to MongoDB", err);
  process.exit(1);
});

  // Middleware to check if the user is authenticated
  const authenticateUser = (req, res, next) => {
    const $FSA_auth_token = req.headers.authorization.split(" ")[1];
    
    if (!$FSA_auth_token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(
      $FSA_auth_token,
      "123456789"
  );
  req.user = {
    username: decodedToken.username,
    userId: decodedToken.userId, 
    email: decodedToken.email,
  }  
    next();
  };

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUserByUsername = await UserModel.findOne({ username });
    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username already exists.' });
    }
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = generateVerificationPin();

    // Save user details in temporary collection
    const temporaryUser = new TemporaryUserModel({
      username,
      email,
      password: hashedPassword,
      fourDigitCode: token
    });
    await temporaryUser.save();
    // Send verification email
    sendEmail(email, token);
    res.status(201).json({ message: 'Verification code sent. Please check your email.', email });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});

app.post('/google-register', async (req, res) => {
  const { googleCredential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleCredential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        googleId: sub,
        username: name,
        email,
        deviceRegistered: true,
      });
      await user.save();
      return res.status(200).json({ message: 'Google login successful', $FSA_auth_token: generateToken(user) });
    } else {
      if (user.googleId && user.googleId === sub) {
        return res.status(200).json({ message: 'Google login successful', $FSA_auth_token: generateToken(user) });
      } else {
        return res.status(400).json({ error: 'Email is already registered with a different method.' });
      }
    }
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ error: 'Google login failed. Please try again.' });
  }
});

const GOOGLE_CLIENT_ID = '383869457570-gupq720fk2s1unh8bn5vag2ie58533bv.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.post('/google-login', async (req, res) => {
  const { googleCredential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleCredential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email } = payload;

    let user = await UserModel.findOne({ email });

    if (user) {      
      // User exists, proceed with login
      if (user.googleId && user.googleId === sub) {
        return res.status(400).json({ error: 'Email is already registered with a different method.' });
      } else {        
        return res.status(200).json({ message: 'Google login successful', $FSA_auth_token: generateToken(user) });
      }
    } else {
      return res.status(400).json({ error: 'User does not exist. Please sign up first.' });
    }
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ error: 'Google login failed. Please try again.' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    
    req.user = user;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const $FSA_auth_token = generateToken(user);
      res.status(200).json({ message: 'Login successful', $FSA_auth_token });
    } else {
      res.status(404).json({ error: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});

app.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;
  
  try {
    const temporaryUser = await TemporaryUserModel.findOne({ email: email, fourDigitCode: code });
    
    if (temporaryUser) {
      const newUser = new UserModel({
        username: temporaryUser.username,
        email: temporaryUser.email,
        password: temporaryUser.password,
        registered: true,
        deviceRegistered: true,
      });

      await newUser.save();
      await TemporaryUserModel.deleteOne({ email, fourDigitCode: code });

      res.status(200).json({ success: true, message: 'Verification successful!' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid verification code.' });
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/myProfile', authenticateUser, (req, res) => {
  const user = req.user;
  res.json({ username: user.username, _id: user.userId, email: user.email });
});

app.post('/api/user-temp-progress', async (req, res) => {
  const { userId, progress } = req.body;
  
  if (!userId || !progress) {
    return res.status(400).send("Missing userId, progress data, or quizId");
  }

  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const existingProgress = user.tempProgress.find((p) => p.quizId === progress.tag);
    
    if (!existingProgress) {
      // Add new progress
      user.tempProgress.push({
        quizId: progress.tag || null,
        answers: progress.answers || {},
        time: progress.time || 0,
        currentQuestion: progress.currentQuestion || {},
        subProgress: progress.subProgress || 0,
      });
    } else {
      // Update existing progress
      const index = user.tempProgress.findIndex((p) => p.quizId === progress.tag);
      user.tempProgress[index] = {
        quizId: progress.tag,
        answers: progress.answers || existingProgress.answers,
        time: progress.time || existingProgress.time,
        currentQuestion: progress.currentQuestion || existingProgress.currentQuestion,
        subProgress: progress.subProgress || existingProgress.subProgress,
      };
    }
    await user.save();
    res.status(200).send("Progress saved successfully!");
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).send("Internal server error");
  }
});

app.post('/api/count-attempts', async (req, res) => {
  let { userId, tag, isValidUrl } = req.body;  
  
  if (!userId || !tag || !isValidUrl) {
    console.log('Req.body from countatte', userId, tag, isValidUrl);
    return res.status(400).send("Missing required fields: userId, genreType, or tag!");
  }
    if (tag == 'fill-ups') {
    tag = 'fillups'
  }
    if (tag === "guess-by-image") {
    tag = "guessByImage";
  }
  
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Validate allChapterPoints and genreType
    if (!user.userStats?.allChapterPoints || !user.userStats.allChapterPoints[tag]) {
      return res.status(400).send(`Invalid genreType: ${tag}`);
    }
    // getting the specific tag and save it to the variable called 'genrePoints'
    const genrePoints = user.userStats.allChapterPoints[tag];
    // Check if the isValidUrl exists
    const exist = genrePoints[isValidUrl];
    user.userStats.overAllAttempts += 1;     
    if (exist) {
      exist.attempts += 1;      
    } else {
      genrePoints[isValidUrl] = {
        attempts:1,
      }
      user.markModified('userStats.allChapterPoints');
    }
    user.markModified('userStats.allChapterPoints');
    await user.save();
    res.status(200).send("Attempts saved successfully!");
  } catch (error) {
    console.error("Error saving Attempts:", error);
    res.status(500).send("Internal server error");
  }
});

app.post('/api/save-game-info', async (req, res) => {
  let { userId, userFinalResult, userAnswers, isValidUrl, tag, difficulty, activityDetails, topic} = req.body;

  if (!userId || !isValidUrl || !tag || !difficulty ) {
    return res.status(400).send("Missing required fields");
  }
  if (tag === 'fill-ups') {
    tag = 'fillups';
  }
  if (tag === "guess-by-image") {
    tag = "guessByImage";
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update tempProgress result
    const tempIndex = user.tempProgress.findIndex(p => p.quizId === isValidUrl);

    if (tempIndex !== -1) {
      user.tempProgress[tempIndex].result = userFinalResult;
    }

    const quizKey = isValidUrl;

    // Initialize the structure if it doesn't exist
    if (!user.userStats.allChapterPoints[tag]) {
      user.userStats.allChapterPoints[tag] = {};
    }

    if (!user.userStats.allChapterPoints[tag][quizKey]) {
      user.userStats.allChapterPoints[tag][quizKey] = {
        coins: null,
        highScore: null,
        attempts: 0,
        noOfQuestionsRight: 0,
        answers: [],
      };
      user.markModified('userStats.allChapterPoints');
    }
    const currentGame = user.userStats.allChapterPoints[tag][quizKey];
    
    // Update coins only if first time (coins is null)
    if (!currentGame.coins) {
      let coinEarned = 0;
      if (difficulty === 'easy') {
        coinEarned = userFinalResult;
      } else if (difficulty === 'medium') {
        coinEarned = userFinalResult * 2;
      } else if (difficulty === 'hard') {
        coinEarned = userFinalResult * 3;
      }

      user.userStats.coins += coinEarned;
      currentGame.coins = coinEarned;      
    }

    // Calculate score
    let score = 0;
    if (difficulty === 'easy') {
      score = userFinalResult * 2;
    } else if (difficulty === 'medium') {
      score = userFinalResult * 4;
    } else if (difficulty === 'hard') {
      score = userFinalResult * 6;
    }

    // Update high score
    if (!currentGame.highScore) {
      currentGame.highScore = score;
    } else {
      currentGame.highScore = Math.max(currentGame.highScore, score);
    }

    // Update answers and no of questions right
    currentGame.noOfQuestionsRight = userFinalResult;
    currentGame.answers = userAnswers;
    currentGame.lastPlayedScore = score;
    // Track attempts
    currentGame.attempts += 1;
    user.userStats.overAllAttempts += 1;

    // If it's first attempt only
    if (currentGame.attempts === 1) {
      user.userStats.overallSkillScore += userFinalResult;
      user.userStats.overAllNoOfQuestionsRight += userFinalResult;
    }

    // Recalculate average skill score
    if (user.userStats.overAllAttempts > 0) {
      const averageSkillScore = user.userStats.overallSkillScore / user.userStats.overAllAttempts;
      user.userStats.overallSkillScore = Number(averageSkillScore.toFixed(2));
    }

    // Is Completed
    if (userFinalResult === 12) {
      user.userStats.allChapterPoints[tag][quizKey].isCompleted = true;
    } else {
      user.userStats.allChapterPoints[tag][quizKey].isCompleted = false;
    }
    user.markModified(`userStats.allChapterPoints`);

    //////////////////////////  User Activit Tracking ///////////////////////////////////
    let year =  activityDetails?.getYear;
    let month =  activityDetails?.getMonth;
    let fullDate =  activityDetails?.fullDate;

    if (!user.userStats.isCompleted[isValidUrl]) {
      user.userStats.isCompleted[isValidUrl] = true;

      if (!user.userStats.activeTopics[topic]) user.userStats.activeTopics[topic] = 1;
      else user.userStats.activeTopics[topic]++;

if (!user.userStats.userActivityTrack) {
  user.userStats.userActivityTrack = {};
}
if (!user.userStats.userActivityTrack[year]) {
  user.userStats.userActivityTrack[year] = {};
}
if (!user.userStats.userActivityTrack[year][month]) {
  user.userStats.userActivityTrack[year][month] = {};
}
if (!user.userStats.userActivityTrack[year][month][fullDate]) {
  user.userStats.userActivityTrack[year][month][fullDate] = 1;
} else {
  user.userStats.userActivityTrack[year][month][fullDate]++;
}
    } 
user.markModified('userStats.userActivityTrack');
user.markModified('userStats.isCompleted');
user.markModified('userStats.activeTopics');

    await user.save();
    res.status(200).send("User Game Info saved successfully");
  } catch (error) {
    console.error("Error saving Game Info:", error);
    res.status(500).send("Internal server error");
  }
});

app.get('/api/retrieve-user-temp-progress', authenticateUser, async (req, res) => {
  
  const { userId } = req.user;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const progress = user.tempProgress;
    if (progress) res.status(200).json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).send("Internal server error");
  }
});

app.get('/api/fetch-userCredentials', authenticateUser, async (req, res) => {
  
  const { userId } = req.user;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const userCredentials = user.userStats;

    if (userCredentials) res.status(200).json(userCredentials);
  } catch (error) {
    console.error("Error fetching userCredentials:", error);
    res.status(500).send("Internal server error");
  }
});

app.get('/api/get-user-whole-details', authenticateUser, async (req, res) => {
  const { userId } = req.user;
  
  const docs = await User.find();
  const sender = [];
try {
  for (const doc of docs) {
    sender.push(doc)
  }
    if (sender) res.status(200).json(sender);
    } catch (error) {
    console.error("Error fetching userCredentials:", error);
    res.status(500).send("Internal server error");
  }
});
app.post('/api/clear-form', async (req, res) => {
  const { userId, isValidUrl } = req.body;
  try {
    let keyUrl = isValidUrl;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const index = user.tempProgress.findIndex((p) => p.quizId === keyUrl);    
    if (index !== -1) {
      user.tempProgress[index].answers = {};
      user.tempProgress[index].subProgress = 0;
      user.markModified('userStats.tempProgress');

      await user.save();
      res.status(200).send("User Game Info saved successfully");
    } else {
      res.status(404).send("Quiz not found in user's progress");
    }

  } catch (error) {
    console.error("Error clearing form:", error);
    res.status(500).send("Internal server error");
  }
});

app.get('/api/user-activity-track', authenticateUser, async (req,res) => {
  const {userId} = req.user;  
  try {
  let user = await UserModel.findOne({_id: userId});
  let data = user.userStats.userActivityTrack;
  let userActiveTopics =  user.userStats.activeTopics;  
  if (data) {
  res.status(200).json(
    {
      'data': data,
      'userActiveTopics': userActiveTopics
    }
  );
} 
} catch (error) {
  res.status(500).json({ error: 'Error fetching user activity track', details: error.message });
}
});

app.post('/api/delete-temp-progress', async (req, res) => {
  const { userId, isValidUrl } = req.body;
  const user = await UserModel.findOne({_id:userId});
  try {
    const index = user.tempProgress.findIndex((p) => p.quizId === isValidUrl);
    user.tempProgress.splice(index, 1); 
    user.markModified('userStats.tempProgress');
    await user.save();
    res.json({ message: 'Item removed successfully', data: index });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

function generateToken(user) {
  const token = jwt.sign({username: user.username, email: user.email, password: user.password, userId: user._id }, '123456789', {
     expiresIn: '3hr',
  });
  return token;
}

const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kdsomewhatelse@gmail.com',
    pass: 'drugjvpuwdfzregv',
  },
});

function sendEmail(email, token) {
  const mailOptions = {
    from: 'kdsomewhatelse@gmail.com',
    to: email,
    subject: 'Email verification',
    text: `To join our quiz-ko, verify your email with this 4-digit pin code: ${token}`,
  };
  emailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function generateVerificationPin() {
  return Math.floor(1000 + Math.random() * 9000);
}

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});