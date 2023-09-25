const Header = ({ course }) => {
  return (
    <header className="header">
      <h1>{course.name}</h1>
    </header>
  );
};

const Content = ({ parts }) => {
  return (
    <ul className="list">
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </ul>
  );
};

const Part = ({ part }) => {
  return (
    <li className="part">
      <p>{part.name}</p>
      <p>
        Exercises: <span>{part.exercises}</span>
      </p>
    </li>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((prev, next) => prev + next.exercises, 0);
  return (
    <footer className="footer">
      <p>Number of exercises {total}</p>
    </footer>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div className="container">
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
