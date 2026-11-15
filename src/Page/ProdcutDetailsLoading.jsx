

import SlideProductLoading from '../Component/SlideProducts/SlideProductLoading';
import './ProductDetails.css';

function ProdcutDetailsLoading() {
  return (
    <div className="Loading_item">
      <div className="container">
        <div className="item_details">
          <div className="img_item">
            <div className="skeleton image_skeleton"></div>
          </div>

          <div className="deatils_item">
            <div className="skeleton title_skeleton"></div>
            <div className="skeleton text_skeleton"></div>
            <div className="skeleton text_skeleton"></div>
            <div className="skeleton price_skeleton"></div>
            <div className="skeleton button_skeleton"></div>
                  </div>
                  



        </div>
          </div>
          
<SlideProductLoading/>
          


    </div>
  );
}

export default ProdcutDetailsLoading;

