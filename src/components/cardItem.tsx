export const CardItem = ({ title, subTitle, Icon, className = "" }: 
    { title: string, subTitle: string, Icon: React.ReactNode, className?: string }) => {
    return <div className={`${className} sm:block shadow-lg rounded-lg h-[100px]`}>
        <div className='flex items-center'>
            <div className='mr-2 flex justify-center items-center h-[100px] w-[50px]'>
                {Icon}
            </div>
            <div className=''>
                <div className="text-2xl font-[500]"> {title} </div>
                <div className="text-[14px] text-gray-400"> {subTitle} </div>
            </div>
        </div>
    </div>
}