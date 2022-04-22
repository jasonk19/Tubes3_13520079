import './InvalidInput.scss';

const InvalidInput = ({ message }) => {
  return (
    <div className='InvalidInput'>
      <p>{message}</p>
    </div>
  )
}

export default InvalidInput