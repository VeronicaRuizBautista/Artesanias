const GithubStrategy = require('passport-github2').Strategy;
const User = require('../../domain/models/userModel.cjs');

module.exports = (passport, path) => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
        try {
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:3000/auth/github/callback`
    }, async (accessToken, refreshToken, profile, done) => {

            const { _json } = profile
            _json.provider = profile.provider
            
            try {
                let userInstance = new User();
                let dataUser = [{
                    $match: {
                        cedula: _json.id,
                        provider: _json.provider
                    }
                }];

                let resAgregate = await userInstance.userAggregate(dataUser) // Buscamos si existe algun usuario con el correo y proveedor recibido

                // Si la longitud de lo que recibimos es diferente a cero quiere decir que ya hay un usuario de ese proveedor registrado, entonces simplemente creamos la sesion con esa data
                if (resAgregate.length) return done(null, resAgregate, {exists: true, path: path});

                // Si el programa continua quiere decir que no hay un usuario registrado de ese proveedor con ese correo

                let data = { // Preparamos la data de insercion
                    cedula: _json.id,
                    names: _json.login,
                    surnames: 'Not assigned',
                    email: _json.email ? _json.email : 'Not assigned',
                    photo: _json.avatar_url,
                    provider: _json.provider,
                    nick: _json.name,
                    phone: "Not assigned",
                    role: "Usuario Estandar",
                    password: "Not assigned"
                }

                await userInstance.createUser(data) // Creamos el usuario en la Base de datos
                done(null, data, {exists: false, path: path}); // Creamos la sesion de passport con la data obtenida
            } catch (error) {
                console.error('Error saving/updating user:', error);
                done(error, null);
            }

        }
    ))


}