import fs from 'fs/promises';
import path from 'path';

const components = [
  'header',
  'hero',
  'features',
  'pricing',
  'footer'
];

async function createComponentFiles() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'components'), { recursive: true });
    
    for (const component of components) {
      const filePath = path.join(process.cwd(), 'components', `${component}.tsx`);
      await fs.writeFile(filePath, '// Component content will be added here');
      console.log(`Created ${filePath}`);
    }

    console.log('All component files created successfully.');
  } catch (error) {
    console.error('Error creating component files:', error.message);
  }
}

createComponentFiles();