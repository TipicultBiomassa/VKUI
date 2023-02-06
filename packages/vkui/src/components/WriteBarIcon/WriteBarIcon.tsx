import * as React from 'react';
import {
  Icon24Attach,
  Icon24CheckCircleOutline,
  Icon24Send,
  Icon28AddCircleOutline,
  Icon48WritebarDone,
  Icon48WritebarSend,
  Icon28AttachOutline,
  Icon28CheckCircleOutline,
  Icon28Send,
} from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { Counter } from '../Counter/Counter';
import { Tappable } from '../Tappable/Tappable';
import { warnOnce } from '../../lib/warnOnce';
import { WriteBarIconRenderer } from './WriteBarIconRenderer';
import styles from './WriteBarIcon.module.css';

export interface WriteBarIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Предустановленные типы кнопок в WriteBar для отрисовки иконки в зависимости от платформы.
   * Если передать валидное значение для этого свойства, `children` игнорируется.
   *
   * - `attach` – иконка прикрепления.
   * - `send` – иконка отправки.
   * - `done` – иконка отправки в режиме редактирования.
   */
  mode?: 'attach' | 'send' | 'done';
  /**
   * Значение счётчика для кнопки. Например, для количества прикреплённых файлов.
   */
  count?: number;
}

const warn = warnOnce('WriteBarIcon');
const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */
export const WriteBarIcon = ({
  mode,
  children,
  count,
  className,
  ...restProps
}: WriteBarIconProps) => {
  const platform = usePlatform();

  let ariaLabel: string | undefined = undefined;

  let predefinedIcons;
  switch (mode) {
    case 'attach':
      predefinedIcons = {
        IconCompact: platform === Platform.IOS ? Icon28AddCircleOutline : Icon24Attach,
        IconRegular: platform === Platform.IOS ? Icon28AddCircleOutline : Icon28AttachOutline,
      };
      ariaLabel = 'Прикрепить файл';
      break;

    case 'send':
      predefinedIcons = {
        IconCompact: platform === Platform.IOS ? Icon48WritebarSend : Icon24Send,
        IconRegular: platform === Platform.IOS ? Icon48WritebarSend : Icon28Send,
      };
      ariaLabel = 'Отправить';
      break;

    case 'done':
      predefinedIcons = {
        IconCompact: platform === Platform.IOS ? Icon48WritebarDone : Icon24CheckCircleOutline,
        IconRegular: platform === Platform.IOS ? Icon48WritebarDone : Icon28CheckCircleOutline,
      };
      ariaLabel = 'Готово';
      break;

    default:
      break;
  }

  if (IS_DEV && !restProps['aria-label'] && !ariaLabel) {
    warn(
      'a11y: У WriteBarIcon нет aria-label. Кнопка будет недоступной для части пользователей.',
      'error',
    );
  }

  return (
    <Tappable
      aria-label={ariaLabel}
      {...restProps}
      Component="button"
      hasHover={false}
      activeMode={styles['WriteBarIcon__active']}
      className={classNames(
        styles['WriteBarIcon'],
        platform === Platform.IOS && styles['WriteBarIcon--ios'],
        mode && styles[`WriteBarIcon--mode-${mode}`],
        className,
      )}
    >
      <span className={styles['WriteBarIcon__in']}>
        {predefinedIcons ? <WriteBarIconRenderer {...predefinedIcons} /> : children}
      </span>
      {hasReactNode(count) && (
        <Counter className={styles['WriteBarIcon__counter']} size="s">
          {count}
        </Counter>
      )}
    </Tappable>
  );
};
