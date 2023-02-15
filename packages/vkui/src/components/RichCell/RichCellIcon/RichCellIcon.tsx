import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { HasComponent } from '../../../types';
import styles from './RichCellIcon.module.css';

export interface RichCellIconProps extends React.HTMLAttributes<HTMLDivElement>, HasComponent {
  className?: string;
}

export const RichCellIcon = ({ children, className, ...rest }: RichCellIconProps) => {
  return (
    <div {...rest} className={classNames(styles['RichCell__after-icon'], className)}>
      {children}
    </div>
  );
};
