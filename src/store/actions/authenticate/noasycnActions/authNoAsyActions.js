import * as actionCreators from '../../index';
import { Url } from '../../../../properties/properties';
const axios = require('axios');

export const signInFetch = ((userLogin, props) => {
    return (next) => {
        console.log("bravooooooooooo");
        axios.post(Url + '/SignIn',
            userLogin
        )
            .then((response) => {
                console.log("#############");
                console.log(response.data);
                next(actionCreators.signIn({
                    username: response.data.username,
                    email: response.data.email,
                    state: response.data.state,
                    isReady: response.data.isReady,
                    isActive: true,
                    authority: response.data.authority,
                    token: response.data.token,

                }));
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                console.log("error in sign in");
            });

    }


});


export const signUpFetch = (userInfo, props) => {
    return (next) => {
        axios.post(Url + '/SignUp',
            userInfo
        )
            .then((response) => {
                console.log(response.data.Token);
                next(actionCreators.signUp({
                    username: userInfo.username,
                    email: userInfo.email,
                    state: 1,
                    isReady: false,
                    isActive: true,
                    authority: "gest",
                    token: response.data.Token,

                }));
                props.history.push('/EmailValidation')
            })
            .catch((error) => {
                console.log(error);
                console.log("error sign up");
            });
    }

};



export const ValidateEmail = (token, props) => {
    return (next) => {

        axios.get(Url + '/ValidationEmail/' + token,

        )
            .then((response) => {
                console.log(response.data);
                next(actionCreators.ValidateEmailtoReducer());
                props.history.push('/UserInfo');
            })
            .catch((error) => {
                console.log(error);
                console.log("error sign up");
            });

    }

};


export const SendEmail = (state) => {
    return (next) => {
        console.log("token is :" + state.token)
        let config = {
            headers: {
                authorization: "Bearer: " + state.token,
                Username: state.username
            }
        }
        axios.get(Url + '/SendEmail', config)
            .then((response) => {
                console.log(response.data);
                console.log("email has benn sended")
            })
            .catch((error) => {
                console.log(error);
                console.log("error on sending email");
            });
    }
};




export const onLogOutOperation = (props) => {
    return (next) => {
        let config = {
            headers: {
                authorization: "Bearer: " + props.user.token,
                Username: props.user.username
            }
        }
        axios.post(Url + '/LogOut', { type: "Logout" }, config)
            .then((response) => {
                console.log(response.data);
                next(actionCreators.LogOut());
                props.history.push('/signIn');
            })
            .catch((error) => {
                console.log(error);
                console.log("error on log out");
            });

    }
}




export const userInfoRegistering = (fd, props) => {
    return (next) => {
        console.log("#######");
        console.log(props.user.token);
        let config = {
            headers: {
                authorization: "Bearer: " + props.user.token,
                Username: props.user.username
            }
        }
        axios.post(Url + '/UserInfo/UserInfoHandler', fd, config)
            .then((response) => {
                console.log(response.data);
                console.log("userInfos have benn sended");
                next(actionCreators.userInfo());
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                console.log("error on sending user Info");
            });

    }
};


export const rasberySignUpFetch = (rasberyInfo, props) => {
    return (next) => {
        let config = {
            headers: {
                authorization: "Bearer: " + props.user.token,
                Username: props.user.username
            }
        }
        axios.post(Url + '/Rasbery/SignUp', rasberyInfo, config)
            .then((response) => {
                console.log(response.data);
                next(actionCreators.rasberySignUp());
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                console.log("error on sending user Info");
            });

    }
};





export const sendInvitationRasberyOperation = (targetInfo, props) => {
    return (next) => {
        let config = {
            headers: {
                authorization: "Bearer: " + props.user.token,
                Username: props.user.username
            }
        }
        axios.post(Url + '/Rasbery/SendInvitation', targetInfo, config)
            .then((response) => {
                console.log(response.data);
                next(actionCreators.sendInvitationRasbery());
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                console.log("error on sending invitation");
            });

    }
};


export const ValidateInvitationOperation = (token, props) => {
    return (next) => {

        axios.get(Url + '/Rasbery/InvitationValidation/' + token,

        )
            .then((response) => {
                console.log(response.data);
                next(actionCreators.ValidateInvitation());
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                console.log("error on validation invitation");
            });

    }

};


export const getAllMembersOperation = (props) => {
    return (next) => {
        let config = {
            headers: {
                authorization: "Bearer: " + props.user.token,
                Username: props.user.username
            }
        }

        axios.get(Url + '/Rasbery/getAllUsers/', config

        )
            .then((response) => {
                console.log("okkkkkkkkkk");
                console.log(response.data);
                console.log(response.data.length);
                let users = [];
                let index = 0;
                while (index < response.data.length) {
                    users.push(response.data[index]);
                    index++;
                }
                console.log(users);
                next(actionCreators.getAllMembers(users));

            })
            .catch((error) => {
                console.log(error);
                console.log("error on validation invitation");
            });

    }

};


export const deleteUserFromRasberyOperation = (targetname, props) => {
    return (next) => {
        let config = {
            headers: {
                authorization: "Bearer: " + props.user.token,
                Username: props.user.username
            }
        }

        axios.post(Url + '/Rasbery/DeleteUserFromRasbery/', { targetname: targetname }, config

        )
            .then((response) => {
                console.log("okkkkkkkkkk");
                console.log(response.data);
                next(actionCreators.deleteUserFromRasbery());
                props.history.push('/');

            })
            .catch((error) => {
                console.log(error);
                console.log("error on validation invitation");
            });

    }

};



export const TurnOnMotorOperationAdmin = (props) => {
    return (next) => {
        let config = {
            headers: {
                authorization: "Bearer: " + props.user.token,
                Username: props.user.username
            }
        }

        axios.get(Url + '/RasberyOperation/TurnOnAdmin/', config

        )
            .then((response) => {
                console.log("okkkkkkkkkk");
                console.log(response.data);
                next(actionCreators.TurnOnMotor);

            })
            .catch((error) => {
                console.log(error);
                console.log("error on validation invitation");
            });

    }

};


export const TurnOnMotorOperationMember = (props) => {
    return (next) => {
        let config = {
            headers: {
                authorization: "Bearer: " + props.user.token,
                Username: props.user.username
            }
        }

        axios.get(Url + '/RasberyOperation/TurnOnMember/', config

        )
            .then((response) => {
                console.log("okkkkkkkkkk");
                console.log(response.data);
                next(actionCreators.TurnOnMotor);

            })
            .catch((error) => {
                console.log(error);
                console.log("error on validation invitation");
            });

    }

};


