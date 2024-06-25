import '../../styles/dashboard/homepage.css'
import { saveTittlePage } from '../../utils/tittlePage'

const HomePageD = () => {
  saveTittlePage("Pagina Principal")
  return (
    <div>      
      <div className="container-fluid hp--labels">

        <div className="label-info flex-fill">

          <div className="desc-lbf">
            <h4>300</h4>
            Ordenes creadas
          </div>

        </div>

        <div className="label-info flex-fill">

          <div className="desc-lbf">
            <h4>2</h4>
            Ordenes procesadas
          </div>

        </div>

        <div className="label-info flex-fill">

          <div className="desc-lbf">
            <h4>300</h4>
            Ordenes creadas
          </div>

        </div>

        <div className="label-info flex-fill">

          <div className="desc-lbf">
            <h4>300</h4>
            Ordenes creadas
          </div>

        </div>

      </div>
    </div>
  )
}

export default HomePageD
