import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useGeolocation } from '../hooks/useGeolocation';
import { analyzeComplaint, getTrainInfo, getMenuPrice } from '../services/apiService';
import { analyzeComplaintDescription } from '../services/geminiService';
import { Spinner } from './common/Spinner';
import { IconSparkles, IconUpload, IconMapPin } from './common/Icon';

export const ComplaintForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    trainNo: '',
    vendorName: '',
    itemName: '',
    reportedPrice: '',
    mrp: '',
    description: '',
  });
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  const { location, error: geoError, getLocation } = useGeolocation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setEvidenceFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!formData.description) {
      setAnalysisError('Please provide a description to analyze.');
      return;
    }
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    try {
      // Try backend API first
      try {
        const result = await analyzeComplaint(
          formData.description,
          formData.trainNo || null,
          formData.itemName || null
        );
        setAnalysisResult(result);
      } catch (apiError) {
        // Fallback to local analysis
        console.warn('Backend analysis failed, using local:', apiError);
        const result = await analyzeComplaintDescription(
          formData.description,
          formData.trainNo || null,
          formData.itemName || null
        );
        setAnalysisResult(result);
      }
    } catch (error) {
      setAnalysisError('Failed to analyze the complaint. Please try again.');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalComplaint = {
      trainNo: formData.trainNo.trim(),
      vendorName: formData.vendorName.trim(),
      itemName: formData.itemName.trim(),
      reportedPrice: Number(formData.reportedPrice) || 0,
      mrp: formData.mrp ? Number(formData.mrp) : undefined,
      description: formData.description.trim(),
      evidenceUrl: previewUrl || undefined,
      geolocation: location || undefined,
    };
    onSubmit(finalComplaint);
  };

  const inputClasses =
    'mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
  const labelClasses = 'block text-sm font-medium text-slate-700 dark:text-slate-300';

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b dark:border-slate-700 pb-4">
        File a New Complaint
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="trainNo" className={labelClasses}>
            Train Number
          </label>
          <input
            type="text"
            name="trainNo"
            id="trainNo"
            value={formData.trainNo}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="vendorName" className={labelClasses}>
            Vendor Name
          </label>
          <input
            type="text"
            name="vendorName"
            id="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="itemName" className={labelClasses}>
            Food Item
          </label>
          <input
            type="text"
            name="itemName"
            id="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="reportedPrice" className={labelClasses}>
              Price Charged (₹)
            </label>
            <input
              type="number"
              name="reportedPrice"
              id="reportedPrice"
              value={formData.reportedPrice}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="mrp" className={labelClasses}>
              MRP (if known, ₹)
            </label>
            <input
              type="number"
              name="mrp"
              id="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className={labelClasses}>
            Description of Issue
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className={inputClasses}
          ></textarea>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 transition duration-300"
          >
            {isAnalyzing ? <Spinner /> : <IconSparkles className="w-5 h-5" />}
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Complaint with AI'}</span>
          </button>
          {analysisError && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-2">{analysisError}</p>
          )}
          {analysisResult && (
            <div className="mt-4 p-4 bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 rounded-md text-sm space-y-2">
              <p>
                <strong className="text-indigo-800 dark:text-indigo-300">AI Summary:</strong>{' '}
                {analysisResult.summary}
              </p>
              <p>
                <strong className="text-indigo-800 dark:text-indigo-300">Category:</strong>{' '}
                {analysisResult.category}
              </p>
              {analysisResult.trainInfo && (
                <p>
                  <strong className="text-indigo-800 dark:text-indigo-300">Train:</strong>{' '}
                  {analysisResult.trainInfo.name} ({analysisResult.trainInfo.route})
                </p>
              )}
              {analysisResult.irctcPrice && (
                <p>
                  <strong className="text-indigo-800 dark:text-indigo-300">IRCTC Price:</strong>{' '}
                  ₹{analysisResult.irctcPrice}
                  {formData.reportedPrice && analysisResult.irctcPrice < Number(formData.reportedPrice) && (
                    <span className="text-red-600 dark:text-red-400 ml-2">
                      (₹{(Number(formData.reportedPrice) - analysisResult.irctcPrice).toFixed(2)} overcharge!)
                    </span>
                  )}
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <label className={labelClasses}>Upload Evidence (Photo)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Evidence preview" className="mx-auto h-32 w-auto rounded-md" />
              ) : (
                <IconUpload className="mx-auto h-12 w-12 text-slate-400" />
              )}
              <div className="flex text-sm text-slate-600 dark:text-slate-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={getLocation}
            className="w-full flex items-center justify-center space-x-2 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition duration-300"
          >
            <IconMapPin className="w-5 h-5" />
            <span>Add Current Location</span>
          </button>
          {location && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-2 text-center">
              Location captured: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          )}
          {geoError && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2 text-center">{geoError}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t dark:border-slate-700">
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-semibold py-2 px-6 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

ComplaintForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
