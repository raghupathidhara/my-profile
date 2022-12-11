// social media details

const social = (req, res) => {
  const { linkedIn, instagram, youtube, facebook, github } = req.body

  const socialDetails = {
    linkedIn,
    instagram,
    youtube,
    facebook,
    github,
  }

  return socialDetails
}

const mobile = (req, res) => {
  const { primary, secondary } = req.body
  return {
    primary: primary,
    secondary: secondary,
  }
}

const skills = (req, res) => {
  const { skillName, level } = req.body

  const skillDetails = {
    skillName: skillName,
    level: level,
  }

  return skillDetails
}

const experience = (req, res) => {
  const { companyName, location, yoe, from, to, current, position } = req.body

  const details = {
    companyName: companyName,
    location: location,
    position: position,
    yoe: yoe,
    from: new Date(from),
    to: new Date(to),
    current: current,
  }

  return details
}

const project = (req, res) => {
  const { projectName, projectUrl,details, duration, from, to, current } = req.body

  const project_details = {
    projectName: projectName,
    projectUrl: projectUrl,
    details: details,
    duration: duration,
    from: new Date(from),
    to: new Date(to),
    current: current,
  }

  return project_details
}

const achievement = (req, res) => {
  const { name, details, date, url } = req.body

  const detailObj = {
    name: name,
    details: details,
    date: new Date(date),
    url: url,
  }

  return detailObj
}

const extraImages = (req, res) => {
  const { name, description, image } = req.body

  return {
    name,
    description,
    image,
  }
}

const extraVideo = (req, res) => {
  const { name, video, description } = req.body

  const details = {
    name,
    description,
    video,
  }

  return details
}

const education = (req, res) => {
  const { college, degree, yop, percentage, cgpa, stream } = req.body

  const details = {
    college: college,
    degree: degree,
    yop: yop,
    percentage: percentage,
    cgpa: cgpa,
    stream: stream,
  }

  return details
}

const profileObj = {
  social,
  mobile,
  skills,
  project,
  experience,
  achievement,
  extraImages,
  extraVideo,
  education,
}
module.exports = profileObj
