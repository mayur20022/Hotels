const Person = require("./models/Person")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy


passport.use(new LocalStrategy(async (User, password, done) => {
    try {
        const user = await Person.findOne({ username: User })
        if (!user) {
            return done(null, false, { message: 'Invalid username' })
        }
        const ispassword = await user.comparePassword(password)
        if (ispassword) {
            done(null, user)
        } else {
            done(null, false, { message: 'Invalid password' })
        }

    } catch (error) {
        return done(error)
    }
}))



module.exports = passport;