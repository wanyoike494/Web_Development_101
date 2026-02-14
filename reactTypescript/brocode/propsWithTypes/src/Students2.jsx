

function Students2(props) {
    return(
        <div className="students">
            <p>Name2: {props.name}</p>
            <p>Age2: {props.age}</p>
            <p>Student2: {props.isStudent ? "Yes" : "NO"}</p>
        </div>

    );
} 
export default Students2