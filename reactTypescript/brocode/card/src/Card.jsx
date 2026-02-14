import profilePic from './assets/Joseph.jpg'

function Card (){
    return(
        <div className="card">
            <img src={profilePic} alt="profile"></img>
            <h2>Joseph Wanyoike</h2>
            <h3 className="surname">Njoroge</h3>
            <p className='para1'>Am the lead Developer and lead Data Analyst at World Data Analysis project</p>

        </div>
    );
}

export default Card