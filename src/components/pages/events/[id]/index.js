import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'
import {FaMapMarkerAlt} from "react-icons/fa";
import {TbClockHour9} from 'react-icons/tb'
import {FaFlag} from "react-icons/fa";
import Error404 from '../../shared/Error'

import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import {useTranslation} from 'react-i18next';

// import {t} from "i18next";
export default function EventsPage() {
    const { t, i18n } = useTranslation();
    const language = i18n.language; // Получаем текущий язык
    const { id: eventId } = useParams();
    const nav = useNavigate();
    const [eventsArray, setEventsArray] = useState([]);

    // Загружаем события на основе языка
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:8000/api/events/?language=${language}`);
                const response = await fetch(`https://dev.gekoeducation.com/events/?language=${language}`);
                const data = await response.json();
                setEventsArray(data); // Сохраняем данные в состояние
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [language]);

    // Находим выбранное событие
    const pickedEvent = eventsArray?.find(el => el.id === +eventId);
    return (
        <section className="md:before:h-[22%] before:h-[0] py-5 relative pb-5">
            {pickedEvent?.id ? (
                <>
                    <article className="grid  md:grid-cols-[75%_1fr] grid-cols-1 max-w-[1300px] mx-[auto] relative">
                        <div className="flex flex-col gap-[20px] px-5">
                            <p className="text-5xl text-primaryDark font-roboto-slab font-bold">{t("EVENTS")}</p>
                            <p className="text-2xl font-bold text-primaryDark font-roboto-slab">{t(pickedEvent.translation.title)}</p>
                            {/*<img src={pickedEvent.image} alt=""/>*/}
                            <article className={'w-full '}>
                                <Swiper
                                    loop={true}
                                    modules={[Pagination, A11y]}
                                    speed={500}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                >
                                    {pickedEvent.image.map((value, index) => (
                                        <SwiperSlide key={index}

                                                     style={{
                                                         display: 'flex',
                                                         justifyContent: 'center',
                                                     }}
                                        >
                                            <img src={pickedEvent.image[index]} alt="" className='h-full w-full object-cover]'/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </article>
                        </div>

                        <div
                            className="flex  flex-col lg:mx-1 mx-5  md:sticky static border-[1px]  top-1 mt-8  h-min  gap-[10px] bg-pseudo">
                            <div className="w-full bg-primary text-white">
                                <p className="text-2xl font-roboto-slab-sans font-bold text-center p-5">{t(pickedEvent.translation.title)}</p>
                            </div>

                            <div className="flex flex-col justify-start items-start px-[20px] py-[20px] gap-[20px]">
                                <button
                                    onClick={() => nav(`/contacts`)}
                                    className="self-center w-[100%] py-[10px] px-[25px] text-white rounded-[4px] uppercase font-bold text-sm bg-primary">sign
                                    up
                                </button>
                                <h1 className="text-center pb-3 font-roboto-slab text-color66">
                                    Register and take part in the events!
                                </h1>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-[75%_20%] justify-between grid-cols-1 py-5 px-5">
                            <div className="text-start pt-5 flex flex-col gap-3">
                                <h1 className="text-2xl font-roboto-slab font-bold text-primaryDark uppercase">
                                    {t("event_description")}
                                </h1>
                                <p className="text-custom-15 text-color60">{t(pickedEvent.translation.description)}</p>
                                {/*<h1 className="text-2xl font-roboto-slab font-bold text-primaryDark">*/}
                                {/*    EVENT CONTENT*/}
                                {/*</h1>*/}
                                {/*<ul className="list-none text-primary">*/}
                                {/*    {pickedEvent.outcomed?.map((el, i) => {*/}
                                {/*        return (*/}
                                {/*            <li*/}
                                {/*                key={i}*/}
                                {/*                className="text-md flex items-center text-secondaryLight"*/}
                                {/*            >*/}
                                {/*                <span className="w-[6px] h-[6px] bg-primary rounded-full mr-2"></span>*/}
                                {/*                <p className="pl-3 ">*/}
                                {/*                    {el}*/}
                                {/*                </p>*/}
                                {/*            </li>*/}
                                {/*        )*/}
                                {/*    })}*/}
                                {/*</ul>*/}
                                <div className="flex items-center">
                                    <p className="text-color66 capitalize">{t("share")}:</p>
                                    <ul className="flex px-[9px] justify-center items-center gap-3">
                                        <li className="flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full opacity-50">
                                            <i className="fa fa-facebook-f"></i>
                                        </li>
                                        <li className="flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full opacity-50">
                                            <i className="fa fa-instagram"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col ">
                                    <div
                                        className="flex gap-3 text-color60 text-custom-15 border-b-[2px] border-colorF2 py-3">
                                        <TbClockHour9 className="text-primary"/>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-primaryDark font-bold">Start Time</p>
                                            <p>8:00 am</p>
                                            <p>30/07/2021</p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex gap-3 text-color60 text-custom-15 border-b-[2px] border-colorF2 py-3">
                                        <FaFlag className="text-primary"/>
                                        <div className="flex flex-col gap-1 ">
                                            <p className="text-primaryDark font-bold">Finish Time</p>
                                            <p>8:00 am</p>
                                            <p>30/07/2021</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 text-color60 text-custom-15 py-3">
                                        <FaMapMarkerAlt className="text-primary"/>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-primaryDark font-bold">Address</p>
                                            <p>
                                                Venice, Italy
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </>
            ) : (
                <Error404/>
            )}
        </section>
    )
}
