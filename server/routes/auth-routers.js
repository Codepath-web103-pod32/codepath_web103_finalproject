import express from "express"
import passport from "passport"

const router = express.Router()

const API_URL = process.env.REACT_APP_BACKEND_URL || ''

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user
    })
  }
})

router.get('/login/fail', (_, res) => {
  res.status(401).json({
    success: false,
    message: 'failure'
  })
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }

    req.session.destroy((err) => {
      res.clearCookie('connect.sid')

      res.json({
        status: 'logout',
        user: {},
      })
    })
  })
})

router.get('/github', passport.authenticate(
  'github',
  {
    scope: ['read:user']
  }
))

router.get('/github/callback', passport.authenticate('github', {
  successRedirect: `${API_URL}/`,
  failureRedirect: `${API_URL}/login`
}))

export default router