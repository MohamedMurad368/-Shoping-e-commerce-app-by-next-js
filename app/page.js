import CarouselPage from "./Component/Carousel/CarouselPage";
import Reviews from './Component/Reviews/Reviews'
import Products from './products/page'
import BestSellers  from './Component/BestSellers/BestSellers'
export default function Home() {
  return (
    <div className="p-5">
      <div className="p-5">      <CarouselPage />
      </div>

      <div>
        <BestSellers/>
         <Products/>
      </div>
      <div>
        <Reviews/>
      </div>
    </div>
  );
}
