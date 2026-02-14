import PropTypes from 'prop-types'

function Students (props){
    return(
        <div className="student1">
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Student: {props.isStudent ? "Yes" : "No"}</p>
        </div>
    );
}
Students.propTypes = {
    name: PropTypes.string.isRequired, //proptypes ensures that the entered values of the required type
    age: PropTypes.number.isRequired,
    isStudent: PropTypes.bool.isRequired,
}
export default Students