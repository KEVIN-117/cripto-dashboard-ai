import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "./Button"

import { ThemeProvider } from '@/theme/ThemeProvider';
const meta: Meta<typeof Button> = {
  component: Button,
  title: "Example/Button",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ButtonType: {
      control: { type: "select" },
      options: ["alert", "success", "warning", "default"],
      description: "Type of button to display",
    },
  },
  args: {
    onClick: () => console.log("Button clicked"),
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="system" storageKey="todo-theme">
        <Story />
      </ThemeProvider>
    ),
  ],
}


export default meta
type Story = StoryObj<typeof Button>
export const Primary: Story = {
  args: {
    children: "Primary Button",
    ButtonType: "default",
  },
}