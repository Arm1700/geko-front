import React, { useState } from 'react';
import Logo from '../pages/shared/Logo';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlinePlace, MdMarkEmailRead } from 'react-icons/md';
import { routesArray } from '../../entities/routesArray';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Map, { Marker } from 'react-map-gl';
import "maplibre-gl/dist/maplibre-gl.css";
import socialsArray from '../../entities/socialsArray';


const Footer = () => {
    const { t } = useTranslation();

    const [viewport, setViewport] = useState({
        longitude: 44.521913,
        latitude: 40.189854,
        zoom: 14,
        width: '100%',
        height: '500px',

    });

    const marker = {
        longitude: 44.521913,
        latitude: 40.189854,
    };

    // Log events for debugging purposes (you can replace it with your own log function)

    return (
        <footer className="flex bg-black text-pseudo h-[auto]">
            <div
                className="md:grid flex flex-col  md:grid-cols-[1fr_max-content_1fr_min-content] md:grid-rows-[20%_1fr] justify-center px-5 py-16 mx-[auto] gap-5 max-w-[1300px]">
                <Logo />
                <div className="flex flex-col gap-5 row-start-2">
                    <div className="flex">
                        <FaPhoneAlt className="mx-2 text-primary" />
                        <p>(+374) 98 03 33 94</p>
                    </div>
                    <div className="flex">
                        <MdOutlinePlace className="mx-2 text-primary" />
                        <p className='w-[80%] middle:w-60%'>
                            {t("contact1_description")}
                        </p>
                    </div>
                    <div className="flex">
                        <MdMarkEmailRead className="mx-2 text-primary" />
                        <p>gekoeducation1@gmail.com</p>
                    </div>
                </div>
                <ul className='flex flex-col items-center content-start flex-wrap gap-3 row-span-2 col-start-2'>
                    {routesArray.map(({ path, name, id }) => {
                        return (
                            <li className='flex justify-start w-full font-bold' key={id}>
                                <Link to={path}>
                                    {t(name)}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                {/* <div className='column-start-3 row-span-2'>
                    <FacebookBox/>
                </div> */}
                <div className="map-container column-start-3 row-span-2 w-full h-[400px] rounded-md overflow-hidden">
                    <Map
                        {...viewport}
                        onMove={(evt) => setViewport(evt.viewState)}
                        mapLib={import('maplibre-gl')}
                        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
                    >
                        <Marker
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                            anchor="bottom"
                        >
                            <img src="https://cdn-icons-png.freepik.com/256/12662/12662347.png?semt=ais_hybrid"
                                width={20} alt="" />
                        </Marker>
                    </Map>
                </div>
                <ul className='column-start-4 flex gap-3'>
                    {
                        socialsArray.map(({ id, name, Icon, href }) => {
                            return (
                                <a href={href} key={id} target='_blank' rel="noopener noreferrer">
                                    <Icon title={name} key={id} className='text-white text-3xl' />
                                </a>
                            )
                        })
                    }
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
