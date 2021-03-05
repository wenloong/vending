import { Soda } from './Soda'
import { useHistory } from 'react-router-dom'

interface Props {
  soda: Soda
}

const SodaItem = (props: Props) => {
  const { soda } = props;
  const history = useHistory()

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/sodas/delete/${id}`, {
        method: "DELETE"
      })
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <tr className="SodaItem">
      <td>{soda.productName}</td>
      <td>{soda.cost}</td>
      <td>{soda.maxQuantity}</td>
      <td>{soda.description}</td>
      <td><button className="Button--edit" onClick={() => history.push(`/sodas/${soda._id}/edit`)}>Edit</button></td>
      <td><button className="Button--delete" onClick={() => soda._id && handleDelete(soda._id)}>Delete</button></td>
    </tr>
  )
}

export default SodaItem