import React from 'react';
import Logo from '../pages/shared/Logo';
import {FaPhoneAlt} from 'react-icons/fa';
import {MdOutlinePlace} from 'react-icons/md';
import {MdMarkEmailRead} from 'react-icons/md';
import {routesArray} from '../../entities/routesArray';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import socialsArray from '../../entities/socialsArray';

const Footer = () => {
    const {t} = useTranslation()
    return (
        <footer className="bg-black text-pseudo h-[auto]">
            {/*<div*/}
            {/*    className="flex middle:flex-row flex-col middle:items-center justify-between px-5 py-20 mx-[auto] gap-5 max-w-[1300px]">*/}
            <div
                className="flex middle:grid middle:grid-cols-[1fr_2fr_1fr] flex-col middle:items-center justify-center items-center px-5 py-20 mx-[auto] gap-5 max-w-[1300px]">
                <div className="flex flex-col gap-5">
                    <Logo/>
                    <p className="flex">
                        <FaPhoneAlt className="mx-2 text-primary"/>
                        (+374) 98 03 33 94
                    </p>
                    <p className="flex">
                        <MdOutlinePlace className="mx-2 text-primary"/>
                        <p className=' w-[100%] middle:w-60%'>
                            {t("contact1_description")}
                        </p>
                    </p>
                    <p className="flex">
                        <MdMarkEmailRead className="mx-2 text-primary"/>
                        gekoeducation1@gmail.com
                    </p>
                </div>
                <ul className='flex content-start middle:flex-row flex-col justify-center flex-wrap gap-3 middle:order-none order-2 text-color99'>
                    {routesArray.map(({path, name, id}) => {
                        return (
                            <li className='' key={id}>
                                <Link to={path}>
                                    {t(name)}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <ul className='flex gap-3 middle:justify-center'>
                    {
                        socialsArray.map(({id, name, Icon}) => {
                            return (
                                <Icon title={name} key={id} className='text-primary text-3xl'/>
                            )
                        })
                    }
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
