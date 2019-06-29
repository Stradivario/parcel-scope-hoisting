import { Module } from '@rxdi/core';
import { AppComponent } from './app.component';
import { VirtualScrollerComponent } from './virtual-scroller/virtual-scroller.component';
import { FeatureFlagTableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';

@Module({
    bootstrap: [AppComponent],
    components: [VirtualScrollerComponent, FeatureFlagTableComponent, HomeComponent]
})
export class AppModule {}