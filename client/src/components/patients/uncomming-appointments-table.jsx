import Table from '@/components/common/Table'


const UncommingAppointmentsTable = ({data,columns}) => {

  return (
    <Table
        headerLabel="Uncomming Appointments"
        data={data}
        columns={columns}
        DetailLink={"/patient/appointments"}
    ></Table>
  )
}

export default UncommingAppointmentsTable
