import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header-video-container">
      <video
        className="header-video"
        src="/videos/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default Header;
