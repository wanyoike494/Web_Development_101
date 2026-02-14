import Students from './Students.tsx'
import Students2 from './Students2.jsx'
import StudentDestructuring from './StudentDestructuring.tsx'
import StudentsTypes from './StudentsTypes.jsx'
import StudentPropsDefault  from './StudentPropsDefault.jsx'

function App() {
  return(
    <>
      <StudentPropsDefault></StudentPropsDefault>  

      <StudentDestructuring name="mary" age ={25} isStudent={false}></StudentDestructuring>

      <Students name="njoroge"  age= {31} isStudent={true} ></Students>
      <Students name="ann" age={31} isStudent={false}> </Students>

      <StudentsTypes name="monicah" age={26} isStudent={true}></StudentsTypes>

      <Students2 name="joseph" age={31} isStudent = {true}></Students2>
      <Students2 name="wanyoike" age={31} isStudent={true}></Students2>

      
    </>
  );
}

export default App
