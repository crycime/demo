/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/5/14
 * Time: 11:14
 *
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as domain from 'domain';

@Injectable()
export class DomainMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: Function) {
        var reqDomain = domain.create();
        reqDomain.on('error', function() {
            try {
                var killTimer = setTimeout(function() {
                    process.exit(1);
                }, 30000);
                killTimer.unref();
                res.send(500);
            } catch (e) {
                console.log('error when exit', e.stack);
            }
        });

        reqDomain.run(next());
    }
}
