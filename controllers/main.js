const CustomAPIError = require("../errors/custom-error")
const jwt = require('jsonwebtoken')



const login = (req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        throw new CustomAPIError('please provide ', 400)
    }

    const id = new Date().getDate();

    const token = jwt.sign({id, username},process.env.JWT_SECRET, {expiresIn: '30d'});
     res.status(200).json({msg: token})
    //res.send('username: '+username + 'password:'+password)
} 

const dashboard = (req, res)=>{
    const headerAuth = req.headers.authorization
    if (!headerAuth || !headerAuth.startsWith('Bearer ')){
        throw new CustomAPIError('no token no cry ', 401)
        console.log('hello b***')
    }
    const token = headerAuth.split(' ')[1]
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const luckyB = Math.floor(Math.random()*100)
        console.log(decodedToken)
        res.status(200).json({msg:`hello ${decodedToken.username}`, secret: `your secrest lucky num ${luckyB}`})
    } catch (error) {
        throw new CustomAPIError('Not a b***', 401)
    }

    
}

module.exports= {
    login, dashboard
}