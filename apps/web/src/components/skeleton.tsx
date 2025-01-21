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

export { CardSkeleton };
