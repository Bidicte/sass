import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, MapPin } from 'lucide-react';
import type { MenuItem } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  menuItems: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, menuItems }) => {
  const [openSections, setOpenSections] = useState<string[]>(['dashboard']);
  const location = useLocation();

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`bg-gray-900 text-white h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} fixed left-0 top-0 z-40`}>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          {isOpen && <span className="font-bold text-xl">CHK-PMS</span>}
        </div>
        {isOpen && 
        <div className="bg-blue-500 rounded-xl mt-10 p-4 text-white">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <MapPin size={16} className="text-blue-100" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Hôtel de CHK</h3>
                  <p className="text-blue-100 text-sm font-medium">Angré Cocody Abidjan</p>
                </div>
              </div>
            </div>
      }
      </div>

      
      
      <nav className="mt-8">
        {isOpen && <div className="px-4 mb-4 text-xs text-gray-400 uppercase">MENU</div>}
        
        {menuItems.map(item => (
          <div key={item.id} className="mb-1">
            <div className="flex">
              <Link
                to={item.path}
                className={`flex-1 flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors ${
                  isActive(item.path) ? 'bg-blue-600 text-white' : ''
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isOpen && <span>{item.label}</span>}
              </Link>
              
              {isOpen && item.hasSubmenu && (
                <button
                  onClick={() => toggleSection(item.id)}
                  className="px-2 py-3 hover:bg-gray-800 transition-colors"
                >
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${
                      openSections.includes(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}
            </div>
            
            {isOpen && item.hasSubmenu && openSections.includes(item.id) && item.submenuItems && (
              <div className="ml-8 py-2 space-y-1">
                {item.submenuItems.map(subItem => (
                  <Link
                    key={subItem.id}
                    to={subItem.path}
                    className={`block px-4 py-2 text-sm hover:text-white transition-colors ${
                      isActive(subItem.path) ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
