const DiscordStrategy = require('passport-discord').Strategy;
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

    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: `http://localhost:3000/${path}/auth/discord/callback`,
        scope: ['identify', 'email']
        }, async (accessToken, refreshToken, profile, done) => {

            try {
                let userInstance = new User();
                let dataUser = [{
                    $match: {
                        email: profile.email,
                        provider: profile.provider
                    }
                }];

                let resAgregate = await userInstance.userAggregate(dataUser) // Buscamos si existe algun usuario con el correo y proveedor recibido
                console.log('Llega hasta aca', path)
                // Si la longitud de lo que recibimos es diferente a cero quiere decir que ya hay un usuario de ese proveedor registrado, entonces simplemente creamos la sesion con esa data
                if (resAgregate.length) return done(null, resAgregate, {exists: true, path: path});
                console.log('a crear')
                // Si el programa continua quiere decir que no hay un usuario registrado de ese proveedor con ese correo

                let data = { // Preparamos la data de insercion
                    cedula: profile.id,
                    names: profile.username,
                    surnames: "Not assigned",
                    email: profile.email,
                    photo: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
                    provider: profile.provider,
                    nick: profile.global_name,
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