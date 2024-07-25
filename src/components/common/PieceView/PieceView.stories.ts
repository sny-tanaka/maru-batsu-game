import { type Meta, type StoryObj } from '@storybook/react';

import { PieceView } from './PieceView';

type T = typeof PieceView;

export default {
  component: PieceView,
  args: {},
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
