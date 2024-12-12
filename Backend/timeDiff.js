const timeAgo = (postTimestamp) => {
  const currentTime = new Date()
  const timeDifference = currentTime - new Date(postTimestamp)

  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return "just now"
  } else if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`
  } else if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`
  } else if (days < 7) {
    return days === 1 ? "1 day ago" : `${days} days ago`
  } else {
    const weeks = Math.floor(days / 7)
    if (weeks < 4) {
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`
    } else {
      const months = Math.floor(weeks / 4)
      if (months < 12) {
        return months === 1 ? "1 month ago" : `${months} months ago`
      } else {
        const years = Math.floor(months / 12)
        return years === 1 ? "1 year ago" : `${years} years ago`
      }
    }
  }
}
module.exports = timeAgo
