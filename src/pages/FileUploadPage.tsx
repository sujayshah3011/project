import React, { useState, useRef } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { Upload, File, X, Check, AlertCircle, Info } from 'lucide-react';

const FileUploadPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    component: React.ReactNode;
    htmlCode: string;
    reactCode: string;
  } | null>(null);

  // Local state for file upload examples
  const [basicFiles, setBasicFiles] = useState<File[]>([]);
  const [dragFiles, setDragFiles] = useState<File[]>([]);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const basicFileInputRef = useRef<HTMLInputElement>(null);
  const dragFileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileInputRef = useRef<HTMLInputElement>(null);

  const openModal = (title: string, component: React.ReactNode, htmlCode: string, reactCode: string) => {
    setSelectedComponent({ title, component, htmlCode, reactCode });
    setModalOpen(true);
  };

  // Basic File Upload Component
  const BasicFileUpload = ({ 
    files, 
    onChange, 
    accept = "*",
    multiple = false,
    disabled = false 
  }: { 
    files: File[];
    onChange: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      onChange(multiple ? [...files, ...selectedFiles] : selectedFiles);
    };

    const removeFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      onChange(newFiles);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className={`px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors ${
              disabled
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Choose {multiple ? 'Files' : 'File'}
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {files.length === 0 ? 'No file selected' : `${files.length} file${files.length > 1 ? 's' : ''} selected`}
          </span>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <File className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                  <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                {!disabled && (
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Drag and Drop File Upload Component
  const DragDropFileUpload = ({ 
    files, 
    onChange, 
    accept = "*",
    multiple = false 
  }: { 
    files: File[];
    onChange: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      onChange(multiple ? [...files, ...droppedFiles] : droppedFiles);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      onChange(multiple ? [...files, ...selectedFiles] : selectedFiles);
    };

    const removeFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      onChange(newFiles);
    };

    return (
      <div className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {multiple ? 'Select multiple files' : 'Select a file'} to upload
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">File Upload</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          File upload components allow users to select and upload files to your application.
        </p>
      </div>

      {/* Basic File Upload */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic File Upload</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Basic File Upload',
              <BasicFileUpload files={basicFiles} onChange={setBasicFiles} />,
              `<div class="space-y-4">
  <div class="flex items-center gap-4">
    <button class="px-4 py-2 border border-gray-300 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50">
      <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
      </svg>
      Choose File
    </button>
    <span class="text-sm text-gray-500">No file selected</span>
  </div>
  <input type="file" class="hidden" />
</div>`,
              `const BasicFileUpload = ({ files, onChange }) => {
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    onChange(selectedFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 border border-gray-300 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50"
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Choose File
        </button>
        <span className="text-sm text-gray-500">
          {files.length === 0 ? 'No file selected' : \`\${files.length} file selected\`}
        </span>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};`
            )}
          >
            <BasicFileUpload files={basicFiles} onChange={setBasicFiles} />
          </div>
        </div>
      </section>

      {/* Drag and Drop Upload */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Drag & Drop Upload</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Drag & Drop Upload',
              <DragDropFileUpload files={dragFiles} onChange={setDragFiles} />,
              `<div class="space-y-4">
  <div class="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-gray-50">
    <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
    </svg>
    <p class="text-lg font-medium text-gray-700 mb-2">Drop files here or click to upload</p>
    <p class="text-sm text-gray-500">Select a file to upload</p>
  </div>
</div>`,
              `const DragDropFileUpload = ({ files, onChange }) => {
  const [dragOver, setDragOver] = useState(false);
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    onChange(droppedFiles);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={\`border-2 border-dashed p-8 text-center cursor-pointer transition-colors \${
        dragOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
      }\`}
    >
      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-lg font-medium text-gray-700 mb-2">
        Drop files here or click to upload
      </p>
    </div>
  );
};`
            )}
          >
            <DragDropFileUpload files={dragFiles} onChange={setDragFiles} />
          </div>
        </div>
      </section>

      {/* Multiple File Upload */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Multiple File Upload</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer"
            onClick={() => openModal(
              'Multiple File Upload',
              <BasicFileUpload files={multipleFiles} onChange={setMultipleFiles} multiple={true} />,
              `<div class="space-y-4">
  <div class="flex items-center gap-4">
    <button class="px-4 py-2 border border-gray-300 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50">
      <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
      </svg>
      Choose Files
    </button>
    <span class="text-sm text-gray-500">No files selected</span>
  </div>
  <input type="file" multiple class="hidden" />
</div>`,
              `<BasicFileUpload files={multipleFiles} onChange={setMultipleFiles} multiple={true} />`
            )}
          >
            <BasicFileUpload files={multipleFiles} onChange={setMultipleFiles} multiple={true} />
          </div>
        </div>
      </section>

      {/* File Upload States */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload States</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Default</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Default State',
                  <BasicFileUpload files={[]} onChange={() => {}} />,
                  `<button class="px-4 py-2 border border-gray-300 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50">
  Choose File
</button>`,
                  `<BasicFileUpload files={[]} onChange={() => {}} />`
                )}
              >
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Choose File
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-medium w-24">Disabled</span>
              <div 
                className="cursor-pointer"
                onClick={() => openModal(
                  'Disabled State',
                  <BasicFileUpload files={[]} onChange={() => {}} disabled={true} />,
                  `<button class="px-4 py-2 border border-gray-300 text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
  Choose File
</button>`,
                  `<BasicFileUpload files={[]} onChange={() => {}} disabled={true} />`
                )}
              >
                <BasicFileUpload files={[]} onChange={() => {}} disabled={true} />
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-gray-900 dark:text-white font-medium w-24">With Files</span>
              <div 
                className="cursor-pointer flex-1 ml-4"
                onClick={() => openModal(
                  'With Files State',
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">document.pdf</span>
                        <span className="text-xs text-gray-500">(1.2 MB)</span>
                      </div>
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                  </div>,
                  `<div class="space-y-2">
  <div class="flex items-center justify-between p-2 bg-gray-50 border border-gray-200">
    <div class="flex items-center space-x-2">
      <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm text-gray-700">document.pdf</span>
      <span class="text-xs text-gray-500">(1.2 MB)</span>
    </div>
    <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  </div>
</div>`,
                  `// File display component with remove functionality`
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">document.pdf</span>
                      <span className="text-xs text-gray-500">(1.2 MB)</span>
                    </div>
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      {/* <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Guidelines</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">When to Use File Upload</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Document submission forms
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Image and media uploads
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Profile picture updates
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Bulk data imports
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Practices</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Clearly indicate accepted file types
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Show file size limitations
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Provide upload progress feedback
                </li>
                <li className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Allow easy file removal
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">Security Considerations</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Always validate file types and sizes on the server side. Consider implementing virus scanning for uploaded files.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Component Modal */}
      {selectedComponent && (
        <ComponentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedComponent.title}
          component={selectedComponent.component}
          htmlCode={selectedComponent.htmlCode}
          reactCode={selectedComponent.reactCode}
        />
      )}
    </div>
  );
};

export default FileUploadPage;
