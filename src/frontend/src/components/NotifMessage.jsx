import './NotifMessage.scss';

const NotifMessage = ({ message, bcolor }) => {
  const color = {
    background: bcolor === "red" ? '#E74F48' : '#03B575'
  }
  return (
    <div className='NotifMessage' style={color} >
      <p>{message}</p>
    </div>
  )
}

export default NotifMessage