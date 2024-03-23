const Header = ({name}) => {
  return <h2>{name}</h2>
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({parts}) => {
  return parts.map(part => <Part key={part.id} part={part} />)
}

const Total = ({parts}) => {
  const totalExercise = parts.reduce((total, part) => {
    return total + part.exercises
  },0)
  return <strong>total of {totalExercise} exercises</strong>
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>    
  )
}

export default Course