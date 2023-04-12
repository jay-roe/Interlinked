import React from 'react';
import { AiFillFileText } from 'react-icons/ai';
import Button from '../Button';
import type { ComponentProps } from 'react';

interface FileButtonProps extends ComponentProps<'button'> {
  link: string;
}

export default function FileButton(props: FileButtonProps) {
  return (
    <a href={props.link} target="_blank" rel="noreferrer">
      <Button type="button" {...props}>
        <AiFillFileText size={25} />
        &nbsp;
        {props.children}
      </Button>
    </a>
  );
}
