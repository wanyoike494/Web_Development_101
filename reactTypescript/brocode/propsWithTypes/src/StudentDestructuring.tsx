interface StudentsProps2{
    name: string;
    age: number;
    isStudent: boolean;

}

function StudentDestructuring ({name, age, isStudent } : StudentsProps2) {
    return(
        <div className="students">
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Student{isStudent ? "Yes" : "No"}</p>
        </div>
    )
}
export default StudentDestructuring