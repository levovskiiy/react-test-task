import { AppHeader } from '@/internal/components';
import { Outlet } from 'react-router';

export const Root = () => {
    return (
        <div className="container m-auto flex flex-col gap-5">
            <AppHeader/>
            <Outlet/>
        </div>
    );
};
