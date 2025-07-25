import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Book, Code, Info, Lightbulb } from 'lucide-react';

interface PropDoc {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

interface UsageExample {
  title: string;
  code: string;
  description?: string;
}

interface ComponentDoc {
  name: string;
  purpose: string;
  props?: PropDoc[];
  examples?: UsageExample[];
  notes?: string[];
}

interface PatternDoc {
  name: string;
  purpose: string;
  implementation?: string[];
  example?: string;
  notes?: string[];
}

interface DocumentationProps {
  title: string;
  description: string;
  components?: ComponentDoc[];
  patterns?: PatternDoc[];
}

const Documentation: React.FC<DocumentationProps> = ({
  title,
  description,
  components = [],
  patterns = []
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const SectionHeader = ({ id, icon: Icon, children }: { 
    id: string; 
    icon: React.ComponentType<any>; 
    children: React.ReactNode; 
  }) => {
    const isExpanded = expandedSections.has(id);
    return (
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
        )}
        <Icon className="w-4 h-4 mr-2 text-purple-600" />
        <span className="font-medium text-gray-900 dark:text-white">{children}</span>
      </button>
    );
  };

  const PropsTable = ({ props }: { props: PropDoc[] }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Default
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {props.map((prop, index) => (
            <tr key={index}>
              <td className="px-4 py-2 whitespace-nowrap">
                <code className="text-sm font-mono text-purple-600 dark:text-purple-400">
                  {prop.name}
                  {prop.required && <span className="text-red-500 ml-1">*</span>}
                </code>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                  {prop.default || '-'}
                </code>
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
    <div className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
      {title && (
        <div className="text-sm text-gray-400 mb-2">{title}</div>
      )}
      <pre className="text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-12">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center mb-3">
          <Book className="w-6 h-6 mr-3 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      {/* Components Section */}
      {components.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700">
          <SectionHeader id="components" icon={Code}>
            Components ({components.length})
          </SectionHeader>
          
          {expandedSections.has('components') && (
            <div className="p-6 space-y-8">
              {components.map((component, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 border-b border-gray-200 dark:border-gray-600">
                    <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                      {component.name}
                    </h4>
                    <p className="text-purple-700 dark:text-purple-300 mt-1">
                      {component.purpose}
                    </p>
                  </div>
                  
                  <div className="p-4 space-y-6">
                    {/* Props */}
                    {component.props && component.props.length > 0 && (
                      <div>
                        <h5 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                          Props
                        </h5>
                        <PropsTable props={component.props} />
                      </div>
                    )}

                    {/* Usage Examples */}
                    {component.examples && component.examples.length > 0 && (
                      <div>
                        <h5 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                          Usage Examples
                        </h5>
                        <div className="space-y-4">
                          {component.examples.map((example, exIndex) => (
                            <div key={exIndex}>
                              {example.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {example.description}
                                </p>
                              )}
                              <CodeBlock code={example.code} title={example.title} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {component.notes && component.notes.length > 0 && (
                      <div>
                        <h5 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                          Important Notes
                        </h5>
                        <ul className="space-y-2">
                          {component.notes.map((note, noteIndex) => (
                            <li key={noteIndex} className="flex items-start">
                              <Info className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {note}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Patterns Section */}
      {patterns.length > 0 && (
        <div>
          <SectionHeader id="patterns" icon={Lightbulb}>
            Patterns ({patterns.length})
          </SectionHeader>
          
          {expandedSections.has('patterns') && (
            <div className="p-6 space-y-6">
              {patterns.map((pattern, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-gray-200 dark:border-gray-600">
                    <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                      {pattern.name}
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 mt-1">
                      {pattern.purpose}
                    </p>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    {pattern.implementation && (
                      <div>
                        <h5 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                          Implementation
                        </h5>
                        <ul className="space-y-1">
                          {pattern.implementation.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-gray-700 dark:text-gray-300 ml-4">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pattern.example && (
                      <div>
                        <h5 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                          Example
                        </h5>
                        <CodeBlock code={pattern.example} />
                      </div>
                    )}

                    {pattern.notes && (
                      <div>
                        <h5 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                          Notes
                        </h5>
                        <ul className="space-y-2">
                          {pattern.notes.map((note, noteIndex) => (
                            <li key={noteIndex} className="flex items-start">
                              <Info className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {note}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Documentation;
