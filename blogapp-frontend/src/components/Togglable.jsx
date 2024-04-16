import { useState, useImperativeHandle, forwardRef } from 'react'
import Button from 'react-bootstrap/Button';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '', margin: '10px 0' }
  const showWhenVisible = { display: visible ? '' : 'none', margin: '10px 0' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="secondary" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
  
})
Togglable.displayName = 'Togglable'

export default Togglable