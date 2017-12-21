/**
 * Builds the categories-array and categories-tree files
 */

import * as path from 'path';
import { Converter } from './Converter';

Converter.writeToPath(path.resolve(__dirname, '..'));
