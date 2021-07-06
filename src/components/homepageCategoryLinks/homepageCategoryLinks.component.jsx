import React from 'react';
import './homepageCategoryLinks.styles.scss';

const HomepageCategoryLink = ({
  categoryArray,
  side,
  handleStreamChange,
  categoryName
}) => {
  return (
    <div className='homepageCategory-row'>
        <div sm=''>
          <h4 className='homepageCategory-header'>{categoryName}</h4>
        </div>
        <div className='homepageCategory-type'>
          {categoryArray.map(({ name, categoryLink }, i) => (
            <div
              key={i}
              className={`options ${
                side[categoryName] === name ? 'active' : ''
              }`}
              onClick={() => {
                handleStreamChange(categoryLink, name);
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
  );
};

export default HomepageCategoryLink;
