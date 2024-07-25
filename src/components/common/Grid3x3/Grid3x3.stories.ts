import { type Meta, type StoryObj } from '@storybook/react';

import { Grid3x3 } from './Grid3x3';

type T = typeof Grid3x3;

export default {
  component: Grid3x3,
  args: {},
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
