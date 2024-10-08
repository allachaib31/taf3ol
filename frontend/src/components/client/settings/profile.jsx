import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom';

function Profile() {
  const { t, i18n } = useOutletContext();
  const [image, setImage] = useState("https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp");

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the selected image
      setImage(imageUrl); // Update the image
    }
  };

  const handleButtonClick = () => {
    document.getElementById('imageUpload').click(); // Trigger file input click
  };
  return (
    <div className='relative z-50'>
      <div className='flex flex-col items-end gap-[1rem]'>
        <button className='btn btn-error w-44'>{t('button_1_settings')}</button>
        <Link to="/client/settings/updatePassword" className='btn btn-primary w-44'>{t('button_2_settings')}</Link>
      </div>
      <div className='mt-[1rem]'>
        <form className='flex flex-col gap-[1rem] justify-center items-center'>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            {/* Display the uploaded or default image */}
            <img
              src={image}
              alt="Profile"
              className="object-cover w-full h-full"
            />

            {/* Hidden file input */}
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange} // Handle file selection
            />

            {/* Icon Overlay with Upload Button */}
            <div onClick={handleButtonClick} className="absolute bottom-0 w-full h-10 bg-primary flex items-center justify-center">

              <FontAwesomeIcon icon={faCloudArrowUp} />

            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="name">{t('label_1_settings')}</label>
            <input type="text" className='input input-bordered w-80' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="name">{t('label_2_settings')}</label>
            <input type="text" className='input input-bordered w-80' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="name">{t('label_3_settings')}</label>
            <input type="text" className='input input-bordered w-80' />
          </div>
          <button className='btn btn-primary px-[2rem] text-xl'>{t('button_3_settings')}</button>
        </form>
      </div>
    </div>
  )
}

export default Profile