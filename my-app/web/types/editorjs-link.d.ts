// types/editorjs-link.d.ts
declare module '@editorjs/link' {
  import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';

  interface LinkData {
    link: string;
    meta: {
      title: string;
      site_name: string;
      description: string;
      image: {
        url: string;
      };
    };
  }

  class LinkTool implements BlockTool {
    constructor(options: BlockToolConstructorOptions<LinkData>);
    render(): HTMLElement;
    save(blockContent: HTMLElement): LinkData;
    validate(savedData: LinkData): boolean;
    static get toolbox(): {
      title: string;
      icon: string;
    };
  }

  export = LinkTool;
}
