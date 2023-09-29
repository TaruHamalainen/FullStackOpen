const Header = () => {
  return <h1 style={{ textAlign: "center" }}>Web development curriculum</h1>;
};

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <CourseElement key={course.id} course={course} />
      ))}
    </div>
  );
};

const CourseElement = ({ course }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={course.parts} />
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((current, next) => current + next.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};

const Course = ({ courses }) => {
  return (
    <div>
      <Header />
      <Content courses={courses} />
    </div>
  );
};

export default Course;
