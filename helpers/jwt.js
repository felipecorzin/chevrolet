const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generarJWT = ( _id, name ) => {

    const payload = { _id, name };
    
    return new Promise( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token ) => {
    
            if ( err ) {
                // TODO MAL
                console.log(err);
                reject(err);
    
            } else {
                // TODO BIEN
                resolve( token  )
            }
        })
    });
};

const comprobarTokenUsuario = ( req, res, next) => {
  const userToken = req.get('x-token') || '';
  comprobarToken( userToken )
  .then(  (decoded) => {
      console.log('Decoded', decoded );
      req.user = decoded.user;
      next();
  })
  .catch( err => {

      res.json({
          ok: false,
          mensaje: 'Token no es correcto'
      });

  });

};
module.exports = { 
    generarJWT,
    comprobarTokenUsuario
}
