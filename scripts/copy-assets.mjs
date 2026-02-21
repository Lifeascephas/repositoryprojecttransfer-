import { cpSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const root = process.cwd();

// Copy attached_assets to public/images
const src1 = join(root, 'attached_assets');
const dst1 = join(root, 'public', 'images');
if (existsSync(src1)) {
  mkdirSync(dst1, { recursive: true });
  cpSync(src1, dst1, { recursive: true });
  console.log('Copied attached_assets -> public/images');
}

// Copy client/public/assets to public/assets
const src2 = join(root, 'client', 'public', 'assets');
const dst2 = join(root, 'public', 'assets');
if (existsSync(src2)) {
  mkdirSync(dst2, { recursive: true });
  cpSync(src2, dst2, { recursive: true });
  console.log('Copied client/public/assets -> public/assets');
}

// Copy favicon
const fav = join(root, 'client', 'public', 'favicon.png');
const favDst = join(root, 'public', 'favicon.png');
if (existsSync(fav)) {
  mkdirSync(join(root, 'public'), { recursive: true });
  cpSync(fav, favDst);
  console.log('Copied favicon.png');
}

console.log('Done!');
