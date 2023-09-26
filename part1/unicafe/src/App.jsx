import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  const all = props.clicks.good + props.clicks.neutral + props.clicks.bad;
  const avarage = (props.clicks.good * 1 + props.clicks.bad * -1) / all;
  const positive = props.clicks.good * (100 / all);

  return (
    <div>
      <h2>Statics</h2>
      {all > 0 ? (
        <table>
          <tbody>
            <StatisticLine text="Good" value={props.clicks.good} />
            <StatisticLine text="Neutral" value={props.clicks.neutral} />
            <StatisticLine text="Bad" value={props.clicks.bad} />
            <StatisticLine text="All" value={all} />
            <StatisticLine text="Avarage" value={avarage} />
            <StatisticLine text="Positive" value={`${positive}%`} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({ good: 0, neutral: 0, bad: 0 });

  return (
    <div className="container">
      <h1>give feedback</h1>
      <Button
        handleClick={() => setClicks({ ...clicks, good: clicks.good + 1 })}
        text="good"
      />
      <Button
        handleClick={() =>
          setClicks({ ...clicks, neutral: clicks.neutral + 1 })
        }
        text="neutral"
      />
      <Button
        handleClick={() => setClicks({ ...clicks, bad: clicks.bad + 1 })}
        text="bad"
      />
      <Statistics clicks={clicks} />
    </div>
  );
};

export default App;
