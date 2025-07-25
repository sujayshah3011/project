import React, { useState } from 'react';
import { ComponentModal } from '../components/Modal/ComponentModal';
import { User } from 'lucide-react';
import Documentation from '../components/Documentation/Documentation';

const avatarDocumentation = {
  title: "Avatar Component",
  description: "Avatar components represent users or entities with profile images, initials, or placeholder icons. They provide visual identity and context in user interfaces.",
  components: [
    {
      name: "Avatar",
      purpose: "Display user profile images, initials, or placeholder icons with consistent sizing and styling",
      props: [
        {
          name: "size",
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
          default: "'md'",
          description: "Controls the avatar size and proportions"
        },
        {
          name: "src",
          type: "string",
          description: "URL source for the profile image"
        },
        {
          name: "name",
          type: "string",
          description: "User's name - used for initials when no image is provided"
        },
        {
          name: "showStatus",
          type: "boolean",
          default: "false",
          description: "Displays online status indicator as green dot"
        }
      ],
      examples: [
        {
          title: "Image Avatar",
          code: `<Avatar size="md" src="/profile.jpg" name="John Doe" />`,
          description: "Avatar displaying user's profile image"
        },
        {
          title: "Initials Avatar",
          code: `<Avatar size="md" name="John Doe" />`,
          description: "Avatar showing user's initials when no image is available"
        },
        {
          title: "Placeholder Avatar",
          code: `<Avatar size="md" />`,
          description: "Generic user icon when no name or image is provided"
        },
        {
          title: "Status Avatar",
          code: `<Avatar size="md" src="/profile.jpg" name="John Doe" showStatus />`,
          description: "Avatar with online status indicator"
        }
      ],
      notes: [
        "Automatically falls back to initials if image fails to load",
        "Initials are generated from the first letter of each word in the name",
        "Placeholder icon is shown when no name or image is available",
        "Status indicator appears as a green dot in the bottom-right corner",
        "All sizes maintain proper aspect ratios and visual consistency"
      ]
    }
  ],
  patterns: [
    {
      name: "Avatar Sizing",
      purpose: "Provide consistent avatar sizes across different UI contexts",
      implementation: [
        "Extra Small (xs): 24px - Use in dense lists or small UI elements",
        "Small (sm): 32px - Use in compact layouts or secondary content",
        "Medium (md): 40px - Default size for most use cases",
        "Large (lg): 48px - Use in user profiles or prominent displays",
        "Extra Large (xl): 64px - Use in profile headers or featured content",
        "2X Large (2xl): 80px - Use in main profile sections or hero areas"
      ],
      example: `<div className="flex items-center gap-4">
  <Avatar size="xs" name="User" />
  <Avatar size="sm" name="User" />
  <Avatar size="md" name="User" />
  <Avatar size="lg" name="User" />
</div>`
    },
    {
      name: "Fallback Hierarchy",
      purpose: "Graceful degradation when profile images are unavailable",
      implementation: [
        "Primary: Display provided image source",
        "Secondary: Show initials from user's name",
        "Tertiary: Display generic user placeholder icon",
        "All fallbacks maintain consistent visual styling"
      ],
      example: `// Image -> Initials -> Icon fallback
<Avatar src="/broken-image.jpg" name="John Doe" />
// Will show "JD" if image fails to load`,
      notes: [
        "Initials are automatically generated from name prop",
        "Fallback transition is seamless and maintains layout stability",
        "Consistent background colors across all avatar states"
      ]
    }
  ]
};

const AvatarPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    component: React.ReactNode;
    htmlCode: string;
    reactCode: string;
  } | null>(null);

  const openModal = (title: string, component: React.ReactNode, htmlCode: string, reactCode: string) => {
    setSelectedComponent({ title, component, htmlCode, reactCode });
    setModalOpen(true);
  };

  const Avatar = ({ size, src, name, showStatus }: { size: string; src?: string; name?: string; showStatus?: boolean }) => {
    const sizeClasses = {
      'xs': 'w-6 h-6',
      'sm': 'w-8 h-8',
      'md': 'w-10 h-10',
      'lg': 'w-12 h-12',
      'xl': 'w-16 h-16',
      '2xl': 'w-20 h-20',
    };

    const iconSizes = {
      'xs': 'w-3 h-3',
      'sm': 'w-4 h-4',
      'md': 'w-5 h-5',
      'lg': 'w-6 h-6',
      'xl': 'w-8 h-8',
      '2xl': 'w-10 h-10',
    };

    return (
      <div className="relative inline-block">
        <div className={`${sizeClasses[size as keyof typeof sizeClasses]} overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
          {src ? (
            <img src={src} alt={name} className="w-full h-full object-cover" />
          ) : name ? (
            <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          ) : (
            <User className={`${iconSizes[size as keyof typeof iconSizes]} text-gray-400`} />
          )}
        </div>
        {showStatus && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800"></div>
        )}
      </div>
    );
  };

  const AvatarGroup = ({ avatars }: { avatars: Array<{ src?: string; name?: string }> }) => (
    <div className="flex -space-x-2">
      {avatars.slice(0, 3).map((avatar, index) => (
        <Avatar key={index} size="md" src={avatar.src} name={avatar.name} />
      ))}
      {avatars.length > 3 && (
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800">
          +{avatars.length - 3}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Avatar</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Avatars represent users and can display profile pictures, initials, or placeholder icons.
        </p>
      </div>

      {/* Avatar Sizes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sizes</h2>
        <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {[
              { name: 'Extra Small', size: 'xs' },
              { name: 'Small', size: 'sm' },
              { name: 'Medium', size: 'md' },
              { name: 'Large', size: 'lg' },
              { name: 'Extra Large', size: 'xl' },
              { name: '2X Large', size: '2xl' },
            ].map((avatar) => (
              <div key={avatar.size} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="text-gray-900 dark:text-white font-medium w-32">{avatar.name}</span>
                <div 
                  className="cursor-pointer"
                  onClick={() => openModal(
                    `${avatar.name} Avatar`,
                    <Avatar size={avatar.size} src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" />,
                    `<div style="position: relative; display: inline-block;">
  <div style="width: ${avatar.size === 'xs' ? '1.5rem' : avatar.size === 'sm' ? '2rem' : avatar.size === 'md' ? '2.5rem' : avatar.size === 'lg' ? '3rem' : avatar.size === 'xl' ? '4rem' : '5rem'}; height: ${avatar.size === 'xs' ? '1.5rem' : avatar.size === 'sm' ? '2rem' : avatar.size === 'md' ? '2.5rem' : avatar.size === 'lg' ? '3rem' : avatar.size === 'xl' ? '4rem' : '5rem'}; overflow: hidden; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center;">
    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="John Doe" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
</div>`,
                    `<Avatar size="${avatar.size}" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" />`
                  )}
                >
                  <Avatar size={avatar.size} src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatar Types */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Types</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Image Avatar</h3>
            <div 
              className="cursor-pointer inline-block"
              onClick={() => openModal(
                'Image Avatar',
                <Avatar size="lg" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" />,
                `<div style="width: 3rem; height: 3rem; overflow: hidden; background-color: #e5e7eb;">
  <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="John Doe" style="width: 100%; height: 100%; object-fit: cover;" />
</div>`,
                `<Avatar size="lg" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" />`
              )}
            >
              <Avatar size="lg" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Initial Avatar</h3>
            <div 
              className="cursor-pointer inline-block"
              onClick={() => openModal(
                'Initial Avatar',
                <Avatar size="lg" name="John Doe" />,
                `<div style="width: 3rem; height: 3rem; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center;">
  <span style="color: #4b5563; font-weight: 500; font-size: 0.875rem;">JD</span>
</div>`,
                `<Avatar size="lg" name="John Doe" />`
              )}
            >
              <Avatar size="lg" name="John Doe" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Icon Avatar</h3>
            <div 
              className="cursor-pointer inline-block"
              onClick={() => openModal(
                'Icon Avatar',
                <Avatar size="lg" />,
                `<div style="width: 3rem; height: 3rem; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center;">
  <svg style="width: 1.5rem; height: 1.5rem; color: #9ca3af;" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
  </svg>
</div>`,
                `<Avatar size="lg" />`
              )}
            >
              <Avatar size="lg" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Avatar with Status</h3>
            <div 
              className="cursor-pointer inline-block"
              onClick={() => openModal(
                'Avatar with Status',
                <Avatar size="lg" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" showStatus />,
                `<div style="position: relative; display: inline-block;">
  <div style="width: 3rem; height: 3rem; overflow: hidden; background-color: #e5e7eb;">
    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="John Doe" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
  <div style="position: absolute; bottom: -0.125rem; right: -0.125rem; width: 0.75rem; height: 0.75rem; background-color: #4ade80; border: 2px solid white;"></div>
</div>`,
                `<Avatar size="lg" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" showStatus />`
              )}
            >
              <Avatar size="lg" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" name="John Doe" showStatus />
            </div>
          </div>
        </div>
      </section>

      {/* Avatar Group */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Avatar Group</h2>
        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700">
          <div 
            className="cursor-pointer inline-block"
            onClick={() => openModal(
              'Avatar Group',
              <AvatarGroup avatars={[
                { src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', name: 'John Doe' },
                { name: 'Jane Smith' },
                { src: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', name: 'Bob Johnson' },
                { name: 'Alice Brown' },
                { name: 'Charlie Wilson' },
              ]} />,
              `<div style="display: flex; margin-left: -0.5rem;">
  <div style="width: 2.5rem; height: 2.5rem; overflow: hidden; background-color: #e5e7eb; border: 2px solid white;">
    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="John Doe" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
  <div style="width: 2.5rem; height: 2.5rem; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; border: 2px solid white; margin-left: -0.5rem;">
    <span style="color: #4b5563; font-weight: 500; font-size: 0.875rem;">JS</span>
  </div>
  <div style="width: 2.5rem; height: 2.5rem; overflow: hidden; background-color: #e5e7eb; border: 2px solid white; margin-left: -0.5rem;">
    <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Bob Johnson" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
  <div style="width: 2.5rem; height: 2.5rem; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 500; color: #4b5563; border: 2px solid white; margin-left: -0.5rem;">+2</div>
</div>`,
              `<AvatarGroup avatars={[
  { src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', name: 'John Doe' },
  { name: 'Jane Smith' },
  { src: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', name: 'Bob Johnson' },
  { name: 'Alice Brown' },
  { name: 'Charlie Wilson' },
]} />`
            )}
          >
            <AvatarGroup avatars={[
              { src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', name: 'John Doe' },
              { name: 'Jane Smith' },
              { src: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', name: 'Bob Johnson' },
              { name: 'Alice Brown' },
              { name: 'Charlie Wilson' },
            ]} />
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <Documentation 
        title={avatarDocumentation.title}
        description={avatarDocumentation.description}
        components={avatarDocumentation.components}
        patterns={avatarDocumentation.patterns}
      />

      <ComponentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedComponent?.title || ''}
        component={selectedComponent?.component || null}
        htmlCode={selectedComponent?.htmlCode || ''}
        reactCode={selectedComponent?.reactCode || ''}
      />
    </div>
  );
};

export default AvatarPage;