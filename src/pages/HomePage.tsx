import Advertisement from '@/components/Advertisement'
import BestSeller from '@/components/BestSeller'
import Category from '@/components/Category'
import Slide from '@/components/Slide'

const HomePage = () => {
  return (
    <div>
      <Slide />
      <Category />
      <BestSeller />
      <Advertisement />
    </div>
  )
}

export default HomePage