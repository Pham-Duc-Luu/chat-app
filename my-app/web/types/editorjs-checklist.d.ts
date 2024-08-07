// types/editorjs-checklist.d.ts
declare module '@editorjs/checklist' {
  import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';

  interface ChecklistItem {
    text: string;
    checked: boolean;
  }

  interface ChecklistData {
    items: ChecklistItem[];
  }

  class Checklist implements BlockTool {
    constructor(options: BlockToolConstructorOptions<ChecklistData>);
    render(): HTMLElement;
    save(blockContent: HTMLElement): ChecklistData;
    validate(savedData: ChecklistData): boolean;
    static get toolbox(): {
      title: string;
      icon: string;
    };
  }

  export = Checklist;
}
