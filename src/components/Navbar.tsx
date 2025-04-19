import { Link, NavLink } from 'react-router-dom';

const LINKS = [
    { to: '/', label: '홈' },
    { to: '/game', label: '게임하기' },
    { to: '/feedback', label: '개선사항' },
];

export default function Navbar() : React.ReactElement {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-blue-600/80 to-transparent">
            <div className="flex items-center gap-8">
                <Link to="/" className="text-2xl font-bold text-white">
                    숫자야구 게임
                </Link>
                <div className="flex gap-6">
                    {LINKS.map(({ to, label }) : React.ReactElement => (
                        <NavLink 
                            to={to}
                            key={to} 
                            className={({ isActive }) => 
                                isActive 
                                    ? 'text-white font-bold' 
                                    : 'text-gray-200 hover:text-white transition-colors'
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}
