import { Injectable } from '@angular/core';

import { EmojiData } from 'ngx-emoji';

const DEFAULTS = [
  '+1',
  'grinning',
  'kissing_heart',
  'heart_eyes',
  'laughing',
  'stuck_out_tongue_winking_eye',
  'sweat_smile',
  'joy',
  'scream',
  'disappointed',
  'unamused',
  'weary',
  'sob',
  'sunglasses',
  'heart',
  'poop',
];

@Injectable()
export class EmojiFrequentlyService {
  NAMESPACE = 'emoji-mart';
  frequently: { [key: string]: number };
  defaults: { [key: string]: number } = {};

  constructor() {
    this.frequently = JSON.parse(localStorage.getItem(`${this.NAMESPACE}.frequently`) || 'null');
  }
  add(emoji: EmojiData) {
    if (!this.frequently) {
      this.frequently = this.defaults;
    }
    if (!this.frequently[emoji.id]) {
      this.frequently[emoji.id] = 0;
    }
    this.frequently[emoji.id] += 1;

    localStorage.setItem(`${this.NAMESPACE}.last`, emoji.id);
    localStorage.setItem(`${this.NAMESPACE}.frequently`, JSON.stringify(this.frequently));
  }
  get(perLine: number) {
    if (!this.frequently) {
      this.defaults = {};

      const result = [];

      for (let i = 0; i < perLine; i++) {
        this.defaults[DEFAULTS[i]] = perLine - i;
        result.push(DEFAULTS[i]);
      }
      return result;
    }

    const quantity = perLine * 4;
    const frequentlyKeys = Object.keys(this.frequently);

    const sorted = frequentlyKeys
      .sort((a, b) => this.frequently[a] - this.frequently[b])
      .reverse();
    const sliced = sorted.slice(0, quantity);

    const last = localStorage.getItem(`${this.NAMESPACE}.last`);

    if (last && sliced.indexOf(last) === -1) {
      sliced.pop();
      sliced.push(last);
    }

    return sliced;
  }
}