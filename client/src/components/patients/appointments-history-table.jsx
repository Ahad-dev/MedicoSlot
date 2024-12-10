import Table from '@/components/common/Table'
import { getData } from '@/data/patient/patient'
import { uncommingAppointmentsColumns } from '@/data/patient/colums'

const AppointmentsHistoryTable = () => {
    const data = getData()
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
