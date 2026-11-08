import { Module } from '@nestjs/common';
import { SummariesModule } from './summaries/summaries.module';
import { SummaryUsagesModule } from './summary-usages/summary-usages.module';
import { SavedContentsModule } from './saved-contents/saved-contents.module';

@Module({
  imports: [SummariesModule, SummaryUsagesModule, SavedContentsModule],
})
export class ContentModule {}
