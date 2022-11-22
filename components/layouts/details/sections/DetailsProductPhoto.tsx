import Slider from "react-slick";
import { useRecoilState } from "recoil";
import { DetailsAtom } from "../../../../helpers/recoil";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`details_photo_secound_Arrow `}
      onClick={onClick}
    >
      <svg
        className="details_secound_svg"
        viewBox="0 0 11 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.18954 15.5175L1.18953 15.5176C1.11941 15.5877 1.06378 15.6709 1.02583 15.7625C0.987881 15.8542 0.968348 15.9524 0.968348 16.0515C0.968348 16.1507 0.987881 16.2489 1.02583 16.3405C1.06378 16.4322 1.11941 16.5154 1.18953 16.5855C1.25966 16.6556 1.3429 16.7113 1.43453 16.7492C1.52615 16.7872 1.62435 16.8067 1.72352 16.8067C1.82269 16.8067 1.92089 16.7872 2.01251 16.7492C2.10413 16.7113 2.18738 16.6556 2.2575 16.5855L9.80989 9.03314L9.81 9.03303L1.18954 15.5175ZM1.18954 15.5175L8.20929 8.49904M1.18954 15.5175L8.20929 8.49904M9.80989 7.96494C9.88014 8.03502 9.93588 8.11826 9.97391 8.20991C10.0119 8.30156 10.0315 8.39981 10.0315 8.49904C10.0315 8.59827 10.0119 8.69652 9.97391 8.78817L9.85846 8.74026L9.80989 7.96494ZM9.80989 7.96494L2.25761 0.412666M9.80989 7.96494L2.25761 0.412666M2.25761 0.412666C2.2576 0.412649 2.25758 0.412631 2.25756 0.412614L2.2575 0.412554L2.25761 0.412666ZM8.20929 8.49904L1.18964 1.48064C1.18962 1.48061 1.18957 1.48056 1.18954 1.48053C1.11933 1.41048 1.06364 1.32728 1.02562 1.23567C0.987593 1.14402 0.968018 1.04577 0.968018 0.94654C0.968018 0.847314 0.987593 0.749063 1.02562 0.657413C1.06365 0.565764 1.11939 0.482518 1.18964 0.412443L1.27792 0.500943L8.20929 8.49904Z"
          fill="black"
          stroke="black"
          strokeWidth="0.25"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`details_photo_First_Arrow`}
      onClick={onClick}
    >
      <svg
        className="details_first_svg"
        viewBox="0 0 11 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.81046 15.5175L9.81047 15.5176C9.88059 15.5877 9.93622 15.6709 9.97417 15.7625C10.0121 15.8542 10.0317 15.9524 10.0317 16.0515C10.0317 16.1507 10.0121 16.2489 9.97417 16.3405C9.93622 16.4322 9.88059 16.5154 9.81047 16.5855C9.74034 16.6556 9.6571 16.7113 9.56547 16.7492C9.47385 16.7872 9.37565 16.8067 9.27648 16.8067C9.17731 16.8067 9.07911 16.7872 8.98749 16.7492C8.89587 16.7113 8.81262 16.6556 8.7425 16.5855L1.19011 9.03314L1.19 9.03303L9.81046 15.5175ZM9.81046 15.5175L2.79071 8.49904M9.81046 15.5175L2.79071 8.49904M1.19011 7.96494C1.11986 8.03502 1.06412 8.11826 1.02609 8.20991C0.988059 8.30156 0.968483 8.39981 0.968483 8.49904C0.968483 8.59827 0.98806 8.69652 1.02609 8.78817L1.14154 8.74026L1.19011 7.96494ZM1.19011 7.96494L8.74239 0.412666M1.19011 7.96494L8.74239 0.412666M8.74239 0.412666C8.7424 0.412649 8.74242 0.412631 8.74244 0.412614L8.7425 0.412554L8.74239 0.412666ZM2.79071 8.49904L9.81036 1.48064C9.81038 1.48061 9.81043 1.48056 9.81046 1.48053C9.88067 1.41048 9.93636 1.32728 9.97438 1.23567C10.0124 1.14402 10.032 1.04577 10.032 0.94654C10.032 0.847314 10.0124 0.749063 9.97438 0.657413C9.93635 0.565764 9.88061 0.482518 9.81036 0.412443L9.72208 0.500943L2.79071 8.49904Z"
          fill="black"
          stroke="black"
          strokeWidth="0.25"
        />
      </svg>
    </div>
  );
}

const  DetailsProductPhoto = () => {
  const [detailsState, setDetailsState] = useRecoilState(DetailsAtom);

  const settings = {
    customPaging: function (i: number) {
      return (
        <a   className="product-slider-img">
          {detailsState.product?.images &&
              (
              <img
                width={75}
                height={75}
                src={detailsState.product.images[i]?.path}
              />
            )}
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dotss slick-thumbb " ,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
    
  };
  return (
    <div className=" border">
      <Slider {...settings}>
        {detailsState.product?.images && detailsState.product.images.length !==0 ?
          detailsState.product.images.map((img) => {
            return (
              <div key={img.id} className="product-slider-img">
                <img  className="details_Photo "  src={img.path} />
              </div>
            );
          }) :
          <div className="md:ml-36 lg:ml-24">
            <img width={400} height={400} src="alternative.png" />
          </div>
          }
      </Slider>
    </div>
  );
};
export default DetailsProductPhoto;
