import { ReactNode } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";


function CardCarousel({ id, Card, data }) {
  return (
    <div className="relative">
      {/* <div className="text-center py-4  text-xl font-bold"></div> */}
      <div
        id={id}
        className="carousel flex items-center justify-start space-x-4 p-2 overflow-x-auto scroll-smooth  scrollbar-hide"
      >
        {data?.map((c, index) => {
          return <Card {...c} key={c._id || index} />;
        })}
      </div>
    </div>
  );
}

export default CardCarousel;
