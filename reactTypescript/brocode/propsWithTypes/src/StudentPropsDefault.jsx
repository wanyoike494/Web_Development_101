

function StudentPropsDefault (props){
    return(
        <div className="students">
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Student:{props.isStudent ? "Yes" : "No" }</p>
        </div>
    );
}
StudentPropsDefault.defaultProps = {
    name: "Guest",
    age: 0,
    isStudent: false,
}
export default StudentPropsDefault