interface StudentProps {
    name: string;
    age: number;
    isStudent: boolean
}

function Students (props: StudentProps) {
    return(
        <div className="students">
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Student: {props.isStudent ? "Yes" : "No"}</p>

        </div>
    );
}
export default Students