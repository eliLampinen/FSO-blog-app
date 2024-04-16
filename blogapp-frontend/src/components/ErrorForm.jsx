
import { useSelector } from 'react-redux'

export const ErrorForm = () => {
    const notification = useSelector(state => state.notification)

    if (!notification) return null

    const backgroundColor = notification.startsWith('wrong credentials') ? '#f44336' : '#4CAF50'
    return (
      <div 
      id="error"
      style={{
        color: 'white',
        backgroundColor: backgroundColor,
        padding: '10px',
        margin: '10px 0',
        border: '1px solid red',
        borderLeft: '6px solid darkred',
      }}>
        <h2>{notification}</h2>
      </div>
    )
  }