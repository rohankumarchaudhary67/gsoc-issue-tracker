import { Skeleton } from '@/components/ui/skeleton';

const CardSkeleton = () => {
    return (
        <>
            <div className="w-full flex flex-col justify-start items-start space-y-4 p-4">
                <div className="flex justify-between items-center w-full">
                    <Skeleton className="w-36 h-6" />
                    <Skeleton className="w-36 h-6" />
                </div>
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-14 h-4" />
                <div className="flex justify-start items-center space-x-6">
                    <Skeleton className="w-36 h-2" />
                    <Skeleton className="w-36 h-2" />
                </div>
                <div className="flex justify-start items-center space-x-6">
                    <Skeleton className="w-36 h-2" />
                    <Skeleton className="w-36 h-2" />
                    <Skeleton className="w-36 h-2" />
                </div>
            </div>
        </>
    );
};

const IssueSkeleton = () => {
    return (
        <>
            <div className="w-full flex flex-col justify-start items-start space-y-4 p-4">
                <div className="flex justify-between items-center w-full">
                    <Skeleton className="w-36 h-6" />
                    <div className="flex justify-start items-center space-x-6">
                        <Skeleton className="w-36 h-6" />
                        <Skeleton className="w-36 h-6" />
                    </div>
                </div>
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-24 h-6" />
                <Skeleton className="w-28 h-3" />
                <div className="flex justify-start items-center space-x-6">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-24 h-4" />
                </div>
                <div className="flex justify-between items-center w-full space-x-6">
                    <Skeleton className="w-36 h-4" />
                    <Skeleton className="w-56 h-4" />
                </div>
                <div className="pt-16 w-full">
                    <Skeleton className="w-full h-64" />
                </div>
            </div>
        </>
    );
};

const UsageSkeleton = () => {
    return (
        <>
            <div className='flex flex-col w-full space-y-4 pt-12'>
                <Skeleton className="w-72 h-12" />
                <Skeleton className="w-96 h-8" />

                <div className='flex w-full justify-between items-start pt-8'>
                    <Skeleton className="w-72 h-8" />
                    <div className='w-96 flex flex-col justify-start items-start space-y-2'>
                        <Skeleton className="w-36 h-6" />
                        <Skeleton className="w-96 h-6" />
                    </div>
                </div>
                <div className='flex w-full justify-between items-start pt-8'>
                    <Skeleton className="w-72 h-8" />
                    <div className='w-96 flex flex-col justify-start items-start space-y-2'>
                        <Skeleton className="w-36 h-6" />
                        <Skeleton className="w-96 h-6" />
                    </div>
                </div>
                <div className='w-full pt-8 flex justify-end'>
                    <Skeleton className="w-48 h-12" />
                </div>
            </div>
        </>
    )
}

const AiSkeleton = () => {
    return (
        <>
            <div className='flex flex-col w-full space-y-2 pt-4'>
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <div className='flex w-full justify-between items-start'>
                    <Skeleton className="w-full h-4" />
                    <div className='w-full'></div>
                </div>
            </div>
        </>
    )
}

export { CardSkeleton, IssueSkeleton, UsageSkeleton, AiSkeleton };
