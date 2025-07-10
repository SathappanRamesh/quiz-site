import { Route, Routes } from 'react-router-dom';
import Login from './Login&Register/Login';
import Register from './Login&Register/Register';
import VerificationCode from './VerificationCode';
import GkQuestionRouter from './GK/GkQuestionRouter';
import Layout from './Layout';
import Leaderboard from './Leaderboard';
import Gk from './GK/Gk';
import MyProfile, { ChangePassword } from './MyProfile';
import UserProgress from './UserProgress';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import Birds from '../Birds/Birds';
import BirdsQuestionRouter from '../Birds/BirdsQuestionRouter';
import Animals from '../Animals/Animals';
import AnimalsQuestionRouter from '../Animals/AnimalsQuestionRouter';
import Science from '../Science/Science';
import ScienceQuestionRouter from '../Science/ScienceQuestionRouter';
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verificationCode" element={<VerificationCode />} />

      {/* Protected Routes */}
      <Route element={
          <PrivateRoute>            
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/progress" element={<UserProgress />} />
        <Route path="/" element={<Gk />} />
        <Route path="/gk/:quizType" element={<Gk />} />
        <Route path="/gk/:tag/:id" element={<GkQuestionRouter />} />

        <Route path="/birds/all" element={<Birds />} />
        <Route path="/birds/:quizType" element={<Birds />} />
        <Route path="/birds/:tag/:id" element={<BirdsQuestionRouter />} />

        <Route path="/animals/all" element={<Animals />} />
        <Route path="/animals/:quizType" element={<Animals />} />
        <Route path="/animals/:tag/:id" element={<AnimalsQuestionRouter />} />

        <Route path="/science/all" element={<Science />} />
        <Route path="/science/:quizType" element={<Science />} />
        <Route path="/science/:tag/:id" element={<ScienceQuestionRouter />} />
        <Route path="/not-found" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
