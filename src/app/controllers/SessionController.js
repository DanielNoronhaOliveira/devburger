import * as Yup from "yup";
import jwt from 'jsonwebtoken'
import authConfig from "../../config/auth"
import User from "../models/User";

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body);

    const userEmailOrPasswordIncorrect = () =>{
      return response
        .status(401)
        .json({ error: 'email ou senha incorretos.'});
    }

    if (!isValid){
      return userEmailOrPasswordIncorrect();
    }
    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return userEmailOrPasswordIncorrect();
    
    }
    
    const isSamepassword = await user.checkPassword(password);

    if(isSamepassword){
      return userEmailOrPasswordIncorrect();
    }
    
    return response.status(201).json({
        id: user.id,  
        name: user.name, 
        email,
        admin: user.admin,
        token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        }),
    })
  }
}

export default new SessionController();
