import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Sheet from "./Sheet";
import { Button } from "@/components/common/Button";

const meta: Meta<typeof Sheet> = {
  component: Sheet,
  title: "Molecules/Sheet",
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Sheet</Button>
        <Sheet open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: "16px 20px 32px" }}>
            <h2 style={{ color: "var(--colors-text)", fontWeight: 600, marginBottom: 8 }}>
              Add transaction
            </h2>
            <p style={{ color: "var(--colors-text-muted)", fontSize: "0.875rem" }}>
              Sheet content goes here.
            </p>
          </div>
        </Sheet>
      </>
    );
  },
};
