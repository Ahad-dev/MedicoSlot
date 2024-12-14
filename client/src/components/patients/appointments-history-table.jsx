import Table from '@/components/common/Table'
import { uncommingAppointmentsColumns } from '@/data/patient/colums'
import { getAppointmentHistory } from '@/services/Patient'
import { useEffect, useState } from 'react'

const AppointmentsHistoryTable = () => {
        const [data, setData] = useState([])
        const [loading, setLoading] = useState(true)
        useEffect(() => {
            getAppointmentHistory().then((data) => {
                setData(data)
                setLoading(false)
            })
        }, [])    
  return (
    <Table
        headerLabel="Appointments History"
        data={data}
        columns={uncommingAppointmentsColumns}
        DetailLink={"/patient/appointments-history"}
    ></Table>
  )
}

export default AppointmentsHistoryTable
