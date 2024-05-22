import { Injectable } from "@nestjs/common";
import { createHmac } from 'crypto';


@Injectable()
export class HashService {
    hashCrypto(str) {
        const secret = 'abcdefg';
        return createHmac('sha256', secret)
            .update(str)
            .digest('hex');
    }
}