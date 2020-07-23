import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvides';
import BCryptProvider from './HashProvider/implementations/BCryptProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
