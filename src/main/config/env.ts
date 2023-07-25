export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/green-pie-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H',
  coverallsRepoToken: process.env.COVERALLS_REPO_TOKEN || 'PYTfVvHSxC5rEcgm7ht7BiObucFiRGUjk'
}
