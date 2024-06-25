import {Spinner} from 'reactstrap'

const LoadingScreen = () => {
  return (
    <div className="screen--loadingbackground">
      <Spinner className='is-spinnerloading'/>
    </div>
  )
}

export default LoadingScreen
