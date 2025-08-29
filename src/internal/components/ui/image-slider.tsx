import { Button } from '@/internal/components';
import { Badge } from '@/internal/components/ui/badge.tsx';
import { clsx } from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

export interface ImageSliderProps {
    images: string[];
    className?: string;
}

export function ImageSlider({ images, className }: ImageSliderProps) {
    const [ currentIndex, setCurrentIndex ] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className={clsx('relative overflow-hidden', className)}>
            <div className="flex w-full transition-all" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className={'max-w-full shrink-0'} key={index}>
                        <img
                            src={image}
                            className="block max-w-full max-h-full object-fit transition"
                        />
                    </div>
                ))}
            </div>
            <Button
                className="absolute right-2 top-1/2 -translate-y-1/2"
                variant="outline"
                onClick={() => nextSlide()}
            >
                <ChevronRightIcon/>
            </Button>
            <Button
                className="absolute left-2 top-1/2 -transalte-y-1/2"
                variant="outline"
                onClick={() => prevSlide()}
            >
                <ChevronLeftIcon/>
            </Button>
            <div className="mt-4 flex gap-2">
                {images.map((_, index) => (
                    <Badge
                        key={index}
                        variant={currentIndex === index ? 'default' : 'outline'}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
