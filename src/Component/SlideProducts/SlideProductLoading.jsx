

import './SlideProduct.css';

export default function SlideProductLoading() {
  return (
    <div className="Slide_Products slide loading_slide">
      <div className="container">
        <div className="top_slide">
          <h2 className="skeleton skeleton_title"></h2>
        </div>

        <div className="loading_products">
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="loading_card" key={item}>
              <div className="skeleton skeleton_img"></div>

              <div className="loading_info">
                <div className="skeleton skeleton_text"></div>
                <div className="skeleton skeleton_price"></div>
                <div className="skeleton skeleton_button"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
