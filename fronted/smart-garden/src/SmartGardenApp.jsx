import React, { useState, useRef } from 'react';
import { Camera, Upload, Droplets, Sun, Trash2, Plus, Leaf } from 'lucide-react';

const SmartGardenApp = () => {
  const [plants, setPlants] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('garden');
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Mock plant data for demonstration
  const mockPlantData = {
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    waterNeeds: "Low - Water every 2-3 weeks",
    sunlightNeeds: "Low to bright indirect light",
    confidence: 0.92
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate API call to Hugging Face model
    setTimeout(() => {
      const newPlant = {
        id: Date.now(),
        image: URL.createObjectURL(file),
        ...mockPlantData,
        dateAdded: new Date().toLocaleDateString()
      };
      setPlants(prev => [...prev, newPlant]);
      setIsUploading(false);
      setActiveTab('garden');
    }, 2000);
  };

  const removePlant = (id) => {
    setPlants(prev => prev.filter(plant => plant.id !== id));
  };

  const WaterNeedsIcon = ({ level }) => {
    const drops = level === 'Low' ? 1 : level === 'Medium' ? 2 : 3;
    return (
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <Droplets 
            key={i} 
            className={`w-4 h-4 ${i < drops ? 'text-blue-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  const SunlightIcon = ({ level }) => {
    const intensity = level.includes('Low') ? 1 : level.includes('Medium') ? 2 : 3;
    return (
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <Sun 
            key={i} 
            className={`w-4 h-4 ${i < intensity ? 'text-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Smart Garden</h1>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('garden')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'garden'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Garden ({plants.length})
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'add'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Add Plant
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'add' && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Add a New Plant to Your Garden
            </h2>
            
            {isUploading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Identifying your plant...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Camera Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Take Photo</h3>
                  <p className="text-gray-600 mb-4">Use your camera to capture your plant</p>
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Open Camera
                  </button>
                </div>

                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Photo</h3>
                  <p className="text-gray-600 mb-4">Choose an image from your device</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Choose File
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'garden' && (
          <div>
            {plants.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Your garden is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Start by adding your first plant! Take a photo and let AI identify it for you.
                </p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Plant</span>
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plants.map((plant) => (
                  <div key={plant.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removePlant(plant.id)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {plant.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 italic">
                        {plant.scientificName}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">Water</span>
                          </div>
                          <div className="text-right">
                            <WaterNeedsIcon level={plant.waterNeeds.split(' ')[0]} />
                            <p className="text-xs text-gray-600 mt-1">
                              {plant.waterNeeds}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Sun className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">Light</span>
                          </div>
                          <div className="text-right">
                            <SunlightIcon level={plant.sunlightNeeds} />
                            <p className="text-xs text-gray-600 mt-1">
                              {plant.sunlightNeeds}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          Added {plant.dateAdded} • {Math.round(plant.confidence * 100)}% confidence
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SmartGardenApp;