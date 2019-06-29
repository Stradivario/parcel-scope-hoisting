import { Bootstrap } from '@rxdi/core';
import { AppModule } from './app/app.module';

Bootstrap(AppModule, { init: false, strict: true }).subscribe()
