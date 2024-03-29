import Header from "../components/Header"
import CameraView from '../components/camera/CameraView'
import '../style/Camera.css'

export default function Camera() {

  return (
    <div>
      <Header />
      <h1>Bienvenue sur la page Caméra</h1>
      <CameraView />
    </div>
  )
}
