const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleCredential: String,
  registered: { type: Boolean, default: false },
  deviceRegistered: { type: Boolean, default: false },

  // Progress
  tempProgress: [
    {
      quizId: String, // Unique identifier for each quiz
      answers: { type: Object, default: {} },
      time: { type: Number, default: 0 },
      currentQuestion: { type: Object, default: {} },
      subProgress: { type: Number, default: 0 },
      result: {type: Number, default: -1}
    },
  ],

  userStats: {
    coins: { type: Number, default: null },
    score: { type: Number, default: 0 },
    overallSkillScore: {type: Number, default: null},
    overAllAttempts: { type: Number, default: 0 },
    overAllNoOfQuestionsRight: { type: Number, default: 0 },
    isCompleted: {type: Object, default: {}},
    activeTopics: {type: Object, default: {}},
userActivityTrack: {
  type: Object,
  default: () => ({})
},
    allChapterPoints: {
      choose: {
        // type: Map,
        // of: new mongoose.Schema({
        //   coins: { type: Number, default: null },
        //   highScore: { type: Number, default: null },
        //   attempts: { type: Number, default: 0 },
        //   noOfQuestionsRight: { type: Number, default: 0 },
        //   answers: { type: Array }
        // }, { _id: false }) // _id: false prevents sub-schema from generating its own _id
      },

      fillups: {
        // type: Map,
        // of: new mongoose.Schema({
        //   coins: { type: Number, default: null },
        //   highScore: { type: Number, default: null },
        //   attempts: { type: Number, default: 0 },
        //   noOfQuestionsRight: { type: Number, default: 0 },
        //   answers: { type: Array }
        // }, { _id: false }) 
      },

      guessByImage: {
        
      },

      mixedQuiz: {
        type: Map,
        of: new mongoose.Schema({
          coins: { type: Number, default: null },
          highScore: { type: Number, default: null },
          attempts: { type: Number, default: 0 },
          noOfQuestionsRight: { type: Number, default: 0 },
          answers: { type: Array }
        }, { _id: false }) // _id: false prevents sub-schema from generating its own _id
      },
    }

  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
