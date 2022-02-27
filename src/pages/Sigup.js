// import du package axios
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUserToken, showSignup, setShowSignup, setShowLogin, nextPage, setNextPage }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const showHideClassName = showSignup ? "modal display-block" : "modal display-none";

    const navigate = useNavigate();

    const handleOnClose = () => {
        setShowSignup(false);
    };

    const handleUsernameChange = event => {
        const value = event.target.value;
        setUsername(value);
    };

    const handleEmailChange = event => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePasswordChange = event => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleOnClikForLogin = event => {
        handleOnClose();
        window.scrollTo(0, 0);
        setShowLogin(true);
    };


    const handleSubmit = async event => {
        event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
        //console.log(email, password);
        try {
            //const response = await axios.post("http://localhost:3000/user/signup",
            const response = await axios.post("https://diakary-marvel.herokuapp.com/user/signup",
                {
                    username: username,
                    email: email,
                    password: password
                });
            
            console.log("data", response.data);

            if (response.data && response.data.token && response.data.token !== "") {
                Cookies.set("userToken", response.data.token);
                Cookies.set("userId", response.data._id);
                //console.log("response.data._id ", response.data._id);
                //console.log("Cookies.get-user ", Cookies.get("userId"));
                setUserToken(response.data.token);
                handleOnClose();

                if (nextPage.state) {
                    if (nextPage.state.next) {
                        const next = nextPage;
                        //Clear state
                        setNextPage({});
                        console.log("next ", next);
                        navigate(next.state.next, { state: next.state });
                    }
                }
                else {
                    handleOnClose();
                    navigate("/");
                }

            }            

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div id="idSignup" className={showHideClassName}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="container-signup">
                        <h2>S'inscrire</h2>
                        <span className="closebtn" onClick={handleOnClose}>×</span>
                    </div>
                    <form className="container" onSubmit={handleSubmit}>
                        <input
                            required
                            placeholder="Nom d'utilisateur"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            required
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <input
                            required
                            placeholder="Mot de passe"
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}
                        />

                        <div className="terms">
                            <div>
                                <input
                                    id="newsletter"
                                    type="checkbox"
                                    name="newsletter"
                                />
                            </div>
                            <span>En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et politique de Confidentialité de Marvel.</span>
                        </div>
                        <input type="submit" value="S'inscrire" />
                    </form>
                    <span className="already-signup" onClick={handleOnClikForLogin}>Tu as déjà un compte ? Connecte-toi !</span>
                </div>
            </div>
        </div>
    )
}

export default Signup
