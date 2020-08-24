import React from 'react';

export default function Footer() {

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 10);
        }
    }

    const handleClick = e => {
        e.preventDefault();
        scrollToTop();
    }

  return (
    <div className="footer_container">
        <button onClick={handleClick} className="footer_button">Wróć na górę</button>
    </div>
  )
}