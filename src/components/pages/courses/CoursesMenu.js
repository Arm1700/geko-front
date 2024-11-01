import {Link} from 'react-router-dom';
import {FiX} from 'react-icons/fi';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from "react";

export default function CoursesMenu({isOpen, toggleMenu, categoryId}) {
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [coursesArray, setCoursesArray] = useState([])

    // Запрос для получения категорий
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:8000/api/categories/?language=${language}`);
                const response = await fetch(`https://dev.gekoeducation.com/api/categories/?language=${language}`);
                const data = await response.json();
                setCoursesArray(data); // Сохранение категорий в состояние
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [language]);

    return (
        <div
            className={`fixed capitalized bg-pseudo w-[50%] inset-0 z-50 overflow-y-auto transition-transform duration-300 transform ${
                isOpen ? 'translate-x-full' : 'translate-x-[200%]'
            }`}
        >
            <div className="bg-gray-400 w-full h-[60px] flex items-center justify-between pl-3 pr-5">
                <h1 className="text-primary min-w-max text-2xl font-roboto-slab font-bold">
                {t('Categories')}

                </h1>
                <button onClick={toggleMenu}>
                    <FiX className="w-6 h-6"/>
                </button>
            </div>
            <div>
                {coursesArray.sort((a, b) => a.translation.text.localeCompare(b.translation.text)).map(({id, translation}) => (
                    <Link
                        onClick={toggleMenu}
                        className={`block px-3 py-2 rounded-md hover:text-primary font-bold ${+categoryId === id ? "text-primary" : "text-color12"}`}
                        key={id} to={`/course-category/${id}`}>
                        {translation.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}




    