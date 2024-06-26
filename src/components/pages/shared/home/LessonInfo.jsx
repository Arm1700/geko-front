export default function LessonInfo({Icon,title,count}){
    return(
        <article className="flex-container-content flex p-5 hover:text-secondary hover:border-secondary  transition-colors duration-300 gap-2 border-b text-white flex-col items-center middle:border-b max:border-0">
          <Icon className="text-custom-80" />
          <span className="text-custom-28 font-bold">{count}</span>
          <span className="text-lg">{title}</span>
        </article>
    )
}