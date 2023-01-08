import { RefObject, useEffect, useState } from 'react';

export const useIntersection = (
    ref: RefObject<HTMLElement>,
    rootMargin: string
) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        let element = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            },
            { rootMargin }
        );

        element && observer.observe(element);

        return () => {
            element && observer.unobserve(element);
        };
    }, []);

    return isVisible;
};
