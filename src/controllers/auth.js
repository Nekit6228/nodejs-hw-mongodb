import { ONE_DAY } from "../constants/index.js";
import { loginUser, logoutUser, refreshUsersSession, registerUser } from "../services/auth.js";

const setupSession = (res,session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserController = async (req,res)=>{
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        massage: 'Successfully registered a user!',
        data:user,
    });
};


export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

   setupSession(res, session);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
       sessionId: session._id,
    },
  });
};


export const logoutUserController = async (req,res) => {
  if(req.cookie.sessionId){
    await logoutUser(req.cookie.sessionId);
  };

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};



export const refreshUserSessionController = async (req,res) => {
    const session = await refreshUsersSession({
      sessionId: req.cookie.sessionId,
      refreshToken: req.cookie.refreshToken,
    });

    setupSession(res,session);

    res.json({
        status: 200,
        massage:'Successfully refreshed a session!',
        data:{
          accessToken: session.accessToken,
        }
    });
};


