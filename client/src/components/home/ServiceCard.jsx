import {
    Card,
    CardHeader,
    CardContent
}from "@/components/ui/card"

const ServiceCard = ({service}) => {
  return (
    <Card className="flex justify-center items-center flex-col w-64 hover:border-blue-500 transition-all duration-200 shadow-lg hover:scale-105 ">
        <CardHeader>
          <img src={service.header} className="" width={100} alt={service.title} />
        </CardHeader>
        <CardContent className="text-center">
          <h1 className='text-Primary-dark-blue font-semibold text-lg text-center'>{service.title}</h1>
        </CardContent>
    </Card>
  )
}

export default ServiceCard
