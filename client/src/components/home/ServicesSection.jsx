import { services } from '@/lib/Services'
import ServiceCard from './ServiceCard'

const ServicesSection = () => {
  return (
    <div className='space-y-8'>
      <h1 className='text-Primary-dark-blue font-semibold text-3xl text-center'>Services Provided</h1>
      <div className='flex justify-around'>

      {
        services.map(service=>(
          <ServiceCard key={service.title} service={service}/>
        ))
      }
      </div>

    </div>
  )
}

export default ServicesSection
