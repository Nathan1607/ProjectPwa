import Header from "../components/header/Header"
import CameraView from '../components/camera/CameraView'
import '../style/Camera.css'

export default function Camera() {

  return (
    <div>
      <Header />
      <h1 className="title">Bienvenue sur la page Caméra</h1>
      <CameraView />
    </div>
  )
}
