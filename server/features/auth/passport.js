import { Strategy as LocalStrategy } from 'passport-local';
import User from '../user/User';

export default passport => {
	passport.serializeUser(( user, done ) => {
		done(null, user.id);
	});

	passport.deserializeUser(( id, done ) => {
		User.findById( id, ( err, user ) => {
			done( err, user );
		});
	});

	passport.use(`local-signup`, new LocalStrategy({
		  usernameField: `email`
		, passwordField: `password`
		, passReqToCallback: true
	}, ( req, email, password, done ) => {
		User.findOne({ email }, ( err, user ) => {
			if ( err ) {
				return done( err );
			}

			if ( user ) {
				return done( null, false );
			}

			let newUser = new User({ email });
			newUser.password = newUser.generateHash( password );

			if ( req.body.admin ) {
				newUser.admin = true;
			}

			if ( req.body.mentor ) {
				newUser.mentor = true;
			}

			newUser.save( ( err, user ) => {
				if ( err ) {
					throw err;
				}

				return done( null, user );
			});

		});
	}));

	passport.use(`local-login`, new LocalStrategy({
		  usernameField: `email`
		, passwordField: `password`
		, passReqToCallback: true
	}, ( req, email, password, done ) => {
		User.findOne({ email }, ( err, user ) => {
			if ( err ) {
				return done( err );
			}

			if ( !user ) {
				return done( null, false );
			}

			if ( !user.validatePassword( password ) ) {
				return done( null, false );
			}

			return done( null, user );
		});
	}));
}