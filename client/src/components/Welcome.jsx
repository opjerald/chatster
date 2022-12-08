import robot from '../assets/images/robot.gif';

const Welcome = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='welcome_container'>
            <img src={robot} alt='robot' />
            <h1>
                Welcome, <span>{user?.username}!</span>
            </h1>
            <h3>Please select contact to start messaging</h3>
        </div>
    );
};

export default Welcome;
