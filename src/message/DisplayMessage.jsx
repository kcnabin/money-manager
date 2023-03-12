

const DisplayMsg = ({ text }) => {
  if (text) {
    return (
      <h2>{text}</h2>
    )
  }
  return null
}

export default DisplayMsg