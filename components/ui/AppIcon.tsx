import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type AppIconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

export default function AppIcon({ name, size = 24, color = '#1ab394', style }: AppIconProps) {
  return <MaterialCommunityIcons name={name} size={size} color={color} style={style} />;
}
