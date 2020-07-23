import IHashProvides from '../models/IHashProvides';

class FakeHashProvider implements IHashProvides {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;
