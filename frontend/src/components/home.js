
const Home = ({signIn}) => {

    

    return (
        <main id = "login">

            <div className= "intro">
                <h1>Welcome to <span>BudGitt</span></h1>
            </div>  
            <div className = "actions">
                <h3>Manage your expenses and plan ahead for the future</h3>

                <em>Ensure you have an account on the Near Protocol to use this app.</em>

                <button onClick= {signIn}>
                    Get Started
                </button>
            </div>

            

            
        </main>
    )
}

export default Home