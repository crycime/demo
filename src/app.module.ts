import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import logger from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { customModule } from './common/custom.module';
import { DatabaseModule } from './common/db/database.module';
import { HttpExceptionFilter } from './common/helpers/HTTP-exception.filter';
import { CorsMiddleware } from './common/helpers/cors.middleware';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { CampaignModule } from './components/campaign/campaign.module';
import { ElectorModule } from './components/elector/elector.module';
import { UserModule } from './components/user/user.module';

@Module({
    imports: [UserModule, CampaignModule, ElectorModule, customModule, DatabaseModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        }
    ]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                // 日志组件
                logger('dev'),
                // 跨域组件
                CorsMiddleware,
                // 添加头盔安全组件
                helmet({ dnsPrefetchControl: { allow: true } }),
                // 15分钟内同个ip只能请求1000次
                rateLimit({
                    max: 1000,
                    windowMs: 15 * 60 * 1000,
                    message: '此IP访问次数太多，请在15分钟后重试'
                })
            )
            .forRoutes('*');
    }
}
