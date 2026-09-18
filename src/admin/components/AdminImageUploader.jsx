import React, { useRef } from 'react';
import { FaImage, FaUpload, FaTimes } from 'react-icons/fa';
import './AdminImageUploader.css';

export default function AdminImageUploader({
  value = '',
  onChange,
  label = 'Image / Preview Media',
  placeholder = '/projects/preview.png or https://...',
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (warn if > 2MB)
    if (file.size > 2.5 * 1024 * 1024) {
      alert('Note: Image file is larger than 2.5MB. For optimal browser performance, consider using a compressed image or URL.');
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange && onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-uploader-group">
      <label className="admin-uploader-label">{label}</label>

      <div className="admin-uploader-row">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          className="admin-input-control admin-uploader-input"
        />

        <button
          type="button"
          className="admin-uploader-browse-btn"
          onClick={() => fileInputRef.current?.click()}
          title="Upload / Select local file"
        >
          <FaUpload />
          <span>Upload</span>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      {value && (
        <div className="admin-uploader-preview-box">
          <img src={value} alt="Preview" className="admin-uploader-thumb" onError={(e) => (e.target.style.display = 'none')} />
          <div className="admin-uploader-preview-info">
            <span className="admin-uploader-preview-path" title={value}>
              {value.length > 50 ? `${value.substring(0, 48)}...` : value}
            </span>
            <button
              type="button"
              className="admin-uploader-clear-btn"
              onClick={() => onChange && onChange('')}
              title="Remove image"
            >
              <FaTimes /> Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
