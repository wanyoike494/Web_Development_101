function UserGreeting2 (props){
    if (props.isLoggedIn){
        // return <h2>Wecome {props.username}</h2>
        return(props.isLoggedIn ? <h2 className="welcome">Welcome {props.username}</h2> : 
                                  <h2 className="login">Please Login to Continue</h2>)
    }
}
export default UserGreeting2