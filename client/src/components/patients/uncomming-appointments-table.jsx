import Table from '@/components/common/Table'
import { getData } from '@/data/patient/patient'
import { uncommingAppointmentsColumns } from '@/data/patient/colums'
import { useEffect, useState } from 'react'
import { getUncommingAppointments } from '@/services/Patient'

const UncommingAppointmentsTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getUncommingAppointments().then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])
  return (
    <Table
        headerLabel="Uncomming Appointments"
        data={data}
        columns={uncommingAppointmentsColumns}
        DetailLink={"/patient/appointments"}
    ></Table>
  )
}

export default UncommingAppointmentsTable
