import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmojiModule } from 'ngx-emoji';
import { AnchorsComponent } from './anchors.component';
import { CategoryComponent } from './category.component';
import { EmojiFrequentlyService } from './emoji-frequently.service';
import { EmojiSearchService } from './emoji-search.service';
import { PickerComponent } from './picker.component';
import { PreviewComponent } from './preview.component';
import { SearchComponent } from './search.component';
import { SkinComponent } from './skins.component';

const components: any[] = [
  PickerComponent,
  AnchorsComponent,
  CategoryComponent,
  SearchComponent,
  PreviewComponent,
  SkinComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, EmojiModule],
  exports: components,
  declarations: components,
  providers: [EmojiSearchService, EmojiFrequentlyService],
})
export class PickerModule {}