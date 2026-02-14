import Students from './Students.tsx'
import Students2 from './Students2.jsx'
import StudentDestructuring from './StudentDestructuring.tsx'

function App() {
  return(
    <>
      <StudentDestructuring name="mary" age ={25} isStudent={false}></StudentDestructuring>

      <Students name="njoroge"  age= {31} isStudent={true} ></Students>
      <Students name="ann" age={31} isStudent={false}> </Students>

      <Students2 name="joseph" age={31} isStudent = {true}></Students2>
      <Students2 name="wanyoike" age={31} isStudent={true}></Students2>

      
    </>
  );
}

export default App
