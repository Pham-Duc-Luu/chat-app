// types/editorjs-embed.d.ts
declare module '@editorjs/embed' {
  import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';

  interface EmbedData {
    service: string;
    source: string;
    embed: string;
    width: number;
    height: number;
    caption: string;
  }

  class Embed implements BlockTool {
    constructor(options: BlockToolConstructorOptions<EmbedData>);
    render(): HTMLElement;
    save(blockContent: HTMLElement): EmbedData;
    validate(savedData: EmbedData): boolean;
    static get toolbox(): {
      title: string;
      icon: string;
    };
  }

  export = Embed;
}
