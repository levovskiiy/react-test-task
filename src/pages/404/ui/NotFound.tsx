import { Button } from '@/internal/components';
import { useNavigate } from 'react-router';

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen container m-auto flex flex-col gap-4 items-center justify-center">
            <h1 className="heading-1">Not found</h1>
            <p>Sorry! Wrong Page</p>
            <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
    );
};
