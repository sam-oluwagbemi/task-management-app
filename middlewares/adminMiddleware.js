export const adminMiddleware = async (req, res, next) => {

  if(!req.user.admin) {
    return res.status(403).json({message: "Access denied. Admins only"})
  }
  next()
}