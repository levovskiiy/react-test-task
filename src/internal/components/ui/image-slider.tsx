import { Button } from '@/internal/components';
import { clsx } from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

export interface ImageSliderProps {
    images: string[];
    className?: string;
}

function PureImageSlider({ images, className }: ImageSliderProps) {
    const [ currentIndex, setCurrentIndex ] = useState(0);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [ images.length ]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [ images.length ]);

    return (
        <div className={clsx('relative w-full h-full overflow-hidden', className)}>
            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div className="w-full h-full shrink-0" key={index}>
                        <img src={image} alt="" className="w-full h-full object-cover"/>
                    </div>
                ))}
            </div>

            <Button
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2"
                variant="outline"
                size="icon"
                onClick={prevSlide}
            >
                <ChevronLeftIcon/>
            </Button>
            <Button
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2"
                variant="outline"
                size="icon"
                onClick={nextSlide}
            >
                <ChevronRightIcon/>
            </Button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={clsx(
                            'w-3 h-3 rounded-full transition',
                            currentIndex === index ? 'bg-primary' : 'bg-gray-300',
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

export const ImageSlider = memo(PureImageSlider);
