interface UserGreetingProps {
    isLoggedIn: boolean;
    username: string;
}

function UserGreeting(props: UserGreetingProps){
    if(props.isLoggedIn){
        return <h2 className="welcome">Welcome {props.username}</h2>
    }
    else {
        return <h2 className="login">Please log in to continue</h2>
    }
}
export default UserGreeting