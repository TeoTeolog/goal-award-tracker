import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../component/GoalForm";
import { getGoals, reset } from "../features/goals/goalsSlice";
import Spinner from "../component/Spinner";
import GoalItem from "../component/GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError)
      console.log(
        "[Dashboard/effect] isError === true, error message:",
        message
      );

    if (!user) {
      navigate("/login");
      return () => {
        dispatch(reset());
      };
    }

    dispatch(getGoals());
  }, [user, isError, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">Welcome {user && user.name}</section>
      <p>Make a goal</p>
      <GoalForm />
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (
        <h3>You has not add any goals</h3>
      )}
    </>
  );
}

export default Dashboard;
