import React, { createContext, useState, useContext } from 'react';
import Popup from '../components/Popup';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popups, setPopups] = useState([]);

  const showPopup = (title, message, isSuccess = true, duration = 3000, callback = null) => {
    const id = Date.now();
    setPopups(prev => [...prev, { id, title, message, isSuccess, duration, callback }]);
    return id;
  };

  const closePopup = (id, confirmed = false) => {
    const popup = popups.find(p => p.id === id);
    
    if (popup && popup.callback) {
      popup.callback(confirmed);
    }
    
    setPopups(prev => prev.filter(popup => popup.id !== id));
  };

  return (
    <PopupContext.Provider value={{ showPopup, closePopup }}>
      {children}
      {popups.map(popup => (
        <Popup
          key={popup.id}
          id={popup.id}
          title={popup.title}
          message={popup.message}
          isSuccess={popup.isSuccess}
          duration={popup.duration}
          hasCallback={!!popup.callback}
          onClose={() => closePopup(popup.id)}
          onConfirm={() => closePopup(popup.id, true)}
        />
      ))}
    </PopupContext.Provider>
  );
};

export default PopupContext;
