import { Component } from '@angular/core';
import { panelTheme } from '../sentence-style';

@Component({
  selector: 'app-sentence-modal',
  templateUrl: './sentence-modal.component.html',
  styleUrl: './sentence-modal.component.scss',
})
export class SentenceModalComponent {
  selectedThemeIndex: number = 1;
  panelTheme = panelTheme;

  get modalClass() {
    return {
      [this.panelTheme[this.selectedThemeIndex].panelTextColor]: true,
      'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]': true,
      [this.panelTheme[this.selectedThemeIndex].panelBackgroundColor[0]]: true,
      [this.panelTheme[this.selectedThemeIndex].panelBackgroundColor[1]]: true,
      [this.panelTheme[this.selectedThemeIndex].panelBackgroundColor[2]]: true,
      // 'shadow-[8px_8px_15px_0px_rgba(0,0,0,0.5)]': true,
    };
  }

  get titleReflectionClass() {
    return [
      {
        'bg-gradient-to-tl': true,
        [this.panelTheme[this.selectedThemeIndex]
          .titleReflectionLightColor[0][0]]: true,
      },
      {
        'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]':
          true,
        [this.panelTheme[this.selectedThemeIndex]
          .titleReflectionLightColor[0][1]]: true,
      },
      {
        'bg-gradient-to-tr': true,
        [this.panelTheme[this.selectedThemeIndex]
          .titleReflectionLightColor[0][2]]: true,
      },
    ];
  }

  get contentClass() {
    return {
      'border-purple-400 bg-gradient-to-b': true,
      [this.panelTheme[this.selectedThemeIndex].contentBackgroundColor[0]]:
        true,
      [this.panelTheme[this.selectedThemeIndex].contentBackgroundColor[1]]:
        true,
      [this.panelTheme[this.selectedThemeIndex].contentBackgroundColor[2]]:
        true,
    };
  }

  get buttonClass() {
    return {
      'bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))]': true,
      [this.panelTheme[this.selectedThemeIndex].buttonBackgroundColor[0]]: true,
      [this.panelTheme[this.selectedThemeIndex].buttonBackgroundColor[1]]: true,
      [this.panelTheme[this.selectedThemeIndex].buttonBackgroundColor[2]]: true,
    };
  }
}
