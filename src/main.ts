import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../default.env') });
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ApplicationModule } from './app.module';
import { ConfigService } from './common/config/config.service';
import { ValidationPipe } from './common/validata/validation.pipe';

const config = ConfigService.init();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets(join(__dirname, '..', 'mochawesome-report'));
    app.setBaseViewsDir(join(__dirname, '..', 'mochawesome-report'));
    app.setViewEngine('html');
    await app.listen(config.port);
}
bootstrap().then(_ => {
    console.log(`NodePress Run！port at ${config.port}, env: ${config.env}`);
});
