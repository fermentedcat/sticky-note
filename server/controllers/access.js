const Access = require('../models/Access')
const User = require('../models/User')

exports.addNew = async (req, res, next) => {
  const data = req.body
  try {
    const savedAccess = await new Access(data).save()
    const user = await User.findById(data.user)
    const access = {
      _id: savedAccess._id,
      stack: savedAccess.stack,
      user: user
    }
    res.status(201).json(access)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deleteOwn = async (req, res, next) => {
  const stackId = req.params.stackId
  const { userId } = req.user
  try {
    const access = await Access.findOneAndDelete({
      stack: stackId,
      user: userId
    })
    if (!access) res.sendStatus(404)
    else res.sendStatus(204)
  } catch (error) {
    res.status(500).json(error)
  }
}
