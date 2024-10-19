const { Binary } = require('mongodb')

const LocalStrategy = require('passport-local').Strategy;
const User = require('../../domain/models/userModel.cjs');

module.exports = (passport) => {
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

    passport.use('local', new LocalStrategy(
        async (username, password, done) => {
            //return done(null, {username, password})
            
            try {
                let userInstance = new User();
                let dataUser = [
                    {
                    $match: {
                      $or: [
                        {nick: username},
                        {phone: username},
                        {email: username}
                      ],
                      provider: 'ruraqmaki'
                    }
                  }
                  ];
          
                let resAgregate = await userInstance.userAggregate(dataUser)
                
                if(!resAgregate.length) return done(null, false);

                const isValidaPassword = await userInstance.validatePassword(password, resAgregate[0].password);
                
                if (resAgregate[0]['photo'] instanceof Binary) resAgregate[0]['photo'] = `data:${resAgregate[0].mimetype};base64,${resAgregate[0].photo.buffer.toString('base64')}`

                if (isValidaPassword) return done(null, resAgregate);
              
                return done(null, false);
                
              } catch (error) {
                console.error('Error saving/updating user:', error);
                done(error, null);
              }
        }
    ));
}