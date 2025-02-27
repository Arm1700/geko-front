import React, { useLayoutEffect, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Skeleton from "react-loading-skeleton";

import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const CourseSlider = () => {
    const nav = useNavigate();
    const [slidesToShow, setSlidesToShow] = useState(6);
    const [spaceBetween, setSpaceBetween] = useState(30);

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useLayoutEffect(() => {
        const updateSlidesToShow = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 992) {
                setSlidesToShow(6);
                setSpaceBetween(30);
            } else if (screenWidth >= 640) {
                setSlidesToShow(4);
                setSpaceBetween(10);
            } else {
                setSlidesToShow(2);
                setSpaceBetween(30);
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const { categories, getImageUrl, loading, renderBullet } = useContext(DataContext);

    const shouldLoop = categories.length > slidesToShow;
    return (
        <div className="popularDiv max-w-[1280px] mx-auto max:px-0 py-16 px-[5px]">
             {loading ? (
               <div className={`grid grid-cols-${slidesToShow} justify-between gap-5`}>
                   {Array.from({ length: slidesToShow }).map((_, index) => (
                       <Skeleton key={index} className="w-full mb-[40px] rounded-lg"
                       style={{ aspectRatio: "1 / 1" }} /> // Настройка Skeleton
                   ))}
               </div>
           ) : (
                <Swiper
                    modules={[Pagination, A11y, Autoplay]}
                    spaceBetween={spaceBetween}
                    slidesPerView={slidesToShow}
                    loop={shouldLoop}
                    pagination={{
                        type: "bullets",
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 2,
                        renderBullet,
                    }}
                    speed={500}
                    autoplay={{
                        delay: 1500,
                    }}
                >
                    {categories.map(({ image, id, translation }) => (
                        <SwiperSlide key={id} className="flex justify-center">
                            <article
                                onClick={() => nav(`/course-category/${id}`)}
                                className="cursor-pointer flex-wrap img-wrapper mb-[40px] relative rounded-lg overflow-hidden w-full flex flex-col justify-center items-center"
                                style={{ aspectRatio: "1 / 1" }}>
                                <img
                                    className="inner-img absolute inset-0 w-full object-cover"
                                    src={getImageUrl(image)}
                                    alt="Course"
                                    style={{
                                        filter: 'brightness(50%)',
                                        display: imageLoaded ? 'block' : 'none'
                                    }}
                                    onLoad={handleImageLoad}
                                />
                                {!imageLoaded && <Skeleton style={{ aspectRatio: "1 / 1" }} />}
                                <p className="absoluteP absolute font-bold text-pseudo hover:text-primary text-base font-roboto-slab top-[50%] left-[50%] w-[90%] text-center z-50 uppercase">
                                    {translation.text}
                                </p>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default CourseSlider;
