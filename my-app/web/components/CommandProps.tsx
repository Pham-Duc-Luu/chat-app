import React from 'react';
import { Command, CommandInput, CommandItem, CommandList } from './ui/command';

interface ICommandProps {
  commands: { value: string; label: string }[];
}

export default function CommandSearch({ commands }: ICommandProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  const filteredCommands = Array.isArray(commands)
    ? commands.filter((command) =>
        command.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];
  return (
    <Command className=" rounded-full border">
      <CommandInput
        placeholder="Type a command or search..."
        onValueChange={handleValueChange}
      />
      {
        <CommandList>
          {open &&
            filteredCommands.length > 0 &&
            filteredCommands.map((command) => (
              <CommandItem key={command.value} value={command.value}>
                {command.label}
              </CommandItem>
            ))}
        </CommandList>
      }
    </Command>
  );
}
