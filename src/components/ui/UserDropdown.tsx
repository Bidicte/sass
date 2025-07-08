import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Fonction sécurisée pour obtenir les initiales
  const getInitials = (username?: string, email?: string): string => {
    if (username && typeof username === 'string' && username.trim()) {
      const parts = username.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
      }
      return username.charAt(0).toUpperCase();
    }
    
    if (email && typeof email === 'string' && email.trim()) {
      return email.charAt(0).toUpperCase();
    }
    
    return 'U'; // User par défaut
  };

  // Fonction sécurisée pour obtenir le nom d'affichage
  const getDisplayName = (username?: string, email?: string): string => {
    if (username && typeof username === 'string' && username.trim()) {
      return username.trim();
    }
    
    if (email && typeof email === 'string' && email.trim()) {
      // Extraire la partie avant @ de l'email
      const emailParts = email.split('@');
      return emailParts[0] || email;
    }
    
    return 'Utilisateur';
  };

  // Vérification de sécurité pour l'utilisateur
  if (!user) {
    return null;
  }

  const initials = getInitials(user.username, user.email);
  const displayName = getDisplayName(user.username, user.email);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar cliquable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
          {initials}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-700">{displayName}</div>
          {user.role && (
            <div className="text-xs text-gray-500">{user.role}</div>
          )}
        </div>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">{displayName}</div>
            {user.email && (
              <div className="text-sm text-gray-500">{user.email}</div>
            )}
          </div>
          
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              // Ajouter logique pour profil
            }}
          >
            Mon profil
          </a>
          
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              // Ajouter logique pour paramètres
            }}
          >
            Paramètres
          </a>
          
          <div className="border-t border-gray-100">
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};