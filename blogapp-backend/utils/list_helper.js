
const logger = require('../utils/logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  logger.info("Total likes from blogs: ")
  logger.info(likes);
  return likes
}

const favoriteBlog = (blogs) => {
  const itemWithMostLikes = blogs.reduce((max, item) => {
    return (item.likes > max.likes) ? item : max;
  }, blogs[0]);
  logger.info("Most liked blog: ")
  logger.info(itemWithMostLikes)
  return itemWithMostLikes
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

