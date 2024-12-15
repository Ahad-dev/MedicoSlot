import Table from '@/components/common/Table'

const AppointmentsHistoryTable = ({data,columns}) => {
  
  return (
    <Table
        headerLabel="Appointments History"
        data={data}
        columns={columns}
        DetailLink={"/patient/appointments-history"}
    ></Table>
  )
}

export default AppointmentsHistoryTable
