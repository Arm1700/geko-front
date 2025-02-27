import PopularCourse from '../shared/home/PopularCourse';
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useContext, useState } from 'react';
import CoursesMenu from "./CoursesMenu";
import { useTranslation } from 'react-i18next';
import { DataContext } from "../context/DataProvider";

export default function Courses() {
    const { t } = useTranslation();
    const {
        categories,
        courses,
        getCoursesByCategory,
    } = useContext(DataContext);
    const [gridStyleTF, setGridStyle] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const nav = useNavigate();
    const { id: initialCategoryId } = useParams();
    const [categoryId, setCategoryId] = useState(initialCategoryId || '');
    const [showMenu, setShowMenu] = useState(false);
    const coursesPerPage = 6;
    const handleCategoryClick = (id) => {
        setCategoryId(id);
        setCurrentPage(1);
        nav(id ? `/course-category/${id}` : '/course-category'); // Navigate to category or all courses
    };

    const toggleMenu = () => setShowMenu(!showMenu);

    const paginatedCourses = () => {
        const coursesToShow = categoryId ? getCoursesByCategory(categoryId) : courses;
        const startIndex = (currentPage - 1) * coursesPerPage;
        return coursesToShow.slice(startIndex, startIndex + coursesPerPage);
    };

    const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    let gridStyle = gridStyleTF ? 'md:grid-cols-3 sm500:grid-cols-2' : 'grid-cols-1';
    const totalCourses = categoryId ? getCoursesByCategory(categoryId).length : courses.length;

    if (courses.length === 0) return <p>{t("No courses available")}</p>;

    return (
        <main className="flex justify-center">
            <div className="px-5 max-w-[1200px] center:min-w-[1200px] w-full py-5 flex flex-col">
                <h1 className="text-3xl font-roboto-slab font-bold text-primaryDark">
                    {t('COURSES')}
                </h1>
                <div className="flex mid:flex-row flex-col gap-5 py-10">
                    <div className="w-[20%] mid:flex flex-col hidden h-min border-b"
                        style={{ position: 'sticky', top: '10px' }}>
                        <h1 className="textHover cursor-pointer min-w-max text-2xl font-roboto-slab font-bold text-primaryDark">
                            {t('Categories')}
                        </h1>
                        <p onClick={() => handleCategoryClick('')}
                            className={`uppercase min-w-max w-full textHover cursor-pointer py-[5px] ${!categoryId ? "text-primary" : "text-primaryDark"}`}>
                            {t('ALL')}
                        </p>
                        {categories.map(({ id, translation }) => (
                            <p onClick={() => handleCategoryClick(id)}
                                className={`uppercase min-w-max w-full textHover cursor-pointer py-[5px] ${categoryId === id ? "text-primary" : "text-primaryDark"}`}
                                key={id}>
                                {translation?.text}
                            </p>
                        ))}
                    </div>
                    <button onClick={toggleMenu}
                        className="mid:hidden flex bg-primary text-white font-roboto-slab text-sm uppercase font-bold w-min px-9 py-2">
                        {t('Filter')}
                    </button>
                    <div className="mid:w-[80%] w-full">
                        <div className="flex gap-3 items-center">
                            <i className={`fa fa-th-large text-xl hover:text-primary cursor-pointer ${gridStyleTF ? 'text-primary' : 'text-color66'}`}
                                onClick={() => setGridStyle(true)}></i>
                            <i className={`fa fa-list-ul text-lg hover:text-primary cursor-pointer ${!gridStyleTF ? 'text-primary' : 'text-color66'}`}
                                onClick={() => setGridStyle(false)}></i>
                            <p className="text-color66 text-custom-15">
                                {t('Showing', {
                                    start: (currentPage - 1) * coursesPerPage + 1,
                                    end: Math.min(currentPage * coursesPerPage, totalCourses),
                                    total: totalCourses
                                })}
                            </p>
                        </div>
                        <div
                            className={`opacityPopularCoursecontent-center grid ${gridStyle} ${gridStyleTF ? 'gap-10' : 'gap-0'} py-6`}>
                            {paginatedCourses().map(({ image, id, translation }) => (
                                <PopularCourse
                                    gridStyleTF={gridStyleTF}
                                    desc={translation?.desc}
                                    image={image}
                                    title={translation?.title}
                                    count={translation?.count}
                                    price={translation?.price}
                                    key={id}
                                    id={id}
                                />
                            ))}
                        </div>
                        {totalCourses > coursesPerPage && (
                            <ReactPaginate
                                previousLabel={<button>{'<'}</button>}
                                nextLabel={<button>{'>'}</button>}
                                pageCount={Math.ceil(totalCourses / coursesPerPage)}
                                onPageChange={(data) => {
                                    handlePageChange(data);
                                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
                                }}
                                breakLabel="..."
                                pageRangeDisplayed={5}
                                renderOnZeroPageCount={null}
                                className="pagination"
                                pageClassName="pagination__item"
                                pageLinkClassName="pagination__link"
                                activeLinkClassName="pagination__link--active"
                                previousClassName="pagination__previous"
                                nextClassName="pagination__next"
                            />
                        )}
                    </div>
                </div>
                <CoursesMenu isOpen={showMenu} toggleMenu={toggleMenu} categoryId={categoryId} />
            </div>
        </main>
    );
}
