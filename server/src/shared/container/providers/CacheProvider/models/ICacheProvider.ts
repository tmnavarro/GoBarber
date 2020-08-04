import { string } from '@hapi/joi';
import { NullAttributeValue } from 'aws-sdk/clients/dynamodb';

export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
