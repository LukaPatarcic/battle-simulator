import React, { CSSProperties, ReactNode, MouseEvent } from 'react';
import { UrlObject } from 'url';
import { MouseEventHandler } from 'react';
import { Button as BButton } from '@restart/ui';
import Link from 'next/link';
import { htmlButtonTypes } from '@type/index';

interface Props {
  id?: string;
  children?: ReactNode;
  outline?: boolean;
  href?: string | UrlObject;
  shallow?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  htmlButtonType?: htmlButtonTypes;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  ariaLabel?: string;
  block?: boolean;
  target?: string;
}

const Button = ({
  id = undefined,
  children = null,
  disabled = false,
  href = '',
  shallow = false,
  onClick = undefined,
  style = undefined,
  ariaLabel = undefined,
  className = '',
  target = undefined,
  htmlButtonType = 'button',
}: Props): JSX.Element => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  };

  const button = (
    <BButton
      id={id}
      disabled={disabled}
      className={className}
      style={style}
      onClick={handleClick}
      type={htmlButtonType}
    >
      {children}
    </BButton>
  );

  if (href) {
    return (
      <Link href={href.toString()} shallow={shallow} passHref>
        <a aria-label={ariaLabel} href={href.toString()} target={target}>
          {button}
        </a>
      </Link>
    );
  }

  return button;
};

export default Button;
