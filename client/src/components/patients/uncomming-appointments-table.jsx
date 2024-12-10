import Table from '@/components/common/Table'
import { getData } from '@/data/patient/patient'
import { uncommingAppointmentsColumns } from '@/data/patient/colums'

const UncommingAppointmentsTable = () => {
    const data = getData()
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
