// TitleBlock.ts
import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';

class TitleBlock implements BlockTool {
  private data: { text: string };
  private wrapper: HTMLElement;

  constructor({ data }: BlockToolConstructorOptions<{ text: string }>) {
    this.data = data;
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('title-block');
    this.wrapper.contentEditable = 'true';
    this.wrapper.innerHTML = this.data.text || '';
  }

  static get toolbox() {
    return {
      title: 'Title',
      icon: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M0 0h20v20H0z" fill="none"/><path d="M10 2h-3v16h2v-6h2v6h2v-6h2v6h2V2h-2v10h-2V2h-2z" fill="currentColor"/></svg>',
    };
  }

  render() {
    return this.wrapper;
  }

  save(blockContent: HTMLElement) {
    return {
      text: blockContent.innerHTML,
    };
  }

  static get sanitize() {
    return {
      text: {
        br: true,
      },
    };
  }

  validate(savedData: { text: string }) {
    return savedData.text.trim().length > 0;
  }
}

export default TitleBlock;
