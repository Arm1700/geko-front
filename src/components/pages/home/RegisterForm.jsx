import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {postData} from "../contacts/api/fetchMessage";
import Input from "../shared/contact/Input";
import Button from "../shared/contact/Button";
import {useTranslation} from "react-i18next";
import {CountryDropdown} from "react-country-region-selector";
import {DataContext} from "../context/DataProvider";
import {MdKeyboardArrowDown} from "react-icons/md";
import Notification from "../shared/contact/Notification";

export default function  RegisterForm({check = true}) {
    const {t} = useTranslation();
    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm();
    const {categories} = useContext(DataContext);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [showNotify, setShowNotify] = useState(false)
    const [status, setStatus] = useState(null)
    const triggerNotification = () => {
        setShowNotify(true)
        setTimeout(() => setShowNotify(false), 3000)
    }
    const onSubmit = async data => {
        try {
            const response = await postData(data,setSelectedCategory ,setSelectedCountry)

            triggerNotification()
            setStatus({
                status: 'success',
                message: 'Message was sent successfully',
            })

            reset()
            console.log('Data posted successfully:', response)
        } catch (error) {
            reset()
            triggerNotification()
            setStatus({
                status: 'error',
                message: error.message,
            })
            console.error('Error occurred while posting context:', error)
        }
    }

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setValue("category", categoryId, {shouldValidate: true});
        setIsDropdownOpen(false);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`w-full flex flex-col gap-5 relative bg-white p-8 rounded-lg z-10 ${check ? "shadow-lg max-w-md" : ''}`}
            >
                {check ? <div
                    className="absolute w-[140%] max-h-full top-[-80%] left-[-20%] inset-0 bg-primary z-20 rounded-full"></div> : ''}
                <h2 className={`text-center text-2xl font-bold uppercase z-20 font-roboto-slab ${check ? "text-white" : 'text-primaryDark'}`}>
                    {t('free_trail')}
                </h2>
                <div className="space-y-4">
                    <Input
                        placeholder={t("fullName")}
                        name="full_name"
                        {...register("full_name", {required: t("fullName is required")})}
                        error={errors.full_name?.message}
                    />
                    <div className="mb-4">
                        <CountryDropdown
                            id="country"
                            value={selectedCountry || ""}
                            name='country'
                            onChange={(value) => {
                                setValue("country", value, {shouldValidate: true});
                                setSelectedCountry(value);
                            }}
                            className="capitalize w-full py-3 pl-3 border max-h-48 overflow-y-auto  border-gray-300 rounded-lg text-primaryDark"
                            defaultOptionLabel={selectedCountry || t("country")}
                        />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{t(errors.country.message)}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="capitalize w-full flex justify-between items-center pl-5 py-2 border border-gray-300 rounded-lg text-primaryDark"
                        >
                            <p>
                                {selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.translation?.text : t("Category")}
                            </p>
                            <MdKeyboardArrowDown className='text-[18px]'/>
                        </button>

                        {isDropdownOpen && (
                            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-32 overflow-y-auto z-10">
                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        onClick={() => handleCategorySelect(category.id)}
                                        className="p-3 cursor-pointer hover:bg-gray-200 uppercase"
                                    >
                                        {category.translation?.text}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{t(errors.category.message)}</p>}

                    <Input
                        placeholder={t("WhatsApp_Number")}
                        type="tel"
                        name="whatsapp"
                        {...register("whatsapp", {
                            required: t("WhatsApp number is required"),
                            pattern: {value: /^\+?\d+$/, message: t("Please enter a valid phone number")},
                        })}
                        error={errors.whatsapp?.message}
                    />

                    <Input
                        placeholder={t("Email")}
                        type="email"
                        name="email"
                        {...register("email", {required: t("Email is required")})}
                        error={errors.email?.message}
                    />

                    <Input
                        placeholder={t("Message")}
                        name="message"
                        {...register("message", {required: t("Message is required")})}
                        error={errors.message?.message}
                    />

                    <Button type="submit" text={t("confirm")}/>
                </div>
            </form>
            {showNotify && (
                <Notification status={status.status} message={status.message}/>
            )}
        </div>
    );
}
