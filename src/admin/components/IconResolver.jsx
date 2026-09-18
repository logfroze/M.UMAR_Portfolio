import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';

// Registry of icons
const iconRegistry = {
  ...FaIcons,
  ...SiIcons,
  ...MdIcons,
  ...GiIcons,
};

/**
 * Resolves an icon name or component to a valid React element
 */
export function resolveIcon(icon, props = {}) {
  if (!icon) {
    const Fallback = FaIcons.FaCode;
    return <Fallback {...props} />;
  }

  // If icon is already a React component or function
  if (typeof icon === 'function' || typeof icon === 'object') {
    const IconComponent = icon;
    return <IconComponent {...props} />;
  }

  // If icon is a string name like 'FaReact' or 'SiPython'
  if (typeof icon === 'string') {
    const Component = iconRegistry[icon] || FaIcons[icon] || SiIcons[icon] || MdIcons[icon] || GiIcons[icon];
    if (Component) {
      return <Component {...props} />;
    }
  }

  const Fallback = FaIcons.FaCode;
  return <Fallback {...props} />;
}

export function getIconComponent(iconName) {
  if (!iconName) return FaIcons.FaCode;
  if (typeof iconName === 'function') return iconName;
  return iconRegistry[iconName] || FaIcons[iconName] || SiIcons[iconName] || MdIcons[iconName] || FaIcons.FaCode;
}
